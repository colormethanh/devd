"use client";
import React, { useEffect, use } from "react";
import { useParams } from "next/navigation";
import useProject from "@/app/hooks/useProject";
import SideBar from "@/app/components/utilities/SideBar";
import ProjectTasks from "@/app/components/ProjectTasks";
import ProjectPages from "@/app/components/ProjectPages";
import ProjectComponents from "@/app/components/ProjectComponents";
import ProjectTeam from "@/app/components/ProjectTeam";
import useAuth from "@/app/hooks/useAuth";
import useViews from "@/app/hooks/useViews";
import { useRouter } from "next/navigation";

export default function ProjectDetails({ params }) {
  const unwrappedParams = use(params);
  const { project_id } = unwrappedParams;

  const { accessToken, needsLogin, checkAndRefreshToken } = useAuth();
  const { project } = useProject(project_id);
  const { isViewing, changeViewTo } = useViews();

  useEffect(() => {
    if (accessToken !== undefined) {
      checkAndRefreshToken(accessToken);
    }
  }, [accessToken]);

  return (
    <div className="flex h-full w-full">
      <SideBar onItemClick={changeViewTo} isViewing={isViewing} />
      {needsLogin === true ? (
        <div className="w-full"> Please login to continue </div>
      ) : (
        <div className="w-full overflow-hidden">
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
