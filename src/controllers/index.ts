import { Request, Response } from "express";

export const home = (req: Request, res: Response) => {
    res.render("index", {
        layout: false,
        title: "Snake"
    });
};