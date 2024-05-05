import axios from 'axios';

const API_URL = 'https://todo-list-mern-three.vercel.app/todos'; // Changed port to 8001

export const getAllTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async ({ todoname, description, todotime }) => {
  try {
    console.log("datarecived",todoname, description, todotime );
    const response = await axios.post(`${API_URL}/create`, { todoname, description, todotime }); // Changed endpoint to '/create'
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async ({ _id, description }) => {
  try {
    const response = await axios.put(`${API_URL}/update`, { _id, description }); // Changed endpoint to '/update'
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (_id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete`, { data: { _id } }); // Changed endpoint to '/delete'
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
