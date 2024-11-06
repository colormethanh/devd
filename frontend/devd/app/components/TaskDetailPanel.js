import React, { useEffect, useState } from "react";
import DescriptionContainer from "./DescriptionContainer";

export default function TaskDetailPanel({
  task,
  updateTaskStatus,
  updateTaskDescription,
}) {
  const [selectedStatus, setSelectedStatus] = useState("backlog");
  const [description, setDescription] = useState("");

  const handleStatusChange = (e) => {
    updateTaskStatus(task, e.target.value);
  };

  const handleDescriptionUpdate = (updatedDescription) => {
    updateTaskDescription(task, updatedDescription);
  };

  useEffect(() => {
    console.log(task);
    setSelectedStatus(task.status);
    setDescription(task.description);
  }, [task]);

  return (
    <div className="border-l h-full w-full">
      <div className=" mx-3 h-full flex flex-col justify-around">
        <div className="w-full flex flex-col">
          <h1 className="text-4xl"> {task.name} </h1>
          <hr className="my-2"></hr>
          <div className="flex flex-col w-1/2 sm:flex-row sm:w-full">
            {/* Task status */}
            <div className="mr-3 ">
              <select
                id="status"
                name="status"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs text-xs hover:cursor-pointer"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value={"backlog"}>Backlog</option>
                <option value={"inProgress"}>In progress</option>
                <option value={"done"}>Done</option>
              </select>
            </div>
            <div className="border-l border-white mr-3"></div>

            {/* Completion date */}
            <div className="mr-3 ">
              <div className="flex flex-col sm:flex-row">
                <h5 className="text-s"> Complete By:</h5>
                <input className="text-black sm:ml-3" type="date" />{" "}
              </div>
            </div>
          </div>
        </div>

        {/* Task Description */}
        <DescriptionContainer
          description={description}
          classString={"h-28 w-1/2 sm:w-full overflow-auto"}
          updateCallback={handleDescriptionUpdate}
        />

        {/* Relevant contents */}
        <div className="flex flex-col h-2/5">
          <h5 className="text-xl font-bold"> Relevant contents:</h5>
          <div className="w-1/3 h-full border overflow-auto border-gray-500">
            <p> Blah </p>
            <p> Blah </p>
            <p> Blah </p>
            <p> Blah </p>
          </div>
        </div>
      </div>
    </div>
  );
}
