const Quiz = require("../models/Quiz");

const Question = require("../models/Question");


const createQuiz = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const quiz = await Quiz.create({
            title,
            description,
            createdBy: req.user.userId
        });

        res.status(201).json({
            message: "Quiz created successfully",
            quiz
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const addQuestion = async (req, res) => {
    try {
        const { questionText, options } = req.body;

        if (!questionText || !options || options.length < 2) {
            return res.status(400).json({
                message: "Question and at least 2 options are required"
            });
        }

        const correctOptions = options.filter(option => option.isCorrect);

        if (correctOptions.length !== 1) {
            return res.status(400).json({
                message: "There must be exactly one correct option"
            });
        }

        const question = await Question.create({
            quizId: req.params.quizId,
            questionText,
            options
        });

        res.status(201).json({
            message: "Question added successfully",
            question
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createQuiz, addQuestion };