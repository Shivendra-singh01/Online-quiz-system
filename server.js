const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Online Quiz System API"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});