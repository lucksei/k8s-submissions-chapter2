const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // No idea if this is needed and why, got vibecoded in the process sry... :(

// Saved in memory
const todosList = ['Learn JavaScript', 'Learn React', 'Build a project'];

app.get('/', (req, res) => {
  return res.status(200).send('Hello from the backend!');
})

app.get('/api/todos', (req, res) => {
  return res.status(200).send(todosList);
});

app.post('/api/todos', (req, res) => {
  const todo = req.body.todo;
  if (!todo) {
    return res.status(400).send('Missing todo');
  }
  todosList.push(todo);
  return res.status(201).send(todo);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`)
})