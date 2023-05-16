import { commentModel } from './../models/comment.model';
import { NextFunction } from 'express';
import { userInput } from '../models/comment.model';

export const userAddComment = async(data:userInput,userid:string) => {
    return await commentModel.create({ ...data, userId: userid });
}

export const isComment = async (userid: string) => {
    return await commentModel.findById(userid);
}

export const userDeleteComment = async (id: string) => {
    return await commentModel.findByIdAndDelete(id);
}

export const getAllComment = async (id: string) => {
    return await commentModel.find({ videoId: id });
}