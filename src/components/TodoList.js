import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TodoList.css';

function TodoList({ user }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const token = localStorage.getItem('token'); 

  const addTodo = async (title, description, completed) => {
    try {
      const response = await fetch('https://todobackend-ew9a.onrender.com/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, completed, userId: user.id })
      });
      if (response.ok) {
        setTitle('');
        setDescription('');
        setCompleted(false);
        fetchTodos();
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title, description, completed);
  };

  const handleCheckboxChange = (e) => {
    setCompleted(e.target.checked);
  };

  useEffect(() => {
    fetchTodos();
    console.log("use effect is printing")
  },[]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://todobackend-ew9a.onrender.com/api/tasks/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        throw new Error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`https://todobackend-ew9a.onrender.com/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchTodos();
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="todos">
      <h1>My Todo List</h1>
      <form className="input-form" onSubmit={handleSubmit}>
        <div className='input-todos'>
          <input 
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />
        </div>
        <div className='input-todos'>
          <input
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
            type="text"
          />
        </div>
        <div className='input-todos'>
          <input
            id="completed"
            onChange={handleCheckboxChange}
            checked={completed}
            type="checkbox"
          />
        </div>
        <button className="submit-button" type="submit">
          Add
        </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <input type="checkbox" checked={todo.completed} readOnly className='todo'/>
          <h3 className='todo'>{todo.title}<p>{todo.description}</p><p>Created on:{todo.createdAt}</p></h3>
          <div className='todo-buttons'>
            <div className='todo'>
              <Link to={`/update-todo/${todo.id}`}>
                <button className="update-button">Update</button>
              </Link>
            </div>
            <div>
              <button className="delete-button" onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
