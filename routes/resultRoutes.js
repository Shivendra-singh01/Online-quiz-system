const express = require("express");

const {
    getMyResults,
    getQuizResults,
} = require("../controllers/resultController");


const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
    "/my",
    authMiddleware,
    getMyResults,
);

router.get(
    "/quiz/:quizId",
    authMiddleware,
    adminMiddleware,
    getQuizResults
);

module.exports = router;