const express = require("express");
const Task = require("../models/task");
const router = express.Router();

router.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.put("/tasks/:id", async (req, res) => {
    try {
        const updateObject = req.body;

        const task = await Task.findByIdAndUpdate(req.params.id, updateObject);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (err) {
        res.status(500).send(err);
    }
});
router.get("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (err) {
        res.status(500).send(err);
    }
});
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});
router.delete("/tasks/:id", async (req, res) => {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
});

module.exports = router;
