import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

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
    <div>
      <TextField
        label="Add a to-do"
        value={newTodo}
        onChange={event => setNewTodo(event.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleAddTodo}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <List>
        {todos.map((todo, index)=> (
          // <ListItem key={todo.id}>
            <ListItem key={index}>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <ListItemText
              primary={todo.title}
              secondary={todo.completed ? 'Completed' : 'Incomplete'}
            />
            <IconButton onClick={() => handleDelete(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
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
//         {todos.map(todo => (
//           <ListItem key={todo.id}>
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



// import React, { useEffect, useState } from 'react';
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
//     axios
//       .get('http://localhost:3001/todos')
//       .then(response => {
//         setTodos(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   const handleAddTodo = () => {
//     if (newTodo.trim() !== '') {
//       const todo = {
//         id: todos.length + 1,
//         title: newTodo,
//         completed: false,
//       };

//       setTodos(prevTodos => [...prevTodos, todo]);
//       setNewTodo('');

//       // You can make a POST request to your server endpoint to save the new todo
//     }
//   };

//   const handleToggleComplete = id => {
//     const updatedTodos = todos.map(todo => {
//       if (todo.id === id) {
//         return {
//           ...todo,
//           completed: !todo.completed,
//         };
//       }
//       return todo;
//     });

//     setTodos(updatedTodos);

//     // You can make a PUT request to your server endpoint to update the todo's completion status
//   };

//   const handleDelete = id => {
//     setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
//   };

//   return (
//     <div>
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
//         {todos.map(todo => (
//           <ListItem key={todo.id}>
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





// import React from 'react';
// import { Checkbox, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// const Todo = ({ todo, toggleTodo, deleteTodo }) => {
//   const handleToggle = () => {
//     toggleTodo(todo.id);
//   };

//   const handleDelete = () => {
//     deleteTodo(todo.id);
//   };

//   return (
//     <ListItem button onClick={handleToggle}>
//       <ListItemIcon>
//         <Checkbox checked={todo.completed} />
//       </ListItemIcon>
//       <ListItemText primary={todo.text} />
//       <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
//         <DeleteIcon />
//       </IconButton>
//     </ListItem>
//   );
// };

// export default Todo;