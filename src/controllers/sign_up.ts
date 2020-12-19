import { Registrator } from "../../objects/database";
import { Request, Response } from "express";

export const showSignUpForm = (req: Request, res: Response) => {
    res.render("sign_up", {
        layout: false,
        title: "Sign Up"
    });
};

export const saveUser = (req: Request, res: Response) => {
    const registrator = new Registrator();
    registrator.saveUser(req, res, {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        userName: req.body.username,
        password: req.body.password
    });
};