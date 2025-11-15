const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const { sequelize, connectToDatabase } = require('./utils/db');
const { Todo } = require('./utils/models');


connectToDatabase();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  return res.status(200).send('Hello from the backend!');
})


app.get('/api/todos', async (req, res) => {
  const todoList = await Todo.findAll();
  console.log(todoList);
  return res.status(200).send(todoList);
});


app.post('/api/todos', async (req, res) => {
  try {
    const todo = await Todo.create(req.body)
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
})


app.listen(config.port, () => {
  console.log(`Backend listening on port ${config.port}`)
})