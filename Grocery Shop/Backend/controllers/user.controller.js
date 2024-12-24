import * as userService from "../services/user.service.js"
import {validationResult} from "express-validator"
import User from "../models/user.model.js"
import redisClient from "../services/redis.service.js"
export const createUserController=async (req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()});
    }
    
    try{
        const user=await userService.createUser(req.body);
        const token=await user.generateJWT();
        delete user._doc.password;
        res.status(201).json({user,token})
    }catch(error){
        res.status(400).send(error.message);
    }
}

export const loginController=async (req,res)=>{
    const errors=validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({"name":"my name is anthony gownjawlbish"});
    }
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email}).select('+password');

        if(!user){
           return  res.status(401).json({
                errors:"Invalid credentials"
            })
        }
        const isValid=await user.isValidPassword(password);

        if(!isValid){
            return res.status(401).json({
                errors:"Invalid credentials"
            })
        }
        const token=await user.generateJWT();
        delete user._doc.document;

        res.status(200).json({user,token});

    }catch(error){
        res.status(400).send(error.message);
    }
}

export const profileController=async(req,res)=>{
    res.status(200).json({user:req.user})
}

export const logoutController=async(req,res)=>{
    try{
        const token=req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        redisClient.set(token,'logout','EX',60*60*24);
        res.status(200).json({
            message:'Logged out successfully'
        })
    }
    catch(err){ 
        console.log(err);
        res.status(400).send(err.message);
    }
}