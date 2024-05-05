import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { createTodo, updateTodo, deleteTodo, getAllTodos } from "../apis/todo";
import '../css/Home.css';

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todosData = await getAllTodos();
      setTodos(todosData);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const todotime = new Date().toISOString();
      await createTodo({ todoname: newTodoName, description: newTodoDescription, todotime });
      setNewTodoName('');
      setNewTodoDescription('');
      setShowAddModal(false);
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleEditStart = (todoId, currentDescription) => {
    setShowEditModal(true);
    setEditingTodoId(todoId);
    setEditedDescription(currentDescription);
    setShowAddModal(false); // Close add modal if open
  };

  const handleEditConfirm = async () => {
    try {
      await updateTodo({ _id: editingTodoId, description: editedDescription });
      fetchTodos();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(todoId);
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = todos.filter(todo =>
    todo.todoname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search todos by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="add-button">
        <button  className="addingtodo" onClick={() => setShowAddModal(true)}><FontAwesomeIcon icon={faPlus} /></button>
      </div>
      {showAddModal && (
        <div className="modal">
          <div className="modal-header">
            <h2>Add Todo</h2>
            <button onClick={() => setShowAddModal(false)}><FontAwesomeIcon icon={faTimes} /></button>
          </div>
          <input
            type="text"
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
            placeholder="Enter todo name"
          />
          <input
            type="text"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            placeholder="Enter todo description"
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
      )}
      {showEditModal && (
        <div className="modal">
          <div className="modal-header">
            <h2>Edit Todo</h2>
            <button onClick={() => setShowEditModal(false)}><FontAwesomeIcon icon={faTimes} /></button>
          </div>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Enter new description"
          />
          <button onClick={handleEditConfirm}>Update Description</button>
        </div>
      )}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo._id} className="todo-item">
            <div className="todo-details">
              <h3>{todo.todoname}</h3>
              <p className="description">{todo.description}</p>
              <p className="date">{todo.todotime}</p>
            </div>
            <div className="actions">
              <button className="edit-button" onClick={() => handleEditStart(todo._id, todo.description)}><FontAwesomeIcon icon={faEdit} /></button>
              <button className="delete-button" onClick={() => handleDelete(todo._id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;