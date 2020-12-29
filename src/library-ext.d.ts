import { Request } from "express";
import { User } from "./objects/user";
declare global {
    namespace Express {
        interface User {
            id: string;
            firstname: string;
            lastname: string;
            username: string;
            email: string;
        }
    }
}