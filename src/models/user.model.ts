import  mongoose  from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';


export interface UserInput {
    name: string,
    email: string,
    password: string,
    img:string
}

export interface UserDocument extends UserInput, mongoose.Document{
    subscribers: number,
    subscribedUsers: [string],
    createdAt: Date,
    updatedAt: Date,
}


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String],
    }
}, {
    timestamps: true
});



export const userModel = mongoose.model<UserDocument>("user", userSchema);