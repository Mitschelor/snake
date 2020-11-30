import mongoose from "mongoose";
import { UserData } from "../models/user_data";
import dotenv from "dotenv";

dotenv.config();

export class DataBase {
    readonly uri: any;
    public userId?: number;
    public score?: number;
    public firstName?: string;
    public lastName?: string;
    public userName?: string;
    public email?: string;
    public password?: string;

    constructor(userData: Data) {
        this.uri = process.env.DB_URI;
        this.userId = userData.userId;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.userName = userData.userName;
        this.email = userData.email;
        this.password = userData.password;
    }

    connectToDataBase() {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).catch((error) => console.log(error));
    }
}

interface Data {
    userId?: number,
    score?: number,
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    password?: string;
}