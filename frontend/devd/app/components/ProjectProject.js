import React, { useEffect } from "react";
import Image from "next/image";
import Dropdown from "./utilities/Dropdown";
import DescriptionContainer from "./DescriptionContainer";
import TextAndInputContainer from "./utilities/TextAndInputContainer";
import useAxios from "../hooks/useAxios";
import TasksContainer from "./utilities/TasksContainer";

export default function ProjectProject({
  project,
  changeViewTo,
  access_token,
  updateProjectDescription,
  updateProjectUrl,
}) {
  const handleNavigateToTask = (task_id) => {
    changeViewTo("tasks", task_id);
  };

  useEffect(() => {
    console.log(project);
  }, [project]);

  return (
    <div className="h-5/6 border border-white mr-1 mt-4">
      <div className="flex flex-col h-full px-3">
        <h1 className="text-6xl p-1"> {project.name} </h1>
        <hr className="my-2"></hr>

        {/* Project details */}
        <div className="flex gap-4 flex-grow overflow-auto">
          <div className=" w-full h-full flex flex-col gap-6">
            {/* Project Description */}
            <div>
              <h3 className="text-2xl font-bold"> Project Description: </h3>
              <p className="text-xs text-gray-400">
                {" "}
                Click text below to modify project description{" "}
              </p>
              <DescriptionContainer
                classString={"my-3"}
                description={project.description}
                updateCallback={updateProjectDescription}
              />
            </div>

            {/* Project URL */}
            <div className="flex w-full">
              <h3 className="text-2xl font-bold"> Project URL: </h3>
              <TextAndInputContainer
                text={project.url}
                classString={"flex-grow px-3"}
                updateCallback={updateProjectUrl}
              />
            </div>

            {/* Project tasks */}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold"> Project Tasks: </h1>
              <div className="flex h-5/6 gap-3 p-2 w-full">
                {project.tasks !== undefined && (
                  <>
                    <TasksContainer
                      items={project.tasks.filter(
                        (task) => task.status === "backlog"
                      )}
                      title={"Backlog"}
                      handleTaskClick={handleNavigateToTask}
                    />
                    <TasksContainer
                      items={project.tasks.filter(
                        (task) => task.status === "inProgress"
                      )}
                      title={"In Progress"}
                      handleTaskClick={handleNavigateToTask}
                    />
                    <TasksContainer
                      items={project.tasks.filter(
                        (task) => task.status === "done"
                      )}
                      title={"Done"}
                      handleTaskClick={handleNavigateToTask}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
