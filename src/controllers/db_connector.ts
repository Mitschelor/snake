import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri: any = process.env.DB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => console.log(error));

