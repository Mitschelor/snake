import app from "./app";
import errorHandler from "errorhandler";

if (app.get("env") == "development") {
    app.use(errorHandler());
}

const server = app.listen(3000, () => {
    console.log("App is running at localhost:3000");
});

export default server;