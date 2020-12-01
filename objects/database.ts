import mongoose from "mongoose";
import { UserData } from "../models/user_data";
import { Scores } from "../models/scores";
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

    private connect() {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).catch((error) => console.log(error));
    }

    saveScore() {
        this.connect();
        const instance = new Scores({
            userId: this.userId,
            score: this.score
        });

        instance.save().catch((error) => console.log(error));
    }

    saveUser() {
        this.connect();
        const instance = new UserData({
            userId: this.userId,
            firstname: this.firstName,
            lastname: this.lastName,
            username: this.userName,
            email: this.email,
            password: this.password
        });

        instance.save().catch((error) => console.log(error));
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

const database = new DataBase({
    userId: 1,
    score: 2
});

database.saveScore();