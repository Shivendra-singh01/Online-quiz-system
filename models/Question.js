const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },

    isCorrect: {
        type: Boolean,
        required: true
    }
});

const questionSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true
        },

        questionText: {
            type: String,
            required: true
        },

        options: {
            type: [optionSchema],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Question", questionSchema);