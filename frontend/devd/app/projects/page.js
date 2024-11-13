"use client";
import { useEffect, useState } from "react";
import ProjectPanel from "../components/ProjectPanel";
import HorizontalScrollContainer from "../components/utilities/HorizontalScrollContainer";
import useProjects from "../hooks/useProjects";
import Button from "../components/utilities/Button";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import useHelpers from "../hooks/useHelpers";
import Image from "next/image";

export default function ProjectsPage() {
  const { isLoading } = useProjects();
  const [projects, setProjects] = useState([]);
  const { accessToken, needsLogin, checkAndRefreshToken, user } = useAuth();
  const [selectedProject, setSelectedProject] = useState();
  const { formatDate } = useHelpers();

  const router = useRouter();

  const handleProjectSelect = (i) => {
    setSelectedProject({
      project: projects[i].project_id,
      role: projects[i].role,
    });
  };

  useEffect(() => {
    const setupPage = async () => {
      if (accessToken !== undefined) {
        await checkAndRefreshToken(accessToken);
        if (needsLogin === true) router.push("/auth");
        setProjects(user.projects);
        console.log(user);
      }
    };
    setupPage();
  }, [accessToken, user, projects]);
  return (
    <div className="flex flex-row justify-center mt-6 text-center h-full w-full">
      <div className="w-2/3 h-4/5 border p-3 flex flex-col">
        <h1 className="text-3xl mb-3">Welcome Back: {user && user.username}</h1>
        <div className="h-5/6 flex g-3">
          {/* User Projects container */}
          <div className="h-full w-1/2 p-3">
            <h3 className="text-start text-lg font-bold mb-1">
              {" "}
              Your projects{" "}
            </h3>
            <div className="h-5/6 w-full">
              <div
                className="gap-4 overflow-auto no-scrollbar w-full h-full border border-gray-500 p-3
          "
              >
                {user !== undefined &&
                  user.projects.map((project, i) => {
                    console.log(project);
                    return (
                      <div
                        key={project._id}
                        className="h-16 my-3 w-full transition-all hover:cursor-pointer border flex items-center px-3"
                        onClick={() => handleProjectSelect(i)}
                      >
                        <div className="w-1/2 text-start">
                          {project.project_id.name}
                        </div>{" "}
                        <div className="text-start">
                          {" "}
                          Access: {project.role}{" "}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Project Info Container */}
          <div className="h-full w-1/2 p-3">
            <h3 className="text-start text-lg font-bold mb-1">
              {" "}
              Project Details{" "}
            </h3>
            {/* Project info */}
            <div className="border border-gray-500 h-5/6 p-3 overflow-auto">
              {selectedProject !== undefined ? (
                <>
                  <h1 className="text-xl font-bold underline m-3">
                    {" "}
                    {selectedProject.project.name}{" "}
                  </h1>
                  <div className="border border-gray-500 text-start p-3 h-20 overflow-auto my-3">
                    {selectedProject.project.description}
                  </div>
                  <p className="text-start my-1">
                    {" "}
                    Created At:{" "}
                    {formatDate(selectedProject.project.date_created)}{" "}
                  </p>
                  <p className="text-start my-1">
                    {" "}
                    Tasks: {selectedProject.project.tasks.length}{" "}
                  </p>
                  <p className="text-start my-1">
                    {" "}
                    Features: {selectedProject.project.features.length}{" "}
                  </p>
                  <p className="text-start my-1">
                    {" "}
                    Pages: {selectedProject.project.pages.length}{" "}
                  </p>
                  <p className="text-start my-1">
                    {" "}
                    Component: {selectedProject.project.components.length}{" "}
                  </p>
                  <div className="w-full h-8 flex justify-end my-3">
                    <Button addStyle="p-0 text text-sm"> View Project </Button>
                    <div className="w-10 p-1 h-full border border-red-400 hover:border-red-700 mx-3 flex justify-center">
                      {" "}
                      <Image
                        src={"/static/trashIcon-white.png"}
                        height={30}
                        width={22}
                        alt="delete project icon"
                      />{" "}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-full flex justify-center items-center">
                    {" "}
                    <h1 className="text-2xl">
                      {" "}
                      ⬅️ Select a project on the left to view it's details{" "}
                    </h1>{" "}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
