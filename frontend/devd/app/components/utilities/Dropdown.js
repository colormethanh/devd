import React, { useState } from "react";
import DropdownItem from "./DropdownItem";
import useOutsideClick from "@/app/hooks/useOutsideClick";

// Dropdown items should be  [{text: "", callback: () => {}}, ...]
export default function Dropdown({
  toggleText,
  items,
  addStyle,
  offset = "right",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const dropdownClickRef = useOutsideClick(() => closeDropdown());

  return (
    <div
      ref={dropdownClickRef}
      className="relative inline-block text-left border border-black hover:border-white"
    >
      <div>
        <button
          onClick={toggleDropdown}
          className={`inline-flex justify-between w-full text-white focus:outline-none focus:ring-0 ${addStyle}`}
        >
          {toggleText}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            offset === "right" ? "left-0" : "right-0"
          }  z-10 mt-2 w-56 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
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
