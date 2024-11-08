import React, { useEffect, useState } from "react";

export default function TaskPanelItem({
  task,
  clickCallback,
  isSelected = false,
}) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseExit = () => {
    setIsHover(false);
  };

  const handleClick = () => {
    clickCallback();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
      onClick={handleClick}
      className={`${
        isHover || isSelected ? "bg-white text-black" : ""
      } text-md p-1 mb-3 flex overflow-hidden`}
    >
      <div className="w-4">{isSelected && ">"}</div>{" "}
      <p className="w-28 text-nowrap overflow-ellipsis">{task.name}</p>
    </div>
  );
}
