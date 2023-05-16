import { Request,Response,NextFunction,Express } from "express";
import { signup,signin} from "../controller/auth.controller";

export function authRoute(app: Express) {
    
    //create user 
    app.post('/api/auth/singup', signup);

    //signin
    app.post('/api/auth/singin', signin);


}