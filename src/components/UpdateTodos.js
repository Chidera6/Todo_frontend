import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { csrfFetch } from '../csrf';

function UpdateTodos({ user }) {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

 // useEffect(() => {
 //   fetchTodo();
 // }, []);

  const fetchTodo = async () => {
    try {
      const response = await csrfFetch(`api/tasks/${id}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
      const response = await csrfFetch(`api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, completed }),
      });
      if (response.ok) {
        history.push('/');
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
  };

  const handleCheckboxChange = () => {
    setCompleted((prevCompleted) => !prevCompleted);
  };

  return (
    <div className="update-todos">
      <h2>Update Todos</h2>
      <form onSubmit={handleSubmit} className="input-form">
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
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateTodos;
