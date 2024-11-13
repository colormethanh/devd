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
      }
    };
    setupPage();
  }, [accessToken, user]);

  return (
    <div className="flex flex-row justify-center text-center h-full w-full">
      <h1 className="w-2/3 border">Hello world</h1>
    </div>
  );
}
