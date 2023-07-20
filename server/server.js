const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

//connection to db
const connection = mysql.createConnection({ 
  host: 'database-final-project.cc91glolvrfr.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: '123456789',
  database: 'final_project_db',
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});

//get all the todos
app.get('/todos', (req, res) => {
  const query = 'SELECT * FROM Todos';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

//insert new todo
app.post('/todos', (req, res) => {
  const { title, completed } = req.body;
  const query = 'INSERT INTO Todos (title, completed) VALUES (?, ?)';

  connection.query(query, [title, completed], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      const newTodo = {
        id: results.insertId,
        title,
        completed,
      };
      res.json(newTodo);
    }
  });
});

//change todo 
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;
  const query = 'UPDATE Todos SET completed = ? WHERE id = ?';

  connection.query(query, [completed, id], error => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(200);
    }
  });
});

//delete todo
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM Todos WHERE id = ?';

  connection.query(query, [id], error => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(200);
    }
  });
});

//connect to the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const connection = mysql.createConnection({
//   host: 'database-final-project.cc91glolvrfr.eu-north-1.rds.amazonaws.com',
//   user: 'admin',
//   password: '123456789',
//   database: 'final_project_db',
// });

// connection.connect(error => {
//   if (error) {
//     console.error('Error connecting to the database:', error);
//   } else {
//     console.log('Connected to the database');
//   }
// });

// app.get('/todos', (req, res) => {
//   const query = 'SELECT * FROM Todos';

//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(results);
//     }
//   });
// });

// app.post('/todos', (req, res) => {
//   const { title, completed } = req.body;
//   const query = 'INSERT INTO Todos (title, completed) VALUES (?, ?)';

//   connection.query(query, [title, completed], (error, results) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).send('Internal Server Error');
//     } else {
//       const newTodo = {
//         id: results.insertId,
//         title,
//         completed,
//       };
//       res.json(newTodo);
//     }
//   });
// });

// app.delete('/todos/:id', (req, res) => {
//   const id = req.params.id;
//   const query = 'DELETE FROM Todos WHERE id = ?';

//   connection.query(query, [id], error => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });


// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const connection = mysql.createConnection({
//   host: 'database-final-project.cc91glolvrfr.eu-north-1.rds.amazonaws.com',
//   user: 'admin',
//   password: '123456789',
//   database: 'final_project_db',
// });

// connection.connect(error => {
//   if (error) {
//     console.error('Error connecting to the database:', error);
//   } else {
//     console.log('Connected to the database');
//   }
// });

// app.get('/todos', (req, res) => {
//   const query = 'SELECT * FROM Todos';

//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(results);
//     }
//   });
// });

// app.post('/todos', (req, res) => {
//   const { title, completed } = req.body;
//   const query = 'INSERT INTO Todos (title, completed) VALUES (?, ?)';

//   connection.query(query, [title, completed], (error, results) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).send('Internal Server Error');
//     } else {
//       const newTodo = {
//         id: results.insertId,
//         title,
//         completed,
//       };
//       res.json(newTodo);
//     }
//   });
// });

// app.delete('/todos/:id', (req, res) => {
//   const id = req.params.id;
//   const query = 'DELETE FROM Todos WHERE id = ?';

//   connection.query(query, [id], error => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });







// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// app.get('/todos', (req, res) => {
//   // Simulate fetching todos from a database
//   const todos = [
//     { id: 1, title: 'Buy groceries', completed: false },
//     { id: 2, title: 'Walk the dog', completed: true },
//     { id: 3, title: 'Do laundry', completed: false }
//   ];

//   res.json(todos);
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });



// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');

// const app = express();
// const port = 5000;


// // RDS connection details
// const connectionConfig = {
//     host: 'clouddatabase.cnab3yzcktut.us-east-1.rds.amazonaws.com',
//     user: 'admin',
//     password: 'Diving4398!!!',
//     database: 'clouddatabase'
//   };

// let connection;

// async function connect() {
//   try {
//     connection = await mysql.createConnection(connectionConfig);
//     console.log('Connected to the database');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// }

// connect();

// app.use(express.json());
// app.use(cors());

// // GET route to fetch todos
// app.get('/api/todos', async (req, res) => {
//   try {
//     const [rows] = await connection.execute('SELECT * FROM todos');
//     const todos = rows || []; // Handle empty result
//     res.json(todos);
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     res.status(500).json({ error: 'Error fetching todos' });
//   }
// });

// // POST route to create a new todo
// app.post('/api/todos', async (req, res) => {
//   const { id, text, completed } = req.body;
//   const query = 'INSERT INTO todos (id, text, completed) VALUES (?, ?, ?)';

//   try {
//     await connection.execute(query, [id, text, completed]);
//     res.status(201).json({ id, text, completed });
//   } catch (error) {
//     console.error('Error creating todo:', error);
//     res.status(500).json({ error: 'Error creating todo' });
//   }
// });

// // DELETE route to delete a todo
// app.delete('/api/todos/:id', async (req, res) => {
//   const id = req.params.id;
//   const query = 'DELETE FROM todos WHERE id = ?';

//   try {
//     await connection.execute(query, [id]);
//     res.sendStatus(204);
//   } catch (error) {
//     console.error('Error deleting todo:', error);
//     res.status(500).json({ error: 'Error deleting todo' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
