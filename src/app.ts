import express from 'express';
import { connect } from './utils/connect';
import { routes } from './routes';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';



const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    
    console.log("I am here");
    
    const status =  500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false,
        status: status,
        message:message
    })

})

app.listen(3003, () => {

    console.log("Server  is running now");
    //Data base
    connect();

    //routes
    routes(app);
})