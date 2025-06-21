import { useState } from "react";
import NewTask from "../components/NewTask";
import TodoItem from "../components/TodoItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  const addTask = async (task) => {
    true;
    setTodos((prevTodos) => [...prevTodos, task]);
    await delay();
    false;
    toast.success("Successfully Added", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
      theme: "colored",
    });
  };

  const deleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== id));
    toast.success("Successfully Deleted", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
      theme: "colored",
    });
  };

  const updateTask = (task, id) => {
    setTodos((prevTodos) => prevTodos.map((t, i) => (i === id ? task : t)));
    toast.success("Successfully Updated", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
      theme: "colored",
    });
  };

  return (
    <>
      <NewTask addTask={addTask} />
      {loading ? (
        <Spinner />
      ) : (
        todos.length > 0 && (
          <ul className="bg-gray-200 rounded-md shawdow-sm p-4">
            {todos.map((todo, i) => (
              <TodoItem
                key={i}
                id={i}
                todo={todo}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default HomePage;
