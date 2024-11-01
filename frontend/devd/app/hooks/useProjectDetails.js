"use client";
import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useProjectDetails(project_id) {
  const { axiosGetProject } = useAxios();
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const refreshProject = async (project_id) => {
    setIsLoading(true);
    try {
      const retrievedProject = await axiosGetProject(project_id);
      console.log(retrievedProject);
      setProject(retrievedProject);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProject(project_id);
  }, []);

  return { project, isLoading };
}
