import { HiDocument } from "react-icons/hi";
const Header = () => {
  return (
    <header className="header bg-blue-500 p-10 container mx-auto border-b border-dashed border-gray-100 rounded-tl-lg rounded-tr-lg ">
      <h2 className="uppercase font-semibold text-gray-100 tracking-wider flex gap-2 items-center ">
        <span>
          <HiDocument />
        </span>
        <span>React Todo App</span>
      </h2>
    </header>
  );
};

export default Header;
