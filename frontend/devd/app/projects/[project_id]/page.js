"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useProjectDetails from "@/app/hooks/useProjectDetails";
import SideBar from "@/app/components/utilities/SideBar";
import ProjectTasks from "@/app/components/ProjectTasks";

export default function ProjectDetails() {
  const { project_id } = useParams();
  const { project, isLoading, isViewing, changeViewTo } =
    useProjectDetails(project_id);

  return (
    <div className="flex h-full w-full">
      <SideBar onItemClick={changeViewTo} />
      <div className="w-full">
        {/* <h1 className="text-white"> {`Currently Viewing: ${isViewing}`} </h1> */}
        {isViewing === "tasks" && (
          <ProjectTasks project={project} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
