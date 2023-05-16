import { UserInput } from '../models/user.model';
import {Response,Request} from 'express';
import { userModel } from '../models/user.model';


export async function saveUser(body:UserInput,securePassword:string) {
    return await userModel.create({ ...body, password: securePassword })
}

export async function updateUser(id: string, data: UserInput) {
    return await userModel.findByIdAndUpdate(id, {
        $set:data
    }, {
        new:true
    })
};

export async function dropUser(id: string) {
    return await userModel.findByIdAndDelete(id);
}

export async function subscribeUser(userid: string, channel: string) {
    console.log(userid);
    console.log(channel);
    return await userModel.updateOne({_id:userid}, {
        $push : {subscribedUsers:channel}
    })
}

export async function unsubscribeUser(userid: string, channel: string) {
    return await userModel.updateOne({ _id: userid }, {
        $pull:{subscribedUsers:channel}
    })
}

export async function addsubscriber(userid: string) {
    return await userModel.findByIdAndUpdate(userid, {
        $inc:{subscribers:1}
    })
}

export async function removesubscriber(userid: string) {
    return await userModel.findByIdAndUpdate(userid, {
        $inc:{subscribers:-1}
    })
}

export async function findUser(id: string) {
    return await userModel.findById(id);
}