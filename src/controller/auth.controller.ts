import { userModel } from './../models/user.model';
import mongoose from "mongoose";
import { Request,Response,NextFunction } from "express";
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { saveUser } from '../services/user.service';
import { createError } from '../utils/error';
import jwt from 'jsonwebtoken';
import config from 'config';




export const signup = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const securePassword = hashPassword(req.body);

        const newUser = await saveUser(req.body,securePassword);



        res.status(200).send(newUser);

    } catch (err: any) {
        return res.status(409).json(createError(409,err.message))
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await userModel.findOne({ name: req.body.name })
        
        if (!user)return res.status(404).json(createError(404, "User not found"));

        const legituser = comparePassword(req.body.password, user?.password);

        if (!legituser) return res.status(401).json(createError(401, "wrong credentials"));

        const token = jwt.sign({ id: user._id }, config.get<string>("secretKey"));


        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(user);
        
    } catch (err:any) {
      return res.status(409).json(createError(409,err.message))  
    }
}