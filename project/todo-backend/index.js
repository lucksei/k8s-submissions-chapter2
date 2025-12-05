const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./utils/config");
const { sequelize, connectToDatabase } = require("./utils/db");
const { Todo } = require("./utils/models");

// Connect to the database
connectToDatabase();

// Create express app & use middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", (req, res) => res.status(200).send("Todo Backend is running"));

app.get("/healthz", (req, res) => res.status(200).send("Healthy"));

app.get("/readyz", (req, res) => res.status(200).send("OK"));

app.get("/api", (req, res) => res.status(200).send("Hello from the backend!"));

app.get("/api/todos", async (req, res) => {
  doneParam = req.query.done;
  let query = {};
  if (doneParam) {
    const done = doneParam === "true";
    query = { where: { done } };
  }
  const todoList = await Todo.findAll(query);
  return res.status(200).send(todoList);
});

app.post("/api/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

const todoExtractor = async (req, res, next) => {
  req.todo = await Todo.findByPk(req.params.id);
  if (!req.todo) {
    throw new Error("Todo not found");
  }
  next();
};

app.put("/api/todos/:id", todoExtractor, async (req, res) => {
  try {
    await req.todo.update(req.body);
    return res.status(200).send(req.todo);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.listen(config.port, () => {
  console.log(`Backend listening on port ${config.port}`);
});
