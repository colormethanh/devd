import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-white p-4 mr-1">
      <div className="container mx-auto flex items-center justify-center">
        <div className="text-white flex justify-center flex-col text-2xl font-bold">
          <div className="text-center">Devd</div>

          <div className="md:flex text-xs">
            <a
              href="#home"
              className="text-white mx-3 hover:underline underline-offset-4"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white mx-3 hover:underline underline-offset-4"
            >
              About
            </a>
            <a
              href="#services"
              className="text-white mx-3 hover:underline underline-offset-4"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-white mx-3 hover:underline underline-offset-4"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
