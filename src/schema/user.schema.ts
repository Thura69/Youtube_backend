import { object,string } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({ required_error: "Name is required" }),
        email: string({ required_error: "Email is required" }),
        password: string({ required_error: "Password is required" }),
    })
});