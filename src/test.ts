// import mongoose from "mongoose";
// import Database from "./objects/database";
// import { UserData } from "../models/user_data";

// const database = new Database.Database();

// const test = async (input: Database.Data) => {
//     try {
//         database.connect();
//         const result = await UserData.update(
//             { "_id": input.id },
//             { "$push": { "score": input.score } }
//         );
//         return result;
//     } catch {
//         console.log("Fuck you");
//     } finally {
//         database.closeConnection();
//     }
// };

// // test({
// //     id: "5fea65f0eb0aa700eaae9145",
// //     score: 75
// // }).then((result) => console.log(result)).catch((error) => console.log(error));

// const test2 = async () => {
//     try {
//         database.connect();
//         const user = await UserData.findById("5fea65f0eb0aa700eaae9145");
//         return user;
//     } catch {
//         console.log("fuck you");
//     } finally {
//         database.closeConnection();
//     }
// };

// test2().then((result) => {
//     console.log(result);
// });