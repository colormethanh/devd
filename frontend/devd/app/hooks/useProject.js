"use client";
import { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useProject(project_id) {
  const { getProjectDetails } = useAxios();
  const project = useSelector((state) => state.project.project);
  const isLoading = useSelector((state) => state.project.isLoading);

  useEffect(() => {
    if (project_id) getProjectDetails(project_id);
  }, []);

  return { project, isLoading };
}
