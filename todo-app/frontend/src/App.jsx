import Footer from './components/Footer';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const todoList = ['Learn JavaScript', 'Learn React', 'Build a project'];

const App = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col max-w-300 mx-10 mt-5">
          <h1>The Project</h1>
          <img
            className="shadow-md rounded-md"
            src="hourly.jpg"
            alt="hourly img"
          />
          <TodoForm />
          <TodoList todoList={todoList} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
