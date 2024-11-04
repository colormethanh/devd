import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-black border border-white p-4 mr-1">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">MyApp</div>
        <div className="md:flex space-x-4">
          <a href="#home" className="text-white">
            Home
          </a>
          <a href="#about" className="text-white">
            About
          </a>
          <a href="#services" className="text-white">
            Services
          </a>
          <a href="#contact" className="text-white">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
