import { useDispatch } from "react-redux";
import { signup, login, refreshAccessToken } from "../store/slices/authSlice";
import { resetTask } from "../store/slices/taskSlice";
import { getProject } from "../store/slices/projectSlice";
import { getTask, updateTaskInDB } from "../store/slices/taskSlice";
import {
  getComponent,
  updateComponentInDB,
  uploadImageToComponent,
} from "../store/slices/componentSlice";
import {
  getPage,
  updatePageInDB,
  uploadImageToPage,
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

  const refreshToken = async () => {
    const response = await dispatch(refreshAccessToken());
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
    // todo: check if user is authorized
  };

  const getProjectDetails = async (project_id) => {
    try {
      const response = await dispatch(getProject(project_id));
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
      }

      return updateResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const postTask = async (project_id, formData, accessToken) => {
    try {
      // post task
      await axios.post(`${BASE_URL}/projects/${project_id}/tasks`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // update project to contain newly added task in frontend
      const response = await dispatch(getProject(project_id));

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const dispatchResetTask = async () => {
    try {
      return await dispatch(resetTask());
    } catch (err) {
      console.log(err);
    }
  };

  // Pages
  const postPage = async (project_id, formData, accessToken) => {
    try {
      await axios.post(`${BASE_URL}/projects/${project_id}/pages`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = await dispatch(getProject(project_id));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const updatePage = async ({ page_id, project_id, updates, access_token }) => {
    try {
      const updateResponse = await dispatch(
        updatePageInDB({ page_id, project_id, access_token, updates })
      );

      if (updateResponse.meta?.requestStatus === "fulfilled") {
        await getPageDetails({ project_id, page_id, access_token });
      }
      return updateResponse;
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

  const updatePageImages = async ({
    project_id,
    page_id,
    image,
    title,
    access_token,
  }) => {
    try {
      const updates = new FormData();
      updates.append("title", title);
      updates.append("image", image);

      const uploadImageResponse = await dispatch(
        uploadImageToPage({ project_id, page_id, updates, access_token })
      );

      if (uploadImageResponse?.meta?.requestStatus === "fulfilled")
        await getPageDetails({
          project_id,
          page_id,
          access_token,
        });

      return uploadImageResponse;
    } catch (err) {
      console.log(err);
    }
  };

  // Components
  const postComponent = async (project_id, formData, accessToken) => {
    try {
      await axios.post(
        `${BASE_URL}/projects/${project_id}/components`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // update project to contain newly added component in frontend
      const response = await dispatch(getProject(project_id));

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const updateComponent = async ({
    component_id,
    project_id,
    updates,
    access_token,
  }) => {
    try {
      const updateResponse = await dispatch(
        updateComponentInDB({ project_id, component_id, access_token, updates })
      );

      if (updateResponse.meta?.requestStatus === "fulfilled") {
        await getComponentDetails({ project_id, component_id, access_token });
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

  const updateComponentImage = async ({
    project_id,
    component_id,
    image,
    title,
    access_token,
  }) => {
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
        await getComponentDetails({
          project_id,
          component_id,
          access_token,
        });
      return uploadImageResponse;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    dispatchLogin,
    dispatchSignup,
    refreshToken,
    getProjects,
    getProjectDetails,
    getTaskDetails,
    updateTask,
    postTask,
    postPage,
    getPageDetails,
    updatePage,
    updatePageImages,
    dispatchResetTask,
    postComponent,
    getComponentDetails,
    updateComponent,
    updateComponentImage,
  };
}
