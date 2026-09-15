const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");


dotenv.config();

const app = express();

app.use(express.json());


connectDB();

app.use("/auth", authRoutes);
app.use("/quizzes", quizRoutes);
app.use("/results", resultRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "Online Quiz System API"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});