import { Request } from "express";
import { User } from "./objects/user";

export interface IGetUserAuthInfoRequest extends Request {
    user_id?: string;
}

export interface GetUser extends User {
    id?: string;
}