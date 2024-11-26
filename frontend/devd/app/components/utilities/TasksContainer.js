import React, { useState } from "react";

export default function TasksContainer({ items, title, handleTaskClick }) {
  return (
    <div className=" text-left p-2 w-full border  text-white h-full">
      <div className="w-full h-8 text-lg flex items-center border-b">
        {title}
      </div>

      <div className="mt-2 h-5/6 w-full overflow-auto">
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
