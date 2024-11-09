"use client";
import { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useProjectDetails(project_id) {
  const { axiosGetProject } = useAxios();
  const project = useSelector((state) => state.project.project);
  const isLoading = useSelector((state) => state.project.isLoading);

  const refreshProject = async (project_id) => {
    try {
      const retrievedProject = await axiosGetProject(project_id);
      return retrievedProject;
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => {
    refreshProject(project_id);
  }, []);

  return { project, isLoading };
}
