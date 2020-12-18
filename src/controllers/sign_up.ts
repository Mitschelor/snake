import { Registrator } from "../../objects/database";
import { Request, Response } from "express";

export const showSignUpForm = (req: Request, res: Response) => {
    res.render("sign_up", {
        layout: false,
        title: "Sign Up"
    });
};

const registrator = new Registrator();

export const saveUser = (req: Request, res: Response) => {
    registrator.saveUser({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    });
};