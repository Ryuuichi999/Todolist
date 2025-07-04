import { useState, useEffect } from "react";
import NewTask from "../components/NewTask";
import TodoItem from "../components/TodoItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const HomePage = () => {
  // โหลด todos จาก localStorage หรือใช้ array ว่างเป็นค่าเริ่มต้น
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [loading, setLoading] = useState(false);

  // บันทึก todos ลง localStorage เมื่อ todos เปลี่ยน
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  const addTask = async (task) => {
    setLoading(true); // เริ่ม loading
    setTodos((prevTodos) => [...prevTodos, task]);
    await delay();
    setLoading(false); // หยุด loading
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
        todos.length > 0 ? (
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
        ) : (
          <p className="text-gray-400 text-center mt-4">No tasks yet.</p>
        )
      )}
    </>
  );
};

export default HomePage;