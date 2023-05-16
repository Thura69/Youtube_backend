import { addComment, deleteComment, getComment } from './../controller/comment.controller';
import { verifyToken } from './../utils/verifyToken';
import { Request,Response,NextFunction,Express } from "express";

export function commentRoute(app: Express) {
    

    app.post('/api/comment/add', verifyToken, addComment);

    app.delete('/api/comment/delete/:id', verifyToken, deleteComment);

    app.get('/api/comment/get/:videoid', getComment);
    

}