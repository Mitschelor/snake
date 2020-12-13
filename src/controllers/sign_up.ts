// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { UserData } from "../../models/user_data";

// dotenv.config();

// const uri: any = process.env.DB_URI;

// const getData = () => {
//     UserData.findOne({
//         "firstname": "Michael"
//     }).then((result) => {
//         console.log(result);
//         mongoose.connection.close();
//     }).catch((error) => {
//         console.log(error);
//         mongoose.connection.close();
//     });
// };

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Connected");
//     getData();
// }).catch((error) => {
//     console.log(error);
//     mongoose.connection.close();
// });

// import { Datasaver } from "../../objects/database";

// const datasaver = new Datasaver();

// datasaver.save({
//     firstName: "Michael",
//     lastName: "Schnyder",
//     userName: "Mitschelor",
//     email: "hallo@welt.ru",
//     password: "1234"
// }, [datasaver.userData]);

// import { Registrator } from "../../objects/database";

// const registrator = new Registrator();

// registrator.saveUser({
//     email: "hallo@welt.ru",
//     userName: "Mitschelor"
// });

import { Registrator } from "../../objects/database";

const registrator = new Registrator();

registrator.saveUser({
    email: "michael@shnyder.cc",
    userName: "Mitsche",
    firstName: "Michael",
    lastName: "Schnyder",
    password: "fettitante69"
});