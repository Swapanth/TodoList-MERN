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
  const { text } = req.body;
  TodoModel.Todo.create({ text })
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    TodoModel
        .Todo
        .findByIdAndUpdate(id, { text   }, { new: true })   // { new: true } returns the updated document
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
}

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    TodoModel
        .Todo
        .findByIdAndDelete(id)
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
}
