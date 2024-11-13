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
  const [projects, setProjects] = useState([]);
  const { accessToken, needsLogin, checkAndRefreshToken, user } = useAuth();

  const router = useRouter();

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
  debugger;
  return (
    <div className="flex flex-row justify-center text-center h-full w-full">
      <div className="w-2/3 h-full border p-3 flex flex-col gap-4">
        <h1 className="text-3xl">Welcome Back: {user && user.username}</h1>

        <div className="min-h-32">
          <h3 className="text-start text-lg"> Your projects </h3>
          <div className="w-full h-full border border-gray-500 p-3">
            {user !== undefined &&
              user.projects.map((project) => {
                <div className="h-12"> {project.name} </div>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
