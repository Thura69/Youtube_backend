import { userInput, videoModel } from './../models/video.modle';
export const saveVideo = async (userid: string, data: userInput) => {
    return await videoModel.create({ userId: userid, ...data });
};

export const findVideo = async (userid: string) => {
    return await videoModel.findById(userid);
}

export const userUpdateVideo = async (userid:string, data:userInput) => {
    return await videoModel.findByIdAndUpdate(userid, {
        $set: data
    }, {
        new: true
    });
}

export const userDeleteVideo = async (userid: string) => {
    return await videoModel.findByIdAndDelete(userid);
};

export const userAddView = async (userid: string) => {
    return await videoModel.findByIdAndUpdate(userid, {
        $inc: { views: 1 }
    });
};

export const userRandomVideo = async () => {
    return await videoModel.aggregate([{ $sample: { size: 40 } }]);
};

export const trendingVideos = async () => {
    return await videoModel.find().sort({views:-1})
}

export const userSubscribers = async (userid:string) => {
    return await videoModel.findById(userid);
}

export const userGetByTags = async (tagsArray: [string]) => {
    return await videoModel.find({ tags: { $in: tagsArray } }).limit(20);
}

export const userSearch = async (query: string) => {
    return await videoModel.find({ title: { $regex: query, $options: "i" } }).limit(40);
}