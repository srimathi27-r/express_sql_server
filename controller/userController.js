import userModel from "../Model/userModel.js";

export const createUserController=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const response = await userModel.createUserModel({name,email,password});
        res.status(201).json({
            message:"user created successfully",
            userId:response          
        })
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
