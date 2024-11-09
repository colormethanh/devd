"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import useProjectDetails from "@/app/hooks/useProjectDetails";
import SideBar from "@/app/components/utilities/SideBar";
import ProjectTasks from "@/app/components/ProjectTasks";
import ProjectPages from "@/app/components/ProjectPages";
import ProjectComponents from "@/app/components/ProjectComponents";
import ProjectTeam from "@/app/components/ProjectTeam";
import useAuth from "@/app/hooks/useAuth";

export default function ProjectDetails() {
  const { project_id } = useParams();
  const { accessToken, needsLogin, checkAndRefreshToken } = useAuth();
  const { project, isLoading, isViewing, changeViewTo } =
    useProjectDetails(project_id);

  useEffect(() => {
    if (accessToken !== undefined) {
      checkAndRefreshToken(accessToken);
    }
  });

  debugger;
  return (
    <div className="flex h-full w-full">
      <SideBar onItemClick={changeViewTo} isViewing={isViewing} />
      {needsLogin === true ? (
        <div className="w-full"> Please login to continue </div>
      ) : (
        <div className="w-full">
          {isViewing === "tasks" && <ProjectTasks project={project} />}

          {isViewing === "pages" && (
            <ProjectPages project={project} accessToken={accessToken} />
          )}

          {isViewing === "components" && <ProjectComponents />}

          {isViewing === "team" && <ProjectTeam />}
        </div>
      )}
    </div>
  );
}
