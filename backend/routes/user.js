const express=require("express");
const Router=express.Router;
const {z}=require("zod");
const bcrypt = require("bcryptjs");
const { UserModel } = require("../db");
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/auth-middleware");

const userRouter=Router()

userRouter.post("/test",authMiddleware,(req,res)=>{
    res.send({
        message:"Inside the userRouter"
    })
})

userRouter.post("/signup",async(req,res)=>{
    const{firstname,lastname,username,password}=req.body;
    console.log(req.body);
    const schema=z.object({
        username:z.string().min(5).max(100).email(),
        firstname:z.string().min(1).max(100),
        lastname:z.string().min(1).max(100),
        password:z.string().min(5).max(20)
        .refine(
            function(password)
            {
                return /[a-z]/.test(password);
            },
            {
                message:"Passoword Must Contain At Least one Lowecase Letter"
            }
        )
        .refine(
            function(password)
            {
                return /[A-Z]/.test(password);
            },
            {
                message:"The Password Must Contain At Least one Uppercase Letter"
            }
        )
        .refine(
            function(password)
            {
                return /[0-9]/.test(password);
            },
            {
                message:"The Password Must Contain At Least one Number "
            }
        )
        .refine(
            function(password)
            {
                return /[\W_]/.test(password);
            },
            {
                message:"The Password Must Contain Atleast one Special Character"
            }
        )
    });
    const result=schema.safeParse(req.body);
    if(result.success){
        // Proceed with Login
        
        // checking if the email already exists or not
        try{
            const user=await UserModel.findOne({
                username:username
            });
            if(user){
                res.status(411).json({
                    message: "Email already taken"
                })
                return;
            }
        }
        catch{
            res.send({
                message:"error while Checking for an unique entry"
            });
            return;
        }

        // Hash The Password
        const hashedPwd=await bcrypt.hash(password,5);

        // make an Entry in the Database
        try{
           const user= await UserModel.create({
                firstname:firstname,
                lastname:lastname,
                username:username,
                password:hashedPwd
            })
            console.log(user);
            const token= jwt.sign({
                userId:user._id
            },JWT_SECRET);

            res.send({
                message: "User created successfully",
                token: token
            });
            return;
        }catch(e){
            res.send({
                message:"Error in Createing an DB Entry",
                error:e
            })
            return;
        }
        
        
    }
    else{
        res.send("Error in Credentials")
    }

})

userRouter.post("/signin",async(req,res)=>{
    const{username,password}=req.body;

    // checking if the userexists or not
    try{
        const user=await UserModel.findOne({
            username:username
        })
        if(!user){
            res.status(403).send({
                message:"Please Signup First"
            })
            return;
        }
        else{
           const result=await bcrypt.compare(password,user.password);
           if(result==true){
            const token= jwt.sign({
                id:user._id
            },JWT_SECRET);
            res.status(200).send({
                Message:"Signin Successfull",
                token:token
            });
            return;
           }
           else{
            res.status(411).send({
                message:"Incorrect Password"
            });
            return;
           }
        }
    }
    catch{
        res.send({
            error:"Error While Finding user in DB"
        });
        return;
    }
})
module.exports={
    userRouter
}