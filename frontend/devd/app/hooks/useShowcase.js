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
    updatePageImages,
    postComponent,
    updateComponent,
    updateComponentImage,
    deleteComponentImage,
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
      async () => {
        await getProjectForShowcase(project.name);
      }
    );
  };

  const postNewPageImage = async (title, image, page_id) => {
    updatePageImages(
      {
        project_id: project._id,
        page_id,
        title,
        image,
        access_token,
      },
      async () => {
        await getProjectForShowcase(project.name);
      }
    );
  };

  const postNewComponentImage = async (title, image, component_id) => {
    updateComponentImage(
      {
        project_id: project._id,
        component_id,
        title,
        image,
        access_token,
      },
      async () => {
        await getProjectForShowcase(project.name);
      }
    );
  };

  const postNewComponent = async (formData) => {
    postComponent(project._id, formData, access_token, async () =>
      getProjectForShowcase(project.name)
    );
  };

  const handleComponentUpdate = async (formData, component_id) => {
    updateComponent(
      {
        component_id,
        project_id: project._id,
        updates: formData,
        access_token,
      },
      async () => await getProjectForShowcase(project.name)
    );
  };

  const handleDeleteComponentImage = async (image, component_id) => {
    deleteComponentImage(
      {
        component_id,
        project_id: project._id,
        image,
        access_token,
      },
      async () => {
        await getProjectForShowcase(project.name);
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
    postNewPageImage,
    postNewComponent,
    handleComponentUpdate,
    handleDeleteComponentImage,
    postNewComponentImage,
  };
}
