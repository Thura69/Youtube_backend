import { videoModel } from './../models/video.modle';

import { userModel } from './../models/user.model';
import { Request,Response,NextFunction } from "express"
import { addsubscriber, dropUser, findUser, removesubscriber, subscribeUser, unsubscribeUser, updateUser } from "../services/user.service";
import { createError } from "../utils/error";

export const update =  async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id === res.locals.user.id) {
        try {
            const user = await updateUser(req.params.id, req.body);
          return  res.status(200).json(user);

        } catch (err:any) {
            return res.status(500).json(createError(500,err.message))
        }
    } else {
        return res.status(403).json(createError(403, "You can only update your account!"));
    }
};

export const drop = async (req: Request, res: Response, next: NextFunction) => {
     if (req.params.id === res.locals.user.id) {
        try {
          await dropUser(req.params.id);
          return  res.status(200).json("User has been deleted.");

        } catch (err:any) {
            return res.status(500).json(createError(500,err.message))
        }
    } else {
        return res.status(403).json(createError(403, "You can only delete your account!"));
    }
};
export const getuser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await findUser(req.params.id); 

        return res.status(200).json(user);
        
    } catch (err:any) {
        return res.status(500).json(createError(500, err.message));
    }
};
export const subscribe = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const subscribe = await subscribeUser(res.locals.user.id, req.params.id);

        if (subscribe) {
            await addsubscriber(res.locals.user.id);
            const user = await findUser(res.locals.user.id);
            
            return res.status(200).json(user);
        }
        

        
    } catch (err:any) {
        return res.status(500).json(createError(500, err.message));
    }
};
export const unsubscribe = async (req: Request, res: Response, next: NextFunction) => {
    try {
         const unsubscribe = await unsubscribeUser(res.locals.user.id, req.params.id);

        if (unsubscribe) {
            await removesubscriber(res.locals.user.id);
            const user = await findUser(res.locals.user.id);

            return res.status(200).json(user);
        }
    } catch (err:any) {
        return res.status(500).json(createError(500, err.message));
    }
};
export const like = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = res.locals.user.id;
        const videoId = req.params.videoId;

        await videoModel.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        });

        return res.status(200).json("The video has been liked")
        
    } catch (err:any) { 
        return res.status(500).json(createError(500, err.message));
    }
};
export const dislike =async (req: Request, res: Response, next: NextFunction) => {
    try {
           const id = res.locals.user.id;
        const videoId = req.params.videoId;

        await videoModel.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });

        return res.status(200).json("The video has been disliked")
    } catch (err:any) {
        return res.status(500).json(createError(500, err.message));
    }
};