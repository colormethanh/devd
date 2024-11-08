"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useProjectDetails from "@/app/hooks/useProjectDetails";
import SideBar from "@/app/components/utilities/SideBar";
import ProjectTasks from "@/app/components/ProjectTasks";
import ProjectPages from "@/app/components/ProjectPages";
import ProjectComponents from "@/app/components/ProjectComponents";
import ProjectTeam from "@/app/components/ProjectTeam";

export default function ProjectDetails() {
  const { project_id } = useParams();
  const { project, isLoading, isViewing, changeViewTo } =
    useProjectDetails(project_id);

  return (
    <div className="flex h-full w-full">
      <SideBar onItemClick={changeViewTo} isViewing={isViewing} />
      <div className="w-full">
        {isViewing === "tasks" && <ProjectTasks project={project} />}

        {isViewing === "pages" && <ProjectPages project={project} />}

        {isViewing === "components" && <ProjectComponents />}

        {isViewing === "team" && <ProjectTeam />}
      </div>
    </div>
  );
}
