import { object,string } from "zod";


export const videoSchema = object({
    body: object({
        title: string({ required_error: "Title is required" }),
        description: string({ required_error: "Description is required" }),
        imgUrl: string({ required_error: "Imgurl is required" }),
        videoUrl: string({ required_error: "VideoUrl is required" })
    })
});
