import { Authenticator } from "../../objects/database";
import { Request, Response } from "express";

export const showLoginForm = (req: Request, res: Response) => {
    res.render("login", {
        layout: false,
        title: "Login"
    });
};

export const initialize = (passport: any) => {
    const authenticator = new Authenticator();
    authenticator.loginUser(passport);
};