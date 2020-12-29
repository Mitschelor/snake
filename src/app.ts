import express, { Request, Response, NextFunction } from "express";
import path from "path";
import exphbs from "express-handlebars";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";
import Database from "./objects/database";
import cookieParser from "cookie-parser";
import { IGetUserAuthInfoRequest } from "./definitions";

import * as indexController from "./controllers/index";
import * as signUpController from "./controllers/sign_up";
import * as loginController from "./controllers/login";
import * as menuController from "./controllers/menu";



dotenv.config();
const database = new Database.Database();
const datasaver = new Database.Datasaver();
const authenticator = new Database.Authenticator();
const registrator = new Database.Registrator();

const app = express();
const session_secret: any = process.env.SESSION_SECRET;
authenticator.loginUser(passport);

const public_path = path.join(__dirname, "../public");
console.log(`Public path is ${public_path}`);
path.join(__dirname, "../views/index.handlebars");
app.use(cookieParser(session_secret));
app.use(express.static(public_path));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(session({
    secret: session_secret,
    saveUninitialized: false,
    resave: false,
    name: "Snake"
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.err_msg = req.flash("err_msg");
    res.locals.neutral_msg = req.flash("netral_msg");
    next();
});
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.currentUser = req.user;
    next();
});
app.set("views", path.join(__dirname, "../views"));
app.set("port", process.env.PORT || 3000);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", menuController.showMenu);
app.get("/game", indexController.home);
app.get("/signup", signUpController.showSignUpForm);
app.post("/sign_up", (req: Request, res: Response) => {
    registrator.saveUser(req, res, {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        userName: req.body.username,
        password: req.body.password
    });
});
app.get("/loginform", loginController.showLoginForm);
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/loginform",
    failureFlash: true
}));
app.get("/logout", authenticator.logout);
app.get("/game/save-score", (req: IGetUserAuthInfoRequest, res: Response) => {
    datasaver.save({
        id: req.user
    }, [database.score]);
    res.redirect("/game");
});

export default app;