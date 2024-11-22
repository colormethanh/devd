import React from "react";

export default function UserProjectsListItem({
  project,
  handleRouteToProject,
}) {
  return (
    <div
      key={project._id}
      className={`h-16 my-3 w-full border flex flex-col md:flex-row  items-center px-3 hover:bg-white hover:text-black hover:cursor-pointer`}
      onClick={() => handleRouteToProject(project.project_id._id)}
    >
      <div className="w-1/2 text-start">{project.project_id?.name}</div>{" "}
      <div className="text-start"> Access: {project.role} </div>
    </div>
  );
}
