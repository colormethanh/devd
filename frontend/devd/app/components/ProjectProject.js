import React, { useEffect } from "react";
import Image from "next/image";
import Dropdown from "./utilities/Dropdown";
import DescriptionContainer from "./DescriptionContainer";
import TextAndInputContainer from "./utilities/TextAndInputContainer";
import useAxios from "../hooks/useAxios";

export default function ProjectProject({
  project,
  changeViewTo,
  access_token,
  updateProjectDescription,
  updateProjectUrl,
}) {
  useEffect(() => {
    console.log(project);
  });

  return (
    <div className="h-5/6 border border-white mr-1 mt-4">
      <div className="flex flex-col h-full px-3">
        <h1 className="text-4xl p-1"> {project.name} </h1>
        <hr className="my-2"></hr>

        <div className="flex flex-col gap-4">
          {/* Project Description */}
          <div>
            <h3 className="text-3xl"> Project Description: </h3>
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

          {/* Project tasks viewer */}
          <div className="flex w-full">
            <h3 className="text-lg"> Project URL: </h3>
            <TextAndInputContainer
              text={project.url}
              classString={"flex-grow px-3"}
              updateCallback={updateProjectUrl}
            />
          </div>

          <div className="h-40 w-40 border"></div>
        </div>
      </div>
    </div>
  );
}
