const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const Result = require("../models/Result");

const submitQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                message: "Answers are required"
            });
        }

        // Check if quiz exists
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        // Get all questions belonging to this quiz
        const questions = await Question.find({ quizId });

        if (questions.length === 0) {
            return res.status(404).json({
                message: "No questions found for this quiz"
            });
        }

        let score = 0;

        // Check each submitted answer
        for (const answer of answers) {

            const question = questions.find(
                question => question._id.toString() === answer.questionId
            );

            if (!question) {
                continue;
            }

            const selectedOption = question.options.find(
                option => option._id.toString() === answer.selectedOptionId
            );

            if (selectedOption && selectedOption.isCorrect) {
                score++;
            }
        }

        // Save result
        const result = await Result.create({
            userId: req.user.userId,
            quizId,
            score,
            totalQuestions: questions.length
        });

        res.status(201).json({
            message: "Quiz submitted successfully",
            score,
            totalQuestions: questions.length,
            resultId: result._id
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    submitQuiz
};