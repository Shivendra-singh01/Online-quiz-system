const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Online Quiz System API"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});