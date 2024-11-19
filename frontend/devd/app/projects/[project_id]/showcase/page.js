"use client";

import React from "react";
import useShowcase from "@/app/hooks/useShowcase";

export default function ProjectShowcase({ params }) {
  const { project_id } = React.use(params);
  const { project } = useShowcase(project_id);

  console.log(project);
  return (
    <div className="w-full h-full p-3 overflow-auto">
      <div className="w-full">
        <div className="h-32 w-full flex flex-col justify-center items-center">
          <h1 className="text-6xl mb-3">
            {project !== undefined && project.name}
          </h1>
          <p> By: {project.owner !== undefined && project.owner.username} </p>
        </div>
      </div>
    </div>
  );
}
