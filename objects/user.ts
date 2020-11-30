import dotenv from "dotenv";

dotenv.config();

export class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public userName: string;
    protected uri: any;

    constructor(userData: UserData) {
        this.userId = userData.userId;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.email = userData.email;
        this.userName = userData.userName;
    }

}

interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
}