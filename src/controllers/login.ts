import { Authenticator } from "../../objects/database";

const authenticator = new Authenticator();

authenticator.passwordIsCorrect({
    userName: "j"
});