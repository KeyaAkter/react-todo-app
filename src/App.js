import { createContext, useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

// Creating Delete Context
export const DeleteHandlerContext = createContext();

const App = () => {
  // Declaring state to set multiple task
  const [tasks, setTasks] = useState([]);

  // Creating a side effect to automatically retrieve data from the server

  useEffect(() => {
    // Getting data from the server
    receivingData();
  }, []);

  // Function for receiving data from the server
  const receivingData = async () => {
    try {
      const res = await fetch(
        "https://hallowed-ambitious-mouth.glitch.me/tasks"
      );

      if (!res.ok) throw new Error("Something Went Wrong!");

      const data = await res.json();

      setTasks(data); // Storing data into tasks
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete Event
  const deleteHandler = (id) => {
    // delete data using id
    deleteData(id);

    // set updated tasks
    setTasks(tasks.filter((task) => id !== task.id));
  };

  // Sending Delete Request
  const deleteData = async (id) => {
    await fetch(`https://hallowed-ambitious-mouth.glitch.me/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  return (
    <div className="wrapper bg-gradient-to-t from-blue-700 to-blue-300 min-h-screen text-xl text-gray-900 flex flex-col py-10">
      <DeleteHandlerContext.Provider value={deleteHandler}>
        <Header />
        <AddTask tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} />
        <Footer />
      </DeleteHandlerContext.Provider>
    </div>
  );
};

export default App;
