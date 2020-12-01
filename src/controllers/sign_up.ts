import { DataBase } from "../../objects/database";

const database = new DataBase();

database.save({
    userId: 9,
    score: 300,
    firstName: "Michael",
    lastName: "Schnyder",
    userName: "Mitschelor",
    email: "dinitante@schwarz.ch",
    password: "dinitanteeschfett"
}, [database.score, database.userData]);