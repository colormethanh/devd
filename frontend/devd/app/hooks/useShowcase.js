import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

export default function useShowcase(projectName) {
  const access_token = useSelector((state) => state.auth.token);
  const project = useSelector((state) => state.project.project);
  const { getProjectForShowcase, updateProject } = useAxios();
  const { checkAndRefreshToken } = useAuth();

  const updateProjectDetails = async (updates) => {
    debugger;
    try {
      const updatedProject = await updateProject(
        {
          project_id: project._id,
          updates: updates,
          access_token: access_token,
        },
        async () => getProjectForShowcase(project.name)
      );
      return updatedProject;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const setupPage = async () => {
      if (access_token !== undefined) {
        await checkAndRefreshToken(access_token);
      }
    };

    if (projectName !== undefined) getProjectForShowcase(projectName);
    setupPage();
  }, [projectName]);

  return { project, updateProjectDetails };
}
