"use client";
import React, { useEffect } from "react";
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
  const router = useRouter();

  const { project_id } = React.use(params);
  const { accessToken, needsLogin, checkAndRefreshToken } = useAuth();
  const { project } = useProject(project_id, accessToken);
  const { isViewing, changeViewTo } = useViews(project);

  const handleChangeView = (view) => {
    if (project[view] !== undefined && project[view].length !== 0) {
      return changeViewTo(view, project[view][0]._id);
    }
    changeViewTo(view);
  };

  const routeToShowcase = () => router.push(`/showcase/${project.name}`);

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
      <SideBar
        onItemClick={handleChangeView}
        isViewing={isViewing}
        routeToShowcase={routeToShowcase}
      />

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
