const express=require("express");
const Router=express.Router;

const router=Router();

router.get("/test",(req,res)=>{
    res.send({
        message:"Test Successed"
    });
})

module.exports={
    router
}