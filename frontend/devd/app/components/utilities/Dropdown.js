import React, { useState } from "react";
import DropdownItem from "./DropdownItem";

export default function Dropdown({ toggleText, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full border border-black hover:border-white px-4 py-2 bg-black text-xs  text-white focus:outline-none focus:ring-0"
        >
          {toggleText}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {items.map((item, i) => (
              <DropdownItem
                clickCallback={() => {
                  item.callback();
                  closeDropdown();
                }}
                key={`taskUtilityItem-${i}`}
              >
                {" "}
                {item.text}{" "}
              </DropdownItem>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
