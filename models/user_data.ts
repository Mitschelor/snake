import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    score: [{
        type: Number,
        required: false
    }]
}, { timestamps: true });

export const UserData = mongoose.model("User", userSchema);