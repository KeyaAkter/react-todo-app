const AddTask = () => {
  return (
    <form className="bg-blue-500 container mx-auto flex justify-between p-10">
      <input
        type="text"
        placeholder="What needs to be done?"
        className="bg-transparent outline-none border-b-2 py-2 px-5 placeholder-gray-700 border-gray-700 focus:border-blue-700"
      />
      <button
        type="submit"
        className="bg-blue-600/30 py-2 px-5 border-2 border-blue-700 rounded tracking-wider hover:bg-blue-700 hover:text-gray-200 duration-300"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
