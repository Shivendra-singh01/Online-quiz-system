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

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        const questions = await Question.find({ quizId });

        if (questions.length === 0) {
            return res.status(404).json({
                message: "No questions found for this quiz"
            });
        }

        // Number of submitted answers must match number of questions
        if (answers.length !== questions.length) {
            return res.status(400).json({
                message: `You must answer all ${questions.length} questions`
            });
        }

        // Prevent duplicate question IDs
        const questionIds = answers.map(answer => answer.questionId);

        const uniqueQuestionIds = new Set(questionIds);

        if (uniqueQuestionIds.size !== answers.length) {
            return res.status(400).json({
                message: "Duplicate question answers are not allowed"
            });
        }

        let score = 0;

        for (const answer of answers) {

            const question = questions.find(
                question =>
                    question._id.toString() === answer.questionId
            );

            if (!question) {
                return res.status(400).json({
                    message: "Invalid question ID"
                });
            }

            const selectedOption = question.options.find(
                option =>
                    option._id.toString() === answer.selectedOptionId
            );

            if (!selectedOption) {
                return res.status(400).json({
                    message: "Invalid option for question"
                });
            }

            if (selectedOption.isCorrect) {
                score++;
            }
        }

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
            percentage: Math.round(
                (score / questions.length) * 100
            ),
            resultId: result._id
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getMyResults = async (req, res) => {
    try {
        const results = await Result.find({
            userId: req.user.userId
        })
        .populate("quizId", "title")
        .sort({ createdAt: -1 });

        const formattedResults = results.map(result => ({
            resultId: result._id,
            quizId: result.quizId?._id,
            quizTitle: result.quizId?.title,
            score: result.score,
            totalQuestions: result.totalQuestions,
            percentage: Math.round(
                (result.score / result.totalQuestions) * 100
            ),
            submittedAt: result.createdAt
        }));

        res.json({
            results: formattedResults
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getQuizResults = async (req, res) => {
    try {
        const { quizId } = req.params;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        const results = await Result.find({ quizId })
            .populate("userId", "name email")
            .sort({ score: -1 });

        const formattedResults = results.map(result => ({
            resultId: result._id,
            user: {
                id: result.userId?._id,
                name: result.userId?.name,
                email: result.userId?.email
            },
            score: result.score,
            totalQuestions: result.totalQuestions,
            percentage: Math.round(
                (result.score / result.totalQuestions) * 100
            ),
            submittedAt: result.createdAt
        }));

        res.json({
            quiz: {
                id: quiz._id,
                title: quiz.title
            },
            results: formattedResults
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    submitQuiz, getMyResults, getQuizResults
};