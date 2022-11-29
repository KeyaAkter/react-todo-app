import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-400 container mx-auto text-center p-10 text-sm text-gray-100 border-t border-dashed border-gray-100">
      <p>
        &copy; {new Date().getFullYear()} React Todo App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
