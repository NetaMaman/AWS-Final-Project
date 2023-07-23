import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';
import image from './image/image.png'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todos');
      if (response){
        setTodos(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      const todo = {
        title: newTodo,
        completed: false,
      };

      try {
        const response = await axios.post('/todos', todo);
        const newTodoWithId = { ...response.data, id: response.data.insertId };
        setTodos(prevTodos => [...prevTodos, newTodoWithId]);
        setNewTodo('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggleComplete = async (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = {
          ...todo,
          completed: !todo.completed,
        };
        axios.put(`/todos/${id}`, updatedTodo)
          .catch(error => {
            console.log(error);
          });
        return updatedTodo;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <> 
    <img className="image" src={image} alt="be productive" width="1325" height="400" />

    <div className='body-list'>

      {/* <div className="header">
        Todo List
      </div> */}
    <div className="todo-list-container">
      <input
        className="todo-input"
        type="text"
        placeholder="Add a to-do"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
      />
      <button className="add-button" onClick={handleAddTodo}>
        Add
      </button>
      <ul>
        {todos? ( 
          todos.map((todo, index) => {return(
          <li key={index} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span className='todo-title'>{todo.title}</span>
            {/* <span>{todo.completed ? 'Completed' : 'Incomplete'}</span> */}
            <button className="delete-button" onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        )})) : ""}
       
      </ul>
    </div>
    </div>
    </>
  );
};

export default TodoList;

