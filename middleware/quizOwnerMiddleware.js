const Quiz = require("../models/Quiz");

const quizOwnerMiddleware = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        if (quiz.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not the owner of this quiz"
            });
        }

        req.quiz = quiz;

        next();

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = quizOwnerMiddleware;