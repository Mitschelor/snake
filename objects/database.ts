import mongoose from "mongoose";
import { UserData } from "../models/user_data";
import { Scores } from "../models/scores";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import passportLocal from "passport-local";

dotenv.config();
const LocalStrategy = passportLocal.Strategy;

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

    private hashPasswordAndSaveUserData(input: Data) {
        console.log("Saving...");
        bcrypt.hash(input.password, 10).then((hash) => {
            input.password = hash;
            this.save(input, [this.userData]);
        }).catch((error) => console.log(error));
    }

    protected checkIfDataIsAlreadyRegisteredAndSaveIfNotRegistered(req: Request, res: Response, { result, input }: { result: Data; input: Data; }) {
        if (this.thisEmailIsRegistered(result)) {
            console.log("Email is Registered, checking username...");
            if (this.thisUsernameIsRegistered(result)) {
                console.log("Username and Email are already registered");
                this.closeConnection();
                req.flash("err_msg", "This username and this email are already registered.");
                res.redirect("signup");
            } else {
                console.log("This email is already registered");
                this.closeConnection();
                req.flash("err_msg", "This email is already registered");
                res.redirect("signup");
            }
        } else if (this.thisUsernameIsRegistered(result)) {
            console.log("Username is already registered.");
            this.closeConnection();
            req.flash("err_msg", "This username is already registered.");
            res.redirect("signup");
        } else {
            this.hashPasswordAndSaveUserData(input);
            res.redirect("/");
        }
    }

    saveUser(req: Request, res: Response, input: Data) {
        this.downloadUserData(input).then((result) => {
            this.checkIfDataIsAlreadyRegisteredAndSaveIfNotRegistered(req, res, { result, input });
        });
    }
}

export class Authenticator extends Registrator {
    async passwordIsCorrect(input: Data) {
        let isPasswordCorrect: Promise<boolean>;
        this.connect();
        UserData.findOne({
            "username": input.userName
        }).then((result) => {
            this.closeConnection();
            const hashedPassword = result?.toObject().password;
            isPasswordCorrect = bcrypt.compare(input.password, hashedPassword, (error, isMatch) => {
                if (error) {
                    throw new Error("Something went wrong!");
                }
                if (isMatch) {

                } else {
                    return false;
                }
            });
        }).catch((error) => console.log(error));
    }

    loginUser(passport: any) {
        passport.use(new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        }, (req, username, password, done) => {
            this.connect();
            UserData.findOne({
                "username": username
            }).then((user) => {
                this.closeConnection();
                const hashedPassword = user?.toObject().password;
                bcrypt.compare(password, hashedPassword, (error, isMatch) => {
                    if (error) {
                        throw new Error("Something went wrong!");
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, req.flash("err_msg", "Wrong Password!"));
                    }
                });
            }).catch((error) => console.log(error));
        }));
        passport.serializeUser((user: any, done: any) => {
            done(null, user.id);
        });
        passport.deserializeUser((id: any, done: any) => {
            this.connect();
            UserData.findOne({
                "id": id
            }).then((result) => {
                this.closeConnection();
                return done(null, result);
            });
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