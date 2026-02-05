import express from 'express'

import {protect} from '../Middleware/protect.js'
import {isAdmin} from '../Middleware/admin.js'
import {userLoginController,userSignupController} from '../controller/authUserController.js'

const authUserRoute = express.Router(); 

authUserRoute.post('/authsign',userSignupController)
authUserRoute.post('/authlogin',userLoginController);
authUserRoute.get('/profile',  protect,(req,res) => {
    res.json({message:"protected route",user:req.role})

})
authUserRoute.get('/admin',protect, isAdmin,(req,res)=>{
    res.json({message:"welcome admin user",user:req.role})
})
export default authUserRoute