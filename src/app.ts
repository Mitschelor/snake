import express from "express";
import path from "path";
import exphbs from "express-handlebars";

import * as indexController from "./controllers/index";

const app = express();

const public_path = path.join(__dirname, "../public");
console.log(`Public path is ${public_path}`);
app.use(express.static(public_path));
app.set("views", path.join(__dirname, "../views"));
app.set("port", process.env.PORT || 3000);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", indexController.home);

export default app;