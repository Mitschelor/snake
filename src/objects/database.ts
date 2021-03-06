import mongoose from "mongoose";
import { UserData } from "../../models/user_data";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import passportLocal from "passport-local";

dotenv.config();
const LocalStrategy = passportLocal.Strategy;

module Database {
    export class Database {
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
            });
        }

        // protected closeConnection() {
        //     mongoose.connection.close();
        //     console.log("Connection closed");
        // }
    }

    export class Datasaver extends Database {
        private upload(instance: mongoose.Document) {
            instance.save().then(() => {
                // this.closeConnection();
                console.log("Saved");
            }).catch((error) => {
                // this.closeConnection();
                console.log(error);
            });
        }

        private async saveScore(input: Data): Promise<any> {
            try {
                this.connect();
                const result = await UserData.updateOne(
                    { "_id": input.id },
                    { "$push": { "score": input.score } }
                );
                return result;
            } catch (error) {
                console.log(error);
            } finally {
                // this.closeConnection();
            }
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

        protected findDocumentAndSaveData(req: Request, res: Response, input: Data, name: string) {
            switch (name) {
                case "score":
                    this.saveScore(input).then((result) => {
                        console.log(result);
                        req.flash("success_msg", "Your score has been saved successfully.");
                        res.redirect("/game");
                    }).catch((error) => {
                        console.trace(error);
                        req.flash("err_msg", "Something went wrong!");
                        res.redirect("/game");
                    });
                    break;
                case "userData":
                    this.saveUserData(input);
                    break;
            }
        }

        save(req: Request, res: Response, input: Data, documentNames: string[]) {
            for (let name of documentNames) {
                this.findDocumentAndSaveData(req, res, input, name);
            }
        }
    }

    export class Registrator extends Datasaver {
        async lookForEmailAndUsername(user: Data): Promise<Data> {
            try {
                this.connect();
                const foundEmail: Promise<void | mongoose.Document | null> = UserData.findOne({
                    "email": user.email,
                }).then((result) => {
                    return result;
                }).catch((error) => {
                    console.log(error);
                });
                const foundUsername: Promise<void | mongoose.Document | null> = UserData.findOne({
                    "username": user.userName
                }).then((result) => {
                    return result;
                }).catch((error) => {
                    console.log(error);
                });
                let email: any = await foundEmail;
                let username: any = await foundUsername;
                const result: Data = {
                    email: email,
                    userName: username
                };
                return result;
            } catch (error) {
                throw new Error(`Something went wrong! ${error}`);
            }
        }

        protected userIsAlreadyRegistered(userData: unknown): boolean {
            const isRegistered: boolean = userData != undefined;
            if (isRegistered) {
                return true;
            } else {
                return false;
            }
        }

        private hashPasswordAndSaveUserData(req: Request, res: Response, input: Data) {
            bcrypt.hash(input.password, 10).then((hash) => {
                input.password = hash;
                this.save(req, res, input, [this.userData]);
            }).catch((error) => console.log(error));
        }

        protected checkIfDataIsAlreadyRegisteredAndSaveIfNotRegistered(req: Request, res: Response, { result, input }: { result: Data; input: Data; }) {
            const thisEmailIsRegistered: boolean = result.email != null;
            const thisUsernameIsRegistered: boolean = result.userName != null;
            if (thisEmailIsRegistered) {
                if (thisUsernameIsRegistered) {
                    // this.closeConnection();
                    req.flash("err_msg", "This username and this email are already registered.");
                    res.redirect("signup");
                } else {
                    // this.closeConnection();
                    req.flash("err_msg", "This email is already registered");
                    res.redirect("signup");
                }
            } else if (thisUsernameIsRegistered) {
                // this.closeConnection();
                req.flash("err_msg", "This username is already registered.");
                res.redirect("signup");
            } else {
                this.hashPasswordAndSaveUserData(req, res, input);
                req.flash("success_msg", "You have been successfully registered.");
                res.redirect("/loginform");
            }
        }

        saveUser(req: Request, res: Response, input: Data) {
            this.lookForEmailAndUsername(input).then((result) => {
                this.checkIfDataIsAlreadyRegisteredAndSaveIfNotRegistered(req, res, { result, input });
            }).catch((error) => console.log(error));
        }
    }

    export class Authenticator extends Database {
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
                    // this.closeConnection();
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
                }).catch((error) => {
                    // this.closeConnection();
                    console.log(error);
                });
            }));
            passport.serializeUser((user: any, done: any) => {
                done(null, user.id);
            });
            passport.deserializeUser((id: any, done: any) => {
                this.connect();
                UserData.findById(id, (error, result) => {
                    done(error, result);
                    // this.closeConnection();
                });
            });
        }
        logout(req: Request, res: Response) {
            req.logout();
            req.flash("success_msg", "You have logged out successfully.");
            res.redirect("/");
        }
    }

    export interface Data {
        id?: any,
        score?: number,
        firstName?: string,
        lastName?: string,
        userName?: string,
        email?: string,
        password?: string;
    }
}

export default Database;