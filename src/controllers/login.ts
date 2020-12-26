import Database from "../objects/database";
import { Request, Response } from "express";

const authenticator = new Database.Authenticator();
export const showLoginForm = (req: Request, res: Response) => {
    res.render("login", {
        layout: false,
        title: "Login"
    });
};

export const initialize = (passport: any) => {
    authenticator.loginUser(passport);
};