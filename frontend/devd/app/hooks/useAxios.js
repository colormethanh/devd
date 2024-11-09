import { useDispatch } from "react-redux";
import { signup, login, refreshAccessToken } from "../store/slices/authSlice";
import { getProject } from "../store/slices/projectSlice";
import { getTask, updateTaskInDB } from "../store/slices/taskSlice";
import { getPage, updatePageInDB } from "../store/slices/pageSlice";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useAxios() {
  const dispatch = useDispatch();

  const login = async (formData) => {
    const response = dispatch(login(formData));
    return response;
  };

  const signup = async (formData) => {
    const response = dispatch(signup(formData));
    return response;
  };

  const refreshToken = async () => {
    const response = dispatch(refreshAccessToken());
    return response;
  };

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
      const response = dispatch(getProject(project_id));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getTaskDetails = async ({ project_id, task_id, access_token }) => {
    try {
      const response = dispatch(getTask({ project_id, task_id, access_token }));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async ({ task_id, project_id, updates, access_token }) => {
    try {
      const response = dispatch(
        updateTaskInDB({ task_id, project_id, updates, access_token })
      );
      return response;
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

      // update project to contain task
      const response = dispatch(getProject(project_id));

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const updatePage = async ({ page_id, project_id, updates, access_token }) => {
    try {
      const response = dispatch(
        updatePageInDB({ page_id, project_id, access_token, updates })
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getPageDetails = async ({ project_id, page_id, access_token }) => {
    try {
      const response = dispatch(getPage({ project_id, page_id, access_token }));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    login,
    signup,
    refreshToken,
    getProjects,
    getProjectDetails,
    getTaskDetails,
    updateTask,
    postTask,
    getPageDetails,
    updatePage,
  };
}
