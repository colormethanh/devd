import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

export default function useShowcase(projectName) {
  const access_token = useSelector((state) => state.auth.token);
  const project = useSelector((state) => state.project.project);
  const {
    getProjectForShowcase,
    updateProject,
    postPage,
    updatePage,
    deletePageImage,
  } = useAxios();
  const { checkAndRefreshToken } = useAuth();

  const updateProjectDetails = async (updates) => {
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

  const addNewPage = async (formData) => {
    postPage(project._id, formData, access_token, async () =>
      getProjectForShowcase(project.name)
    );
  };

  const handlePageUpdate = async (formData, page_id) => {
    updatePage(
      {
        page_id,
        project_id: project._id,
        updates: formData,
        access_token,
      },
      async () => await getProjectForShowcase(project.name)
    );
  };

  const handleDeletePageImage = async (image, page_id) => {
    deletePageImage(
      { page_id, project_id: project._id, image, access_token },
      () => {
        getProjectForShowcase(project.name);
      }
    );
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

  return {
    project,
    updateProjectDetails,
    addNewPage,
    handlePageUpdate,
    handleDeletePageImage,
  };
}
