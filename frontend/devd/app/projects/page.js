"use client";
import { useEffect, useState } from "react";
import ProjectPanel from "../components/ProjectPanel";
import HorizontalScrollContainer from "../components/utilities/HorizontalScrollContainer";
import useProjects from "../hooks/useProjects";
import Button from "../components/utilities/Button";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

export default function ProjectsPage() {
  const { isLoading } = useProjects();
  const [activeProject, setActiveProject] = useState(0);

  const projects = useSelector((state) => state.auth.user.projects);

  const { accessToken, needsLogin, checkAndRefreshToken } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const setupPage = async () => {
      if (accessToken !== undefined) {
        await checkAndRefreshToken(accessToken);
        if (needsLogin === true) router.push("/auth");
      }
      console.log(projects);
    };
    setupPage();
  }, []);

  return (
    <div className="flex flex-col text-center">
      {/* <HorizontalScrollContainer setActiveChild={setActiveProject}>
        {projects &&
          projects.map((project, i) => (
            <ProjectPanel
              key={project._id}
              project={project}
              isActive={i === activeProject}
            />
          ))}
      </HorizontalScrollContainer> */}
    </div>
  );
}
