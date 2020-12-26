import { Request, Response } from "express";

export const showSignUpForm = (req: Request, res: Response) => {
    res.render("sign_up", {
        layout: false,
        title: "Sign Up"
    });
};