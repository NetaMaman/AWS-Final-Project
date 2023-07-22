import React from 'react';
import Todo from './TodoList.js';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        To-Do List
      </Typography>
      <Todo />
    </Container>
  );
}

export default App;




// import React, { useState, useEffect } from 'react';
// import { Container, List, TextField, Divider } from '@mui/material';
// import Todo from './Todo';
// import axios from 'axios';

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');

//   const handleInputChange = (event) => {
//     setNewTodo(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     if (newTodo.trim() === '') return;
//     console.log("submit todo:", newTodo);

//     try {

//      var todoToSend={
//         id: Date.now(),
//         text: newTodo,
//         completed: false,
//       };
//       console.log("try:", newTodo);

//       const response = await axios.post('/api/todos', todoToSend);
//       console.log("res:", response);


//       setTodos([...todos, response.data]);
//       setNewTodo('');
//     } catch (error) {
//       console.error('Error creating todo:', error);
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       handleFormSubmit(event);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get('/api/todos');
//       setTodos(response.data);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <h1>Todo App</h1>
//       <form onSubmit={handleFormSubmit}>
//         <TextField
//           label="Add a Todo"
//           variant="outlined"
//           fullWidth
//           value={newTodo}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//         />
//       </form>
//       <List>
//         {todos.map((todo) => (
//           <React.Fragment key={todo.id}>
//             <Todo todo={todo} />
//             <Divider />
//           </React.Fragment>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default App;
