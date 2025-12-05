const TodoList = ({ todoList, onMarkAsDone }) => {
  const handleMarkAsDone = (todoId) => {
    onMarkAsDone(todoId);
  };

  return (
    <div>
      <h2>Todo</h2>
      <ul className="flex flex-col w-full my-3">
        {todoList
          .filter((todoObject) => !todoObject.done)
          .map((todoObject) => (
            <li
              className="flex flex-row justify-between align-baseline relative pt-2 pb-2 px-2 cursor-pointer hover:bg-gray-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gray-300 after:content-['']"
              key={todoObject.id}
            >
              <span>{todoObject.todo}</span>
              <button onClick={() => handleMarkAsDone(todoObject.id)}>
                Mark as done
              </button>
            </li>
          ))}
      </ul>
      <h2>Done</h2>
      <ul className="flex flex-col w-full my-3">
        {todoList
          .filter((todoObject) => todoObject.done)
          .map((todoObject) => (
            <li
              className="flex flex-row justify-between align-baseline relative pt-2 pb-2 px-2 cursor-pointer hover:bg-gray-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gray-300 after:content-['']"
              key={todoObject.id}
            >
              <span>{todoObject.todo}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
