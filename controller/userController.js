import e from "express";
import userModel from "../Model/userModel.js";
//user create
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
//get all users
export const getAllUsersController=async(req,res)=>{
    try{
         const data=await userModel.getAllUsersModel();
         res.json(data)

    }catch (err){
        res.status(500).json({error:err.message})
    }
   

}
export const updateUserPasswordController=async(req,res)=>{
    try{
        const {password}=req.body;
        const updatePassword = await userModel.updateUserPasswordModel(req.params.id,{password});
        if(!updatePassword){
            res.json({message:"user not found"})

        }
        else{
            res.json({
                message:"passsword has been updated"
            })
        }
    }
    catch (err){
        res.status(500).json({error:err.message})
    }
}
export const deleteUsercontroller=async(req,res)=>{
    try{
        const deleteUser=await userModel.deleteUserModel(req.params.id);
        if(!deleteUser){
            res.json({message:"user not found"})

        }
        else{
            res.json({
                message:"user has been deleted"
            })
        }
    }
    catch (err){
        res.status(500).json({error:err.message})
    }
}