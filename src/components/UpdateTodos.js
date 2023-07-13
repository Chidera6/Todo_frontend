import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
function UpdateTodos({ user }) {
  const { todoId } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${todoId}`, {
        headers: {
          'user-id': user.id,
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
  
  const updateTodo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user.id,
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
    history.push('/');
    updateTodo();
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
            onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>
          <button className='submit-button' type="submit">Update</button>
        </form>
    </div>
  );
}

export default UpdateTodos;
