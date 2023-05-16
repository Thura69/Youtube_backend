import { Express } from 'express'
import { authRoute } from './routes/auth.routes';
import { commentRoute } from './routes/comment.routes';
import { userRoute } from './routes/user.routes';
import { videoRoute } from './routes/video.routes';


export function routes(app: Express) {
    
    //userRoute
    userRoute(app);

    //videoRoute
    videoRoute(app);

    //commentRoute
    commentRoute(app);

    //authRoute
    authRoute(app);
    
};