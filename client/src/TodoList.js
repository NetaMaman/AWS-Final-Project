import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; // Import the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data);
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
        const response = await axios.post('http://localhost:3001/todos', todo);
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
        axios.put(`http://localhost:3001/todos/${id}`, updatedTodo)
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
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span>{todo.title}</span>
            <span>{todo.completed ? 'Completed' : 'Incomplete'}</span>
            <button className="delete-button" onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Checkbox,
//   IconButton,
//   TextField,
//   InputAdornment,
// } from '@mui/material';
// import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/todos');
//       setTodos(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAddTodo = async () => {
//     if (newTodo.trim() !== '') {
//       const todo = {
//         title: newTodo,
//         completed: false,
//       };

//       try {
//         const response = await axios.post('http://localhost:3001/todos', todo);
//         const newTodoWithId = { ...response.data, id: response.data.insertId };
//         setTodos(prevTodos => [...prevTodos, newTodoWithId]);
//         setNewTodo('');
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const handleToggleComplete = async (id) => {
//     const updatedTodos = todos.map(todo => {
//       if (todo.id === id) {
//         const updatedTodo = {
//           ...todo,
//           completed: !todo.completed,
//         };
//         axios.put(`http://localhost:3001/todos/${id}`, updatedTodo)
//           .catch(error => {
//             console.log(error);
//           });
//         return updatedTodo;
//       }
//       return todo;
//     });

//     setTodos(updatedTodos);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/todos/${id}`);
//       setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <input
//           type="text"
//           placeholder="Add a to-do"
//           value={newTodo}
//           onChange={(event) => setNewTodo(event.target.value)}
//           style={{ width: "100%" }}
//         />
//         <ul>
//           {todos.map((todo, index) => (
//             <li key={index}>
//               <input
//                 type="checkbox"
//                 checked={todo.completed}
//                 onChange={() => handleToggleComplete(todo.id)}
//               />
//               <span>{todo.title}</span>
//               <span>{todo.completed ? "Completed" : "Incomplete"}</span>
//               <button onClick={() => handleDelete(todo.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>

//       <TextField
//         label="Add a to-do"
//         value={newTodo}
//         onChange={event => setNewTodo(event.target.value)}
//         fullWidth
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={handleAddTodo}>
//                 <AddIcon />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <List>
//         {todos.map((todo, index)=> (
//           // <ListItem key={todo.id}>
//             <ListItem key={index}>
//             <Checkbox
//               checked={todo.completed}
//               onChange={() => handleToggleComplete(todo.id)}
//             />
//             <ListItemText
//               primary={todo.title}
//               secondary={todo.completed ? 'Completed' : 'Incomplete'}
//             />
//             <IconButton onClick={() => handleDelete(todo.id)}>
//               <DeleteIcon />
//             </IconButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default TodoList;

