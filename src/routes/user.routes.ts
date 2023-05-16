import { verifyToken } from './../utils/verifyToken';
import { update, drop, getuser, subscribe, unsubscribe, like, dislike } from './../controller/user.controller';
import { Request, Response, NextFunction, Express } from "express";


export function userRoute(app: Express) {
    
    //update user 
    app.put('/api/user/:id',verifyToken, update);

    //delete user
    app.delete('/api/user/:id',verifyToken, drop);

    //get user 
    app.get('/api/user/find/:id', getuser);

    //subscribe user 
    app.put('/api/user/sub/:id',verifyToken, subscribe);

    //unsubscribe user 
    app.put('/api/user/unsub/:id',verifyToken, unsubscribe);

    //like a video
    app.put('/api/user/like/:videoId',verifyToken, like);

    //dislike a video
    app.put('/api/user/dislike/:videoId',verifyToken, dislike);

}