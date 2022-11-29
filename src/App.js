import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="wrapper bg-gradient-to-t from-blue-600 to-white min-h-screen text-xl text-gray-900 flex flex-col py-10">
      <Header />
      <AddTask />
      <Footer />
    </div>
  );
};

export default App;
