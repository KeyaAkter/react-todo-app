import { useRef, useState } from "react";

const AddTask = ({ tasks, setTasks }) => {
  // State Declaration
  const [task, setTask] = useState(""); // returns an array

  // Creating input reference variable
  const inputRef = useRef(null); // returns an object

  // Handling Add Task Event
  const addTaskHandler = (e) => {
    e.preventDefault();

    // Post Task Into Server
    taskPosting(task);

    inputRef.current.blur();
    setTask("");
  };

  // Creating a function for posting task to the server
  const taskPosting = async (text) => {
    const res = await fetch(
      "https://hallowed-ambitious-mouth.glitch.me/tasks",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await res.json(); // taking data from server

    // Realtime data updation
    setTasks([...tasks, data]);
  };

  return (
    <form
      className="bg-blue-500 container mx-auto flex justify-between p-10 "
      onSubmit={addTaskHandler}
    >
      <input
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
        type="text"
        placeholder="What needs to be done?"
        className="bg-transparent outline-none border-b-2 py-2 px-5 placeholder-gray-700 border-gray-700 focus:border-blue-700"
      />
      <button
        type="submit"
        className="bg-blue-700/40 py-2 px-5 border-2 border-blue-700 rounded tracking-wider hover:bg-blue-700 hover:text-gray-200 duration-300"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
