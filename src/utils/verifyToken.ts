import { userInput } from './../models/video.modle';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { createError } from './error';
import config from 'config';



export const verifyToken = (req:Request, res:Response, next:NextFunction) => {


    const token = req.headers.cookie?.split('=');
    if (!token) res.status(401).json(createError(401, "You are not authenicated!"));

    const access_token = token![1];

    const user = jwt.verify(access_token, config.get<string>('secretKey'));
    if (!user) res.status(403).json(createError(403, "Token is not valid"));
     res.locals.user = user;
    
    return next();
}