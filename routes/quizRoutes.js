const express = require("express");

const {
    createQuiz,
    addQuestion,
    getQuizzes, 
    getQuestionsByQuiz
} = require("../controllers/quizController");

const { submitQuiz } = require("../controllers/resultController");


const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createQuiz
);

router.post(
    "/:quizId/questions",
    authMiddleware,
    adminMiddleware,
    addQuestion
);

router.post(
    "/:quizId/submit",
    authMiddleware,
    submitQuiz
);

router.get(
    "/",
    authMiddleware,
    getQuizzes
);
router.get(
    "/:quizId/questions",
    authMiddleware,
    getQuestionsByQuiz
);

module.exports = router;