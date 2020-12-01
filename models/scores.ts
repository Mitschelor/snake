import mongoose, { Schema } from "mongoose";

const scoreSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    });

export const Scores = mongoose.model("Score", scoreSchema);