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
    <div className="mr-1 mt-4">
      <div className="flex flex-col px-3">
        <h1 className="text-4xl lg:text-6xl p-1 mb-2  border-b border-gray-500">
          {" "}
          Project overview: {project.name}
        </h1>
        {/* <hr className="my-2"></hr> */}

        {/* Project details */}
        <div className="flex gap-4 h-max">
          <div className="w-full flex flex-col gap-6">
            {/* Project Description */}
            <div className="">
              <h3 className="text-lg lg:text-2xl font-bold">
                {" "}
                Project Description:{" "}
              </h3>
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
            <div className="flex flex-col md:flex-row w-full">
              <h3 className="text-lg lg:text-2xl font-bold md:mr-3">
                {" "}
                Project URL:{" "}
              </h3>
              <TextAndInputContainer
                text={project.url}
                updateCallback={updateProjectUrl}
              />
            </div>

            {/* Project tasks */}
            <div>
              <h1 className="text-lg lg:text-2xl font-bold">
                {" "}
                Project Tasks:{" "}
              </h1>
              <div className="flex flex-col md:flex-row  gap-3 p-2 w-full">
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
