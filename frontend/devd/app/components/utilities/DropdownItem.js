import React from "react";

export default function DropdownItem({ clickCallback, children }) {
  const handleClick = (e) => {
    clickCallback();
  };

  return (
    <div
      className="text-black block px-2 py-1 text-sm hover:bg-gray-300 hover:cursor-pointer"
      onClick={handleClick}
    >
      {children}{" "}
    </div>
  );
}
