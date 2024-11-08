import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";

export default function SideBarItem({
  src,
  onHoverSrc,
  isOpen,
  children,
  onClickCallback,
  isSelected,
}) {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(true);
  };

  const handleExit = () => {
    setHover(false);
  };

  return (
    <li onMouseEnter={handleHover} onMouseLeave={handleExit}>
      <Button
        addStyle={`w-full  ${isSelected ? "border" : "border-0"}`}
        clickCallback={onClickCallback}
      >
        <div className={`flex flex-row ${!isOpen && "justify-center"}`}>
          {" "}
          <div className={`flex justify-center w-8 h-7 ${isOpen && "mr-3"}`}>
            <Image
              src={hover ? onHoverSrc : src}
              alt={"Components Icon"}
              height={20}
              width={25}
            />
          </div>
          <div className="grid place-items-center">{isOpen && children}</div>
        </div>
      </Button>
    </li>
  );
}
