const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const User=new Schema({
    firstname:{
        type:String,
        lowercase:true
    },
    lastname:{
        type:String,
        lowercase:true
    },
    username:{
        type:String,
        unique:true,
        lowercase:true
    },
    password:String
});


const UserModel=mongoose.model("users",User);

module.exports={
    UserModel:UserModel
};