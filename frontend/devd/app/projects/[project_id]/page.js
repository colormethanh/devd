"use client";
import React, { useEffect, use } from "react";
import useProject from "@/app/hooks/useProject";
import SideBar from "@/app/components/utilities/SideBar";
import ProjectTasks from "@/app/components/ProjectTasks";
import ProjectPages from "@/app/components/ProjectPages";
import ProjectComponents from "@/app/components/ProjectComponents";
import ProjectTeam from "@/app/components/ProjectTeam";
import useAuth from "@/app/hooks/useAuth";
import useViews from "@/app/hooks/useViews";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ProjectDetails() {
  const router = useRouter();
  // debugger;
  const project_id = useSelector((state) => state.project.requestedProject);
  const { accessToken, needsLogin, checkAndRefreshToken } = useAuth();

  const { project } = useProject(project_id, accessToken);
  const { isViewing, changeViewTo } = useViews(project);

  const handleChangeView = (view) => {
    // if view array is not empty then set the first item as the default
    if (project[view] !== undefined && project[view].length !== 0) {
      return changeViewTo(view, project[view][0]._id);
    }
    changeViewTo(view);
  };

  useEffect(() => {
    const setupPage = async () => {
      if (accessToken !== undefined) {
        await checkAndRefreshToken(accessToken);
        if (needsLogin === true) router.push("/auth");
      }
      handleChangeView("tasks");
    };

    setupPage();
  }, [project]);

  return (
    <div className="flex h-full w-full">
      <SideBar onItemClick={handleChangeView} isViewing={isViewing} />
      {needsLogin === true ? (
        <div className="w-full"> Please login to continue </div>
      ) : (
        // todo add needs login view
        <div className="w-full overflow-hidden">
          {isViewing === "tasks" && (
            <ProjectTasks project={project} changeViewTo={changeViewTo} />
          )}

          {isViewing === "pages" && (
            <ProjectPages project={project} accessToken={accessToken} />
          )}

          {isViewing === "components" && (
            <ProjectComponents project={project} accessToken={accessToken} />
          )}

          {isViewing === "team" && <ProjectTeam />}
        </div>
      )}
    </div>
  );
}
