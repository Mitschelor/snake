import mongoose from "mongoose";
import { UserData } from "../models/user_data";
import { Scores } from "../models/scores";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "./user";

dotenv.config();

class Database {
    readonly uri: any;
    readonly score: string;
    readonly userData: string;

    constructor() {
        this.uri = process.env.DB_URI;
        this.score = "score";
        this.userData = "userData";
    }

    protected connect() {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log("success"))
            .catch((error) => console.log(error));
    }

    protected closeConnection() {
        mongoose.connection.close();
    }
}

export class Datasaver extends Database {
    protected upload(instance: mongoose.Document) {
        instance.save().then(() => {
            this.closeConnection();
            console.log("Saved");
        }).catch((error) => {
            this.closeConnection();
            console.log(error);
        });
    }

    protected saveScore(input: Data) {
        this.connect();
        const instance = new Scores({
            score: input.score
        });
        this.upload(instance);
    }

    protected saveUser(input: Data) {
        this.connect();
        const instance = new UserData({
            firstname: input.firstName,
            lastname: input.lastName,
            username: input.userName,
            email: input.email,
            password: input.password,
            score: input.score
        });
        this.upload(instance);
    }

    protected findDocumentAndSaveData(input: Data, name: string) {
        switch (name) {
            case "score":
                this.saveScore({
                    score: input.score
                });
                break;
            case "userData":
                this.saveUser({
                    score: input.score,
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

export class Registrator extends Datasaver {
    protected user(credential: string) {
        this.connect();
        const user = UserData.findOne({
            "email": credential,
        }).catch((error) => {
            console.log(error);
            this.closeConnection();
        });
        if (!user) {
            this.connect();
            const user = UserData.findOne({
                "username": credential,
            }).catch((error) => {
                console.log(error);
                this.closeConnection();
            });
        }
        return user;
    }

    protected userIsAlreadyRegistered(userData: unknown): boolean {
        const isRegistered: boolean = userData != undefined;
        if (isRegistered) {
            return true;
        } else {
            return false;
        }
    }

    protected EmailOrUsernameAreRegistered(input: Data): boolean {
        let counter: number = 0;
        for (let credential in input) {
            this.user(credential).then((result) => {
                if (this.userIsAlreadyRegistered(result)) {
                    counter++;
                } else {
                    counter;
                }
            });
        }
        const isRegistered: boolean = counter > 0;
        if (isRegistered) {
            return true;
        } else {
            return false;
        }
    }

    saveUser(input: Data) {
        if (this.EmailOrUsernameAreRegistered(input)) {
            console.log("Error: Is already Registered");
        } else {
            this.save(input, [this.userData]);
        }
    }
}

interface Data {
    score?: number[],
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    password?: string;
}