import { saveVideo, findVideo, userUpdateVideo, userDeleteVideo, userAddView, userRandomVideo, trendingVideos, userSubscribers, userGetByTags, userSearch } from './../services/video.service';
import { videoModel } from './../models/video.modle';
import { Request, Response, NextFunction } from "express";
import { createError } from '../utils/error';
import { findUser } from '../services/user.service';

 
export const addVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newVideo = await saveVideo(res.locals.user.id, req.body);

        if (!newVideo) return res.status(400).json(createError(400, "Bad request")); 
        
        return res.status(200).json(newVideo);
        
    } catch (err: any) {
        return res.status(500).json(createError(500, err.message));
    }
};



export const updateVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const isVideo = await findVideo(req.params.id);

        if (!isVideo) return res.status(404).json(createError(404, "Video not found"));
        if (res.locals.user.id === isVideo.id) {
            const updatedUser = await userUpdateVideo(req.params.id, req.body);

            return res.status(200).json(updatedUser);
        } else {
            return res.status(403).json(createError(403, "You can update only your video"));
        }

    } catch (err:any) {
        return res.status(500).json(createError(500, err.message));
    }
}


export const deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const isVideo = await findVideo(req.params.id);

        if (!isVideo) return res.status(404).json(createError(404, "Video not found"));
        if (res.locals.user.id === isVideo.id) {
            await userDeleteVideo(req.params.id);
            return res.status(200).json("The video has been deleted");
        } else {
            return res.status(403).json(createError(403, "You can delete only your video"));
        }

    } catch (err: any) {
        return res.status(500).json(createError(500, err.message));
    }
};



export const getVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const video = await findVideo(req.params.id);
        
        return res.status(200).json(video);

    } catch (err: any) {
        return res.status(500).json(createError(500, err.message));
    }
};

export const addView = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userAddView(req.params.id);
        return res.status(200).json("The view has been increased");
    } catch (err: any) {
        return res.status(500).json(createError(500, err.message));
    }
}

export const random = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const videos = await userRandomVideo();

        return res.status(200).json(videos);

    } catch (err: any) {
        return res.status(500).json(createError(500, err.message));
    }
}


export const trend = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const videos = await trendingVideos();

        return res.status(200).json(videos);

    } catch (err: any) {
        return res.status(500).json(createError(500, err.message));
    }
}


export const sub = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await findUser(res.locals.user.id);
        const subscribedChannels = user?.subscribedUsers;

        const list =await Promise.all(
            subscribedChannels!.map((channelId) => {
                return videoModel.find({ userId: channelId }).sort({ createdAt: -1 }) 
            })
        );

        res.status(200).json(list.flat());

    } catch (err: any) {
        return res.status(500).json(createError(500, err.message));
    }
}

export const getByTag = async (req: Request, res: Response, next: NextFunction) => {
    const tags: any = req.query.tags;
    const tagsArray = tags?.split(',');
  
    try {
        const videos = await userGetByTags(tagsArray);

        return res.status(200).json(videos);
        
    } catch (err: any) {
        return res.status(500).json(createError(500, err.message))
    }
};

export const search = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query.q
    try {
        if (query) {
            const videos = await userSearch(query as string);
            
            return res.status(200).json(videos);
         
     }        
    } catch (err: any) {
        return res.status(500).json(createError(500, err.message));
    }
}