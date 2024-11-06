import React, { useEffect, useState } from "react";

export default function TaskPanelItem({ task, isSelected = false }) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseExit = () => {
    setIsHover(false);
  };

  useEffect(() => {
    console.log(task);
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
      className={`${
        isHover || isSelected ? "bg-white text-black" : ""
      } text-md p-1 my-3 flex overflow-hidden`}
    >
      <div className="w-4">{isSelected && ">"}</div>{" "}
      <p className="w-28 text-nowrap overflow-ellipsis">{task.name}</p>
    </div>
  );
}
