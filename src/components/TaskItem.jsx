import { useContext } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { DeleteHandlerContext } from "../App";

const TaskItem = ({ task }) => {
  // Using Delete Context
  const handleDelete = useContext(DeleteHandlerContext);

  return (
    <div className="task-item flex justify-between items-center bg-blue-700 p-5 rounded hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 tracking-wider group">
      <div className="task-item-left flex gap-3">
        <span>
          <input type="checkbox" />
        </span>
        <p className="group-hover:text-gray-100">{task.text}</p>
      </div>
      <div className="task-item-right flex gap-3">
        <span>
          <FiEdit className="text-gray-800 hover:text-gray-200 cursor-pointer duration-300 " />
        </span>
        <button onClick={() => handleDelete(task.id)}>
          <FiTrash className="text-gray-800 hover:text-red-600 cursor-pointer duration-300" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
