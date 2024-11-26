"use client";
import { useEffect } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

export default function useProject(project_id, accessToken) {
  const { getProjectDetails, updateProject } = useAxios();
  const project = useSelector((state) => state.project.project);
  const isLoading = useSelector((state) => state.project.isLoading);

  const updateProjectDescription = async (description) => {
    try {
      const updatedProject = await updateProject({
        project_id: project_id,
        updates: { description: description },
        access_token: accessToken,
      });
      return updatedProject;
    } catch (err) {
      console.log(err);
    }
  };

  const updateProjectUrl = async (url) => {
    try {
      const updatedProject = await updateProject({
        project_id: project_id,
        updates: { url: url },
        access_token: accessToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const setupProject = async () => {
      if (project_id) {
        const project = await getProjectDetails(project_id);
      }
    };
    setupProject();
  }, [project_id]);

  return { project, isLoading, updateProjectDescription, updateProjectUrl };
}
