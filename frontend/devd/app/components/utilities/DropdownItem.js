import React from "react";

export default function DropdownItem({ clickCallback, children }) {
  const handleClick = (e) => {
    clickCallback();
  };

  return (
    <div
      className="text-black block px-4 py-2 text-sm hover:bg-gray-100 hover:cursor-pointer"
      onClick={handleClick}
    >
      {children}{" "}
    </div>
  );
}
