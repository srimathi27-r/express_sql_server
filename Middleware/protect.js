import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
export const protect  = async(req,res,next)=> {
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"unauthorized access"})
    }
    const token = authHeader.split(' ')[1];
    //bearer token--->header.payloadsignature
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (err) {
       res.status(401).json({message:"invalid token"});
    }
}