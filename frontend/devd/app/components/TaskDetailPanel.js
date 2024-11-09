import React, { useEffect, useState } from "react";
import DescriptionContainer from "./DescriptionContainer";
import useHelpers from "../hooks/useHelpers";
import TaskUtilitiesDropdown from "./TaskUtilitiesDropdown";
import RelevantContentsContainer from "./RelevantContentsContainer";

export default function TaskDetailPanel({
  task,
  updateTaskStatus,
  updateTaskDescription,
}) {
  const [selectedStatus, setSelectedStatus] = useState("backlog");
  const [description, setDescription] = useState("");
  const { formatDate } = useHelpers();

  const handleStatusChange = (e) => {
    updateTaskStatus(task, e.target.value);
  };

  const handleDescriptionUpdate = (updatedDescription) => {
    updateTaskDescription(task, updatedDescription);
  };

  useEffect(() => {
    setSelectedStatus(task.status);
    setDescription(task.description);
  }, [task]);

  return (
    <div className="border-l h-full w-full">
      <div className="mx-3 h-full flex flex-col justify-around">
        <div className="w-full flex flex-col">
          <h1 className="text-4xl"> {task.name} </h1>
          <hr className="my-2 "></hr>
          <div className="flex flex-col w-1/2 sm:flex-row sm:w-full">
            {/* Posted date */}
            <div className="mr-3 ">
              <div className="flex flex-col sm:flex-row">
                <span className="text-s">
                  {" "}
                  Created: {formatDate(task.date_created)}{" "}
                </span>
              </div>
            </div>
            <div className="border-l border-white mr-3"></div>

            {/* Task status */}
            <div className="mr-3 ">
              <select
                id="status"
                name="status"
                className="block w-full border border-black hover:border-white py-1.5 bg-black text-white focus:outline-none focus:ring-0 focus:ring-inset focus:ring-gray-500 sm:max-w-xs text-xs hover:cursor-pointer"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value={"backlog"}>Backlog</option>
                <option value={"inProgress"}>In progress</option>
                <option value={"done"}>Done</option>
              </select>
            </div>

            <div className="border-l border-white mr-3"></div>

            {/* options dropdown */}
            <TaskUtilitiesDropdown />
          </div>
        </div>

        {/* Task Description */}
        <DescriptionContainer
          description={description}
          classString={"h-1/3"}
          updateCallback={handleDescriptionUpdate}
        />

        <div className="border-b border-gray-500 mr-3 w-full"></div>

        {/* Relevant contents */}
        <div className="flex flex-col h-2/5">
          <RelevantContentsContainer contents={""} />
        </div>
      </div>
    </div>
  );
}
