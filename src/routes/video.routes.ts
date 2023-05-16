import { addVideo, deleteVideo, updateVideo, getVideo, sub, random, trend, addView, getByTag, search } from './../controller/video.controller';
import { verifyToken } from './../utils/verifyToken';
import { Request,Response,NextFunction,Express } from "express";

export function videoRoute(app: Express) {
    
    app.post('/api/video/post', verifyToken, addVideo);
    
    app.put('/api/video/update/:id', verifyToken, updateVideo);

    app.delete('/api/video/delete/:id', verifyToken, deleteVideo);

    app.get('/api/video/find/:id', getVideo);

    app.put('/api/video/view/:id', addView);

    app.get('/api/video/trend', trend);

    app.get('/api/video/random', random);

    app.get('/api/video/sub', verifyToken, sub);
    
    app.get('/api/video/tags', getByTag);

    app.get('/api/video/search',search);




}