import React from "react";
import Image from "next/image";
import Dropdown from "./utilities/Dropdown";

export default function ProjectProject({ project, changeViewTo }) {
  const filterItems = [
    { text: "BackLog", callback: () => {} },
    { text: "In Progress", callback: () => {} },
    { text: "Done", callback: () => {} },
  ];

  return (
    <div className="h-5/6 border border-white mr-1 mt-4">
      <div className="flex flex-col h-full">
        <h1 className="text-3xl p-3"> {project.name} </h1>

        {/* Project tasks viewer */}
        <div className="border w-1/4 h-60 flex flex-col">
          <div className="border-b h-8 flex justify-between">
            <div className="h-full flex flex-col justify-center px-3">
              {" "}
              Tasks{" "}
            </div>

            <Dropdown
              items={filterItems}
              toggleText={
                <Image
                  className=""
                  src={"/static/filterIcon-white.png"}
                  height={20}
                  width={20}
                  alt="Filter icon"
                />
              }
              addStyle={"p-1"}
            />
          </div>
          <h1> asdasda </h1>
        </div>
      </div>
    </div>
  );
}
