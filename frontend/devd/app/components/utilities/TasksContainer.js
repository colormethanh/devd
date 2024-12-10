import React, { useState } from "react";

export default function TasksContainer({ items, title, handleTaskClick }) {
  return (
    <div className="h-[30vh] text-left p-2 w-full border text-white">
      <div className="w-full text-lg flex items-center border-b">{title}</div>

      <div className="mt-2 w-full overflow-auto">
        <ul>
          {items !== undefined &&
            items.map((item) => {
              return (
                <li
                  key={item._id}
                  className="my-1 border border-gray-500 hover:cursor-pointer"
                  onClick={() => {
                    handleTaskClick(item._id);
                  }}
                >
                  <div className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black">
                    {item.name}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
