const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todoname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  todotime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
