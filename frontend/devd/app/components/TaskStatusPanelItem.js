import React, { useState } from "react";

export default function TaskPanelItem({ children, isSelected = false }) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseExit = () => {
    setIsHover(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
      className={`${
        isHover || isSelected ? "bg-white text-black" : ""
      } text-md p-1 my-3 flex overflow-hidden`}
    >
      <div className="w-4">{isSelected && ">"}</div>{" "}
      <p className="w-28 text-nowrap overflow-ellipsis">
        Task Status Panel Item
      </p>
    </div>
  );
}
