const express = require('express');
const {getTodos, createTodo, updateTodo, deleteTodo} = require('../controllers/TodoController');

const router = express();

router.get('/', getTodos);
router.post('/create', createTodo);
router.put('/update', updateTodo);
router.delete('/delete', deleteTodo);

module.exports = router;    