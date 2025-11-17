const TodoList = ({ todoList }) => {
  return (
    <ul className="flex flex-col w-full my-3">
      {todoList.map((todoObject) => (
        <li
          className="relative align-baseline inline-block pt-1 pb-2 px-2 cursor-pointer hover:bg-gray-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gray-400 after:content-['']"
          key={todoObject.id}
        >
          {todoObject.todo}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
