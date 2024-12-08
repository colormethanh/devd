import { useDispatch } from "react-redux";
import {
  signup,
  login,
  refreshAccessToken,
  logout,
  patchUserInDB,
} from "../store/slices/authSlice";
import { resetTask, setTaskError } from "../store/slices/taskSlice";
import {
  getProject,
  getShowcaseData,
  updateProjectInDB,
} from "../store/slices/projectSlice";
import { getTask, updateTaskInDB } from "../store/slices/taskSlice";
import {
  getComponent,
  updateComponentInDB,
  uploadImageToComponent,
  deleteComponentImageInDB,
} from "../store/slices/componentSlice";
import {
  getPage,
  updatePageInDB,
  uploadImageToPage,
  patchPageFeatureInDB,
  deletePageFeatureInDB,
  deletePageImageInDB,
} from "../store/slices/pageSlice";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useAxios() {
  const dispatch = useDispatch();

  // Auth
  const dispatchLogin = async (formData) => {
    const response = await dispatch(login(formData));
    return response;
  };

  const dispatchSignup = async (formData) => {
    const response = await dispatch(signup(formData));
    return response;
  };

  const dispatchLogout = async () => {
    const response = await dispatch(logout());
    return response;
  };

  const refreshToken = async () => {
    const response = await dispatch(refreshAccessToken());
    return response;
  };

  // User
  const patchUser = async (user_id, updates, access_token) => {
    const response = await dispatch(
      patchUserInDB({ user_id, updates, access_token })
    );

    if (response.meta?.requestStatus === "fulfilled") {
      await refreshToken();
    }
    return response;
  };

  // Projects
  const getProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`);
      return response.data.payload;
    } catch (err) {
      console.error(err);
    }
  };

  const updateProject = async (
    { project_id, updates, access_token },
    successCallback = undefined
  ) => {
    try {
      const response = await dispatch(
        updateProjectInDB({ project_id, updates, access_token })
      );

      if (response.meta?.requestStatus === "fulfilled") {
        if (successCallback !== undefined) {
          await successCallback();
        } else {
          await getProjectDetails(project_id);
        }
      }

      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const postProjectToDB = async ({ formData, accessToken }) => {
    try {
      const response = await axios.post(`${BASE_URL}/projects/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await refreshToken();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProjectInDB = async (project_id, access_token) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/projects/${project_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      await refreshToken();
    } catch (err) {
      console.log(err);
    }
  };

  const getProjectDetails = async (project_id) => {
    try {
      const response = await dispatch(getProject(project_id));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getProjectForShowcase = async (projectName) => {
    try {
      const response = await dispatch(getShowcaseData(projectName));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  // Tasks
  const getTaskDetails = async ({ project_id, task_id, access_token }) => {
    try {
      const response = await dispatch(
        getTask({ project_id, task_id, access_token })
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async ({ task_id, project_id, updates, access_token }) => {
    try {
      const updateResponse = await dispatch(
        updateTaskInDB({ task_id, project_id, updates, access_token })
      );

      if (updateResponse.meta?.requestStatus === "fulfilled") {
        await getTaskDetails({ project_id, task_id, access_token });
        await getProjectDetails(project_id);
      }

      return updateResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const postTask = async (project_id, formData, accessToken) => {
    try {
      await axios.post(`${BASE_URL}/projects/${project_id}/tasks`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      const response = await getProjectDetails(project_id);

      return response;
    } catch (err) {
      await dispatch(setTaskError("error during task post"));
      return Error(err.message);
    }
  };

  const deleteTaskInDB = async (task_id, project_id, access_token) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/projects/${project_id}/tasks/${task_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return await getProjectDetails(project_id);
    } catch (err) {
      console.log(err);
    }
  };

  // Pages
  const postPage = async (
    project_id,
    formData,
    accessToken,
    successCallback = undefined
  ) => {
    try {
      const postResponse = await axios.post(
        `${BASE_URL}/projects/${project_id}/pages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (!successCallback) {
        await dispatch(getProject(project_id));
      } else {
        await successCallback();
      }

      return postResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const deletePageInDB = async (page_id, project_id, access_token) => {
    try {
      await axios.delete(
        `${BASE_URL}/projects/${project_id}/pages/${page_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return await getProjectDetails(project_id);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePageImage = async (
    { page_id, project_id, image, access_token },
    onSuccessCallback = undefined
  ) => {
    try {
      const deleteResponse = await dispatch(
        deletePageImageInDB({ page_id, project_id, image, access_token })
      );

      if (deleteResponse.meta?.requestStatus === "fulfilled") {
        if (onSuccessCallback) {
          onSuccessCallback();
        } else {
          await getPageDetails({ project_id, page_id, access_token });
        }
      }
      return deleteResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const updatePage = async (
    { page_id, project_id, updates, access_token },
    successCallback = undefined
  ) => {
    try {
      const updateResponse = await dispatch(
        updatePageInDB({ page_id, project_id, access_token, updates })
      );
      if (updateResponse.meta?.requestStatus === "fulfilled") {
        if (successCallback) {
          await successCallback();
        } else {
          await getPageDetails({ project_id, page_id, access_token });
        }
      }
      return updateResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const patchPageFeature = async ({
    page_id,
    project_id,
    updates,
    access_token,
  }) => {
    try {
      const patchResponse = await dispatch(
        patchPageFeatureInDB({
          page_id,
          project_id,
          updates: { feature: updates },
          access_token,
        })
      );

      if (patchResponse.meta?.requestStatus === "fulfilled") {
        await getPageDetails({ project_id, page_id, access_token });
      }
      return patchResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const deletePageFeature = async ({
    page_id,
    project_id,
    feature_id,
    access_token,
  }) => {
    try {
      const deleteResponse = await dispatch(
        deletePageFeatureInDB({
          page_id,
          project_id,
          feature_id,
          access_token,
        })
      );

      if (deleteResponse.meta?.requestStatus === "fulfilled") {
        await getPageDetails({ project_id, page_id, access_token });
      }
      return deleteResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const getPageDetails = async ({ project_id, page_id, access_token }) => {
    try {
      const pageDetails = await dispatch(
        getPage({ project_id, page_id, access_token })
      );
      return pageDetails;
    } catch (err) {
      console.log(err);
    }
  };

  const updatePageImages = async (
    { project_id, page_id, image, title, access_token },
    onSuccessCallback
  ) => {
    try {
      const updates = new FormData();
      updates.append("title", title);
      updates.append("image", image);

      const uploadImageResponse = await dispatch(
        uploadImageToPage({ project_id, page_id, updates, access_token })
      );

      if (uploadImageResponse?.meta?.requestStatus === "fulfilled")
        if (onSuccessCallback) {
          onSuccessCallback();
        } else {
          await getPageDetails({
            project_id,
            page_id,
            access_token,
          });
        }

      return uploadImageResponse;
    } catch (err) {
      console.log(err);
    }
  };

  // Components
  const postComponent = async (
    project_id,
    formData,
    accessToken,
    onSuccessCallback = undefined
  ) => {
    try {
      const postResponse = await axios.post(
        `${BASE_URL}/projects/${project_id}/components`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // update project to contain newly added component in frontend
      if (onSuccessCallback) {
        await onSuccessCallback();
      } else {
        await dispatch(getProject(project_id));
      }

      return postResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComponentInDB = async (
    component_id,
    project_id,
    access_token
  ) => {
    try {
      await axios.delete(
        `${BASE_URL}/projects/${project_id}/components/${component_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return await getProjectDetails(project_id);
    } catch (err) {
      console.log(err);
    }
  };

  const updateComponent = async (
    { component_id, project_id, updates, access_token },
    onSuccessCallback = undefined
  ) => {
    try {
      const updateResponse = await dispatch(
        updateComponentInDB({ project_id, component_id, access_token, updates })
      );

      if (updateResponse.meta?.requestStatus === "fulfilled") {
        if (onSuccessCallback) {
          onSuccessCallback();
        } else {
          await getComponentDetails({ project_id, component_id, access_token });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getComponentDetails = async ({
    project_id,
    component_id,
    access_token,
  }) => {
    try {
      const response = await dispatch(
        getComponent({ project_id, component_id, access_token })
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComponentImage = async (
    { component_id, project_id, image, access_token },
    onSuccessCallback = undefined
  ) => {
    try {
      const deleteResponse = await dispatch(
        deleteComponentImageInDB({
          component_id,
          project_id,
          image,
          access_token,
        })
      );

      if (deleteResponse.meta?.requestStatus === "fulfilled") {
        if (onSuccessCallback) {
          await onSuccessCallback();
        } else {
          await getComponentDetails({ project_id, component_id, access_token });
        }
      }
      return deleteResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const updateComponentImage = async (
    { project_id, component_id, image, title, access_token },
    onSuccessCallback = undefined
  ) => {
    try {
      const updates = new FormData();
      updates.append("title", title);
      updates.append("image", image);

      const uploadImageResponse = await dispatch(
        uploadImageToComponent({
          project_id,
          component_id,
          updates,
          access_token,
        })
      );

      if (uploadImageResponse?.meta?.requestStatus === "fulfilled")
        if (onSuccessCallback) {
          await onSuccessCallback();
        } else {
          await getComponentDetails({
            project_id,
            component_id,
            access_token,
          });
        }
      return uploadImageResponse;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    dispatchLogin,
    dispatchSignup,
    refreshToken,
    patchUser,
    updateProject,
    postProjectToDB,
    deleteProjectInDB,
    getProjectDetails,
    getProjectForShowcase,
    getTaskDetails,
    updateTask,
    postTask,
    postPage,
    getPageDetails,
    updatePage,
    patchPageFeature,
    deletePageImage,
    updatePageImages,
    postComponent,
    getComponentDetails,
    updateComponent,
    updateComponentImage,
    dispatchLogout,
    deleteTaskInDB,
    deletePageInDB,
    deleteComponentInDB,
    deletePageFeature,
    deleteComponentImage,
  };
}
