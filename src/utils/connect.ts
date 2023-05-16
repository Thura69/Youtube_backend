import mongoose from "mongoose";
import config from 'config';




export function connect() {
    mongoose.connect(config.get<string>('dbname')).then(() => {
        console.log("Data base is connected");
});

};
