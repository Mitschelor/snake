import { Request, Response } from "express";

export const showMenu = (req: Request, res: Response) => {
    res.render("menu", {
        layout: false,
        title: "Snake"
    });
};