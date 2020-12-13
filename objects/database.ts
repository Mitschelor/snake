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
        console.log("Connection closed");
    }
}

export class Datasaver extends Database {
    private upload(instance: mongoose.Document) {
        instance.save().then(() => {
            this.closeConnection();
            console.log("Saved");
        }).catch((error) => {
            this.closeConnection();
            console.log(error);
        });
    }

    private saveScore(input: Data) {
        this.connect();
        const instance = new Scores({
            score: input.score
        });
        this.upload(instance);
    }

    private saveUserData(input: Data) {
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
                this.saveUserData({
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
    protected async downloadUserData(user: Data) {
        this.connect();
        const foundEmail: Promise<void | mongoose.Document | null> = UserData.findOne({
            "email": user.email,
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
        const foundUsername = UserData.findOne({
            "username": user.userName
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
        const email: any = await foundEmail;
        const username: any = await foundUsername;
        const result: Data = {
            email: email,
            userName: username
        };
        return result;
    }

    protected userIsAlreadyRegistered(userData: unknown): boolean {
        const isRegistered: boolean = userData != undefined;
        if (isRegistered) {
            return true;
        } else {
            return false;
        }
    }

    protected thisEmailIsRegistered(result: Data): boolean {
        if (result.email != null) {
            return true;
        } else {
            return false;
        }
    }

    protected thisUsernameIsRegistered(result: Data): boolean {
        if (result.userName != null) {
            return true;
        } else {
            return false;
        }
    }

    protected checkIfDataIsAlreadyRegisteredAndSaveIfNotRegistered({ result, input }: { result: Data; input: Data; }) {
        if (this.thisEmailIsRegistered(result)) {
            console.log("Email is Registered, checking username...");
            if (this.thisUsernameIsRegistered(result)) {
                console.log("Username and Email are already registered");
                this.closeConnection();
            } else {
                console.log("This username is already registered");
                this.closeConnection();
            }
        } else if (this.thisUsernameIsRegistered(result)) {
            console.log("Username is already registered.");
            this.closeConnection();
        } else {
            console.log("Saving...");
            this.save(input, [this.userData]);
        }
    }

    saveUser(input: Data) {
        this.downloadUserData(input).then((result) => {
            this.checkIfDataIsAlreadyRegisteredAndSaveIfNotRegistered({ result, input });
        });
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