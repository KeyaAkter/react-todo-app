import { createContext, useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

// Creating Delete Handler Context
export const DeleteHandlerContext = createContext();

// Creating Edit Handler Context
export const EditHandlerContext = createContext();

const App = () => {
  // Declaring state to set multiple task
  const [tasks, setTasks] = useState([]);

  // Declaring state for loading data
  const [loading, setLoading] = useState(true);

  // Declaring state for error data
  const [error, setError] = useState("");

  // Declaring state for editing data
  const [editedText, setEditedText] = useState("");

  // Declaring state for toggle button
  const [toggleEditMode, setToggleEditMode] = useState(true);

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
      setLoading(false); // After getting data loading will become false
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete Event
  const deleteHandler = (id) => {
    // delete data using specific task id
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

  // Editing Event

  const editHandler = (id) => {
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = true; // Adding isEditable property to the task which we want to edit and setting its value to true
    setEditedText(editableTarget.text); // Giving existing text to the func so that we can edit the existing text

    setTasks([...tasks]); // Spreading existing tasks to set isEditable property to the specific task

    // Re-arrange

    setToggleEditMode(false); // Toggle mode should be false when editing is finished.

    tasks
      .filter((task) => task.id !== id)
      .map((targettedEl) => (targettedEl.isEditable = false)); //Changing the isEditable property's value to false for any remaining tasks that we don't want to be editable
  };

  // Implementing editable task form handler
  const editHandleSubmitter = (e, id) => {
    e.preventDefault();

    setToggleEditMode(!toggleEditMode);

    // Persist data -- edited text(new)
    const editPersistance = {
      text: editedText,
      id: id,
    };

    // Put request
    puttingRequest(id, editPersistance);

    // Update Edited text in real time
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = false; // Once the updated text has been uploaded to the server, isEditable property needs to be set to false.
    editableTarget.text = editPersistance.text; // Updating the target with the new(edited) text

    setTasks([...tasks]); // Updating the array after setting a new value
  };

  // Sending put request to the server
  const puttingRequest = async (id, newData) => {
    fetch(`https://hallowed-ambitious-mouth.glitch.me/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  };

  return (
    <div className="wrapper bg-gradient-to-t from-blue-700 to-blue-300 min-h-screen text-xl text-gray-900 flex flex-col py-10">
      <DeleteHandlerContext.Provider value={deleteHandler}>
        <EditHandlerContext.Provider value={editHandler}>
          <Header />
          <AddTask tasks={tasks} setTasks={setTasks} />
          <TaskList
            tasks={tasks}
            error={error}
            loading={loading}
            editHandleSubmitter={editHandleSubmitter}
            editedText={editedText}
            setEditedText={setEditedText}
          />
          <Footer />
        </EditHandlerContext.Provider>
      </DeleteHandlerContext.Provider>
    </div>
  );
};

export default App;
