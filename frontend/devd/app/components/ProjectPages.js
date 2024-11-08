import React, { useState } from "react";
import usePages from "../hooks/usePages";
import ListPanel from "./utilities/ListPanel";

export default function ProjectPages({ project }) {
  const [isAddPageView, setIsAddTaskView] = useState(false);
  const { page, setPage } = usePages(project);
  const currentPageId = page._id || null;

  return (
    <div className={"h-5/6 border border-white mr-1 mt-4"}>
      <div className="flex h-full">
        <div className="flex flex-col w-1/6 h-full">
          <div className="flex w-full justify-end p-1 h-8 border-b border-gray-500">
            <div
              onClick={() => console.log("add page button clicked")}
              className="flex justify-center w-1/6 text-xl hover:cursor-pointer"
            >
              {"+"}
            </div>
          </div>
          {/* add pages panel */}
          <ListPanel
            project={project}
            currentItemId={currentPageId}
            setItem={setPage}
            setIsAddItemView={setIsAddTaskView}
            itemName={"pages"}
          />
        </div>
      </div>
    </div>
  );
}
