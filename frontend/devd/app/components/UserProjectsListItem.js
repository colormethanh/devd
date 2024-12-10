import React from "react";
import Image from "next/image";

export default function UserProjectsListItem({
  project,
  handleRouteToProject,
  openDeleteProjectModal,
}) {
  return (
    <div
      key={project._id}
      className={`h-14 my-3 w-full border flex px-3 md:flex-row  items-center justify-between hover:border-green-500 hover:cursor-pointer`}
    >
      <div
        className="flex flex-grow h-full items-center hover:cursor-pointer"
        onClick={() => handleRouteToProject(project.project_id._id)}
      >
        <div className="w-1/2 text-start">{project.project_id?.name}</div>{" "}
      </div>
      <div className="h-full flex items-center">
        <div
          className="border p-1 border-red-400 hover:border-red-700 flex justify-center hover:cursor-pointer"
          onClick={() => {
            openDeleteProjectModal(project.project_id);
          }}
        >
          {" "}
          <Image
            src={"/static/trashIcon-white.png"}
            height={30}
            width={22}
            alt="delete project icon"
          />{" "}
        </div>
      </div>
    </div>
  );
}
