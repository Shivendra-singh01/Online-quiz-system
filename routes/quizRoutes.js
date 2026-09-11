const express = require("express");

const {
    createQuiz,
    addQuestion
} = require("../controllers/quizController");

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

module.exports = router;