"use client";
import { useEffect, useState } from "react";
import ProjectPanel from "../components/ProjectPanel";
import HorizontalScrollContainer from "../components/utilities/HorizontalScrollContainer";
import useProjects from "../hooks/useProjects";
import Button from "../components/utilities/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProjectsPage() {
  const { projects, refreshProjects, isLoading } = useProjects();
  const needs_login = useSelector((state) => state.auth.needs_login);

  const [activeProject, setActiveProject] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (needs_login === true) router.push("/auth");
  }, []);

  return (
    <div className="flex flex-col text-center">
      <div className="mt-8">
        <HorizontalScrollContainer setActiveChild={setActiveProject}>
          {projects &&
            projects.map((project, i) => (
              <ProjectPanel
                key={project._id}
                project={project}
                isActive={i === activeProject}
              />
            ))}
        </HorizontalScrollContainer>
      </div>

      <div className="project-info h-80 mt-6">
        {projects[activeProject] && (
          <div className="h-full flex flex-col items-center justify-around">
            <h1 className="text-6xl"> {projects[activeProject].name} </h1>
            <p> {projects[activeProject].description} </p>
            <p> Components: {projects[activeProject].components.length} </p>
            <p> pages: {projects[activeProject].pages.length} </p>
            <Button
              clickCallback={() => {
                router.push(`/projects/${projects[activeProject]._id}`);
              }}
            >
              {" "}
              Go to project{" "}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
