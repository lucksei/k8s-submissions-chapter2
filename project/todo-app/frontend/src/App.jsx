import { useState, useEffect } from "react";
import config from "./utils/config";
import Footer from "./components/Footer";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import todosService from "./services/todos";

const App = () => {
  const [healthy, setHealthy] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todosService.getTodos();
      console.log(todos);
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const healthCheck = async () => {
      const healthy = await todosService.healthCheck();
      setHealthy(healthy);
    };

    healthCheck();
  }, []);

  const handleSubmit = async (todo) => {
    const newTodo = await todosService.createTodo({ todo: todo });
    setTodos(todos.concat(newTodo));
  };

  const handleMarkAsDone = async (todoId) => {
    const updatedTodo = await todosService.updateTodo(todoId, true);
    setTodos(todos.map((todo) => (todo.id === todoId ? updatedTodo : todo)));
  };

  if (!healthy) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center pb-20 text-gray-800">
        <div className="flex flex-col max-w-300 w-full px-3 mt-5 ">
          <h1>The Project</h1>
          <img
            className="shadow-md rounded-md"
            src={config.hourlyImageUrl}
            alt="hourly img"
          />
          <TodoForm onSubmit={handleSubmit} />
          <TodoList todoList={todos} onMarkAsDone={handleMarkAsDone} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
