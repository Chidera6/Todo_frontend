import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function UpdateTodos({ user }) {
  const { todoId } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const token = localStorage.getItem('token'); 
  
  const fetchTodos = async () => {
    try {
      const response = await fetch(`https://todobackend-ew9a.onrender.com/${todoId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setCompleted(data.completed);
      } else {
        throw new Error('Failed to fetch todo');
      }
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
    console.log("use effect is prinitng");
  }, [user]);

  const updateTodo = async () => {
    try {
      const response = await fetch(`https://todobackend-ew9a.onrender.com/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, completed }),
      });
      if (response.ok) {
        console.log('Todo updated successfully');
      } else {
        throw new Error('Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo();
    history.push('/todos'); 
  };

  const handleCheckboxChange = (e) => {
    setCompleted(e.target.checked);
  };

  return (
    <div className='todos'>
      <h1>Update Todo</h1>
        <form className='input-form'  onSubmit={handleSubmit}>
          <div className='input-todos'>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='input-todos'>
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='input-todos'>
            <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
            />
          </div>
          <button className='submit-button' type="submit">Update</button>
        </form>
    </div>
  );
}

export default UpdateTodos;
