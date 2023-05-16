import { findVideo } from './../services/video.service';
import { userAddComment, isComment, userDeleteComment, getAllComment } from './../services/comment.service';
import { Request,Response,NextFunction } from 'express';
import { createError } from '../utils/error';
export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const comment = await userAddComment(req.body,res.locals.user.id);

        return res.status(200).json(comment);
        
    } catch (err: any) {
        return res.status(500).json(createError(500, err.message))
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await isComment(req.params.id);
        const video = await findVideo(req.params.id);

        if (res.locals.user.id === comment?.id || res.locals.user.id === video?.userId) {
            await userDeleteComment(req.params.id);

            return res.status(200).json("The comment has been deleted");
        } else {
            return res.status(403).json("You can delete only your comment");
        }
    } catch (err: any) {
        return res.status(500).json(createError(500, err.message))
    }
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await getAllComment(req.params.videoid);

        return res.status(200).json(comments);
    } catch (err:any) {
        return res.status(500).json(createError(500,err.message))
    }
}


