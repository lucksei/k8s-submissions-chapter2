const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // No idea if this is needed and why, got vibecoded in the process sry... :(

// Saved in memory
const todosList = ['Learn JavaScript', 'Learn React', 'Build a project'];

app.get('/', (req, res) => {
  return res.status(200).send('Hello from the backend!');
})

app.get('/todos', (req, res) => {
  return res.status(200).send({ todos: todosList });
});

app.post('/todos', (req, res) => {
  const todo = req.body.todo;
  todosList.push(todo);
  return res.status(201).send({ todos: todosList });
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`)
})