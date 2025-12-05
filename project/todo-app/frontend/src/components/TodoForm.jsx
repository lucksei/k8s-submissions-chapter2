import { useState } from "react";

const TodoForm = ({ onSubmit }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.length >= 140) {
      alert("Todo is too long. Max length is 140 characters.");
      return;
    }
    await onSubmit(todo);
    setTodo("");
  };

  return (
    <div className="flex flex-col w-full">
      <form
        className="flex flex-row justify-around items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full my-2 me-2 grow"
          type="text"
          name="todo"
          id="todo-input-text"
          placeholder="Add a todo"
          required
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="my-2" type="submit" id="todo-add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
