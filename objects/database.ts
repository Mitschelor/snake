import mongoose from "mongoose";
import { UserData } from "../models/user_data";
import { Scores } from "../models/scores";
import dotenv from "dotenv";

dotenv.config();

export class DataBase {
    readonly uri: any;
    readonly score: string;
    readonly userData: string;

    constructor() {
        this.uri = process.env.DB_URI;
        this.score = "score";
        this.userData = "userData";
    }

    private connect() {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log("success"))
            .catch((error) => console.log(error));
    }

    private upload(instance: mongoose.Document) {
        instance.save().then(() => {
            mongoose.connection.close();
            console.log("Saved");
        }).catch((error) => {
            mongoose.connection.close();
            console.log(error);
        });
    }

    private saveScore(input: Data) {
        this.connect();
        const instance = new Scores({
            userId: input.userId,
            score: input.score
        });
        this.upload(instance);
    }

    private saveUser(input: Data) {
        this.connect();
        const instance = new UserData({
            firstname: input.firstName,
            lastname: input.lastName,
            username: input.userName,
            email: input.email,
            password: input.password
        });
        this.upload(instance);
    }

    private findDocumentAndSaveData(input: Data, name: string) {
        switch (name) {
            case "score":
                this.saveScore({
                    userId: input.userId,
                    score: input.score
                });
                break;
            case "userData":
                this.saveUser({
                    firstName: input.firstName,
                    lastName: input.lastName,
                    userName: input.userName,
                    email: input.email,
                    password: input.password
                });
                break;
        }
    }

    save(input: Data, documentNames: string[]) {
        for (let name of documentNames) {
            this.findDocumentAndSaveData(input, name);
        }
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