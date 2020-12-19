import express, { Request, Response, NextFunction } from "express";
import path from "path";
import exphbs from "express-handlebars";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import flash from "express-flash";
import session from "express-session";

import * as indexController from "./controllers/index";
import * as signUpController from "./controllers/sign_up";

dotenv.config();

const app = express();
const session_secret: any = process.env.SESSION_SECRET;

const public_path = path.join(__dirname, "../public");
console.log(`Public path is ${public_path}`);
app.use(express.static(public_path));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(session({
    secret: session_secret,
    saveUninitialized: false,
    resave: false,
    name: "Snake"
}));
app.use(flash());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.err_msg = req.flash("err_msg");
    res.locals.neutral_msg = req.flash("netral_msg");
    next();
});

app.set("views", path.join(__dirname, "../views"));
app.set("port", process.env.PORT || 3000);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", indexController.home);
app.get("/signup", signUpController.showSignUpForm);
app.post("/sign_up", signUpController.saveUser);

export default app;