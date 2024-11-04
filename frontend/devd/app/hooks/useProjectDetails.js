"use client";
import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

const validViews = ["tasks", "components", "pages", "team"];

export default function useProjectDetails(project_id) {
  const { axiosGetProject } = useAxios();
  const project = useSelector((state) => state.project.project);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewing, setIsViewing] = useState("tasks");

  const refreshProject = async (project_id) => {
    setIsLoading(true);
    try {
      const retrievedProject = await axiosGetProject(project_id);
      console.log(retrievedProject.payload);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeViewTo = async (view) => {
    if (validViews.includes(view)) {
      return setIsViewing(view);
    }
  };

  useEffect(() => {
    refreshProject(project_id);
  }, [project, project_id]);

  return { project, isLoading, isViewing, changeViewTo };
}
