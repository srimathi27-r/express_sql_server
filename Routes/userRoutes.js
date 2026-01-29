//import { use } from "react";
import {createUserController,getAllUsersController,updateUserPasswordController,deleteUsercontroller}from "../controller/userController.js";
import express from 'express'
const userRoute = express.Router();

userRoute.post("/signup", createUserController);
userRoute.get("/getusers", getAllUsersController);
userRoute.put("/updatepass/:id", updateUserPasswordController);
userRoute.delete("/deleteuser/:id", deleteUsercontroller);
export default userRoute