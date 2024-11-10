"use client";
import React from "react";

export default function Button({
  type = "button",
  addStyle = "",
  clickCallback,
  children,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    clickCallback();
  };
  return (
    <button
      type={type}
      onClick={(e) => {
        handleClick(e);
      }}
      className={`bg-[#000000] 
        text-white 
        border border-white
        hover:bg-white 
        hover:text-black 
        focus:outline-black 
        w-48 
        p-3
        ${addStyle}`}
    >
      <div className="w-full flex flex-row justify-between">
        <div className="w-full">{children}</div>
      </div>
    </button>
  );
}
