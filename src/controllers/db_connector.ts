import { DataBase } from "../../objects/database";

const database = new DataBase({
    userId: 2,
    score: 30
});

database.saveScore();




// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { Scores } from "../../models/scores";

// dotenv.config();

// const uri: any = process.env.DB_URI;

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("success"))
//     .catch((error) => console.log(error));



// const saveStuff = () => {
//     const instance = new Scores({
//         userId: 1,
//         score: 7
//     });
//     instance.save()
//         .then(() => console.log("success"))
//         .catch((error) => console.log(error));
// };

// saveStuff();