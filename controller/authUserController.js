import {hashpassword,checkPassword} from '../utils/hash.js';
import {createToken} from "../utils/token.js"

import authUserModel from '../Model/authUserModel.js';


export const userSignupController=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const checkEmail = await authUserModel.userLoginModel({email});

        if(checkEmail){
            return res.status(400).json({message:"email already exists"})   
        }
        const newPassword = await hashpassword(password);
        const id = await authUserModel.userSignupModel({
            name:name,
            email:email,
            password:newPassword,
            role:role || "user"
        })
       
        res.status(201).json({message: "user has been created",
        userId:id
        })


    }catch(err){
        res.status(500).json({error: err.message})
    }
}
export const userLoginController=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await authUserModel.userLoginModel({email});
        if(!user){
            return res.status(400).json({message:"invalid credential"})
        }
        const userPassword = await checkPassword(password,user.password)
        if(!userPassword){
            return res.status(400).json({message:"wrong password"})

        }
        const token = createToken({id:user.id,role:user.role})
        res.status(200).json({
            message:"login successful",
            token:token
        })

    }catch(err){    
        res.status(500).json({error: err.message})}
    }
