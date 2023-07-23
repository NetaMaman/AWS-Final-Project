const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

//connection to db
const connection = mysql.createConnection({
  host: 'final-project-aws.cc91glolvrfr.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: '123456789',
  database: 'final_project_database_aws',
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
