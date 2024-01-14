const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Todo = require("../models/Todo");

// Router 1 : Fetch all todos for a user using GET "/api/todos/fetchalltodos" | Login Required
router.get("/fetchalltodos", fetchUser, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Router 2 : Save todos for a user using POST "/api/todos/saveTodos" | Login Required
router.post(
  "/savetodos",
  fetchUser,
  [
    body("task", "Task can not be less then 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description can not be less then 3 characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { task, description, status } = req.body;
    const todo = new Todo({
      task,
      description,
      status,
      userId: req.user.id,
    });
    try {
      const savedTodo = await todo.save();
      res.status(200).json(savedTodo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Router 3 : update todo for a user using PUT "/api/todos/updateTodo" | Login Required
router.put("/updatetodo/:id", fetchUser, async (req, res) => {
  const { task, description, status } = req.body;
  const newTodo = {};

  if (task) {
    newTodo.task = task;
  }
  if (description) {
    newTodo.description = description;
  }
  if (status) {
    newTodo.status = status;
  }

  // Find the todo to update and update it.

  // Verify for the user i.e. the user updating the todo and todos user are same.
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not Found");
    }
    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Find and update the note
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { new: true }
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Router 4 : Delete todo for a user using DELETE "/api/todos/deletetodo" | Login Required
router.delete("/deletetodo/:id", fetchUser, async (req, res) => {
  // Find the todo to delete and delete it.

  // Verify for the user i.e. the user deleting the todo and todos user are same.
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not Found");
    }
    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Find and Delete the todo
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({ Success: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
