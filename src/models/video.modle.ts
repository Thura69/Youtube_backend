import { UserInput } from './user.model';
import  mongoose  from 'mongoose';
import { Schema } from 'mongoose';

export interface userInput {
    title: string,
    description: string,
    imgUrl: string,
    videoUrl:string
};

export interface VideoDocument extends userInput, mongoose.Document{
    userId: string,
    views: number,
    tags: [string],
    likes: [string],
    dislikes: [string],
    createdAt: Date,
    updatedAt: Date,
}


export const videoSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String],
            default: []
        },
        likes: {
            type: [String],
            default: []
        },
        dislikes: {
            type: [String],
            default: []
        }
    }, {
    timestamps: true
}
);

export const videoModel = mongoose.model<VideoDocument>("video", videoSchema);