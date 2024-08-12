const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(bodyParse.json());

mongoose
    .connect("mongodb://localhost:27017/taskmanager")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api", taskRoutes);

module.exports = app;
