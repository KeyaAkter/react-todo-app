import TaskItem from "./TaskItem";

const TaskList = ({ tasks, error, loading }) => {
  return (
    <div className="flex flex-col gap-3 bg-blue-500 container mx-auto p-10">
      {/* Implementing Loading */}
      {loading ? (
        <p className="text-center">{error ? error : "Loading..."}</p>
      ) : (
        tasks.length === 0 && (
          <p className="text-center">No task is available!</p>
        )
      )}

      {/* exporting individual task to the task item */}
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TaskList;
