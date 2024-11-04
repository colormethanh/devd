import React from "react";

export default function TasksPanel({ children }) {
  return (
    <div className="w-full h-full">
      <div className="h-full">
        <div className=" h-full py-1">{children}</div>
      </div>
    </div>
  );
}
