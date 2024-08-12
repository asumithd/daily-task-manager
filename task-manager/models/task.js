const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    dueDate: { type: Date, required: true },
    reminder: { type: Date, required: true },
    category: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const task = mongoose.model("Task", taskSchema);
module.exports = task;
