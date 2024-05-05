const TodoModel = require("../models/TodoModel");

exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  const { todoname,description,todotime} = req.body;
  try {
    console.log( todoname,description,todotime);
    const todo = await TodoModel.create({ todoname,description,todotime });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { _id, description } = req.body;
  try {
    const todo = await TodoModel.findByIdAndUpdate(_id, { description }, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  const { _id } = req.body;
  try {
    const todo = await TodoModel.findByIdAndDelete(_id);
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
