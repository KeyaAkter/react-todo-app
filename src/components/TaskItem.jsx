import { useContext } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { DeleteHandlerContext, EditHandlerContext } from "../App";

const TaskItem = ({ task, editHandleSubmitter, editedText, setEditedText }) => {
  // Using Delete Context
  const handleDelete = useContext(DeleteHandlerContext);

  // Using Edit Context
  const handleEdit = useContext(EditHandlerContext);

  return (
    <div className="task-item flex justify-between items-center bg-blue-700 p-5 rounded hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 tracking-wider group">
      <div className="task-item-left flex gap-3">
        <span>
          <input type="checkbox" />
        </span>

        {task.isEditable && (
          <form onSubmit={(e) => editHandleSubmitter(e, task.id)}>
            <input
              className="bg-transparent outline-none border-b-2 border-gray-800 pb-1 focus:border-gray-300"
              type="text"
              required
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </form>
        )}

        {!task.isEditable && (
          <p className="group-hover:text-gray-100">{task.text}</p>
        )}
      </div>

      <div className="task-item-right flex gap-3">
        <button onClick={() => handleEdit(task.id)}>
          <FiEdit className="text-gray-800 hover:text-gray-200 cursor-pointer duration-300 " />
        </button>

        <button onClick={() => handleDelete(task.id)}>
          <FiTrash className="text-gray-800 hover:text-red-600 cursor-pointer duration-300" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
