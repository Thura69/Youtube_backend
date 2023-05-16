import mongoose  from 'mongoose';
import { Schema } from 'mongoose';

export interface userInput {
    desc:string
};

export interface CommentDocument extends userInput, mongoose.Document{
    userId: string,
    videoId: string,
    createdAt: Date,
    updatedAt: Date,
}


const CommentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const commentModel = mongoose.model("comment", CommentSchema);