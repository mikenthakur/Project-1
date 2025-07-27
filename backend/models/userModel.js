import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true, enum: ["admin", "user", "rider"]},
    cartData:{type:Object,default:{}},
    
}, {timestamps: true}, {minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;