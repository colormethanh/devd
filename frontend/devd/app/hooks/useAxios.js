import { useDispatch } from "react-redux";
import { signup, login } from "../store/slices/authSlice";
import {
  getProject,
  getTask,
  updateTaskInDB,
  getPage,
} from "../store/slices/projectSlice";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useAxios() {
  const dispatch = useDispatch();

  const axiosLogin = async (formData) => {
    const response = dispatch(login(formData));
    return response;
  };

  const axiosSignup = async (formData) => {
    const response = dispatch(signup(formData));
    return response;
  };

  const axiosGetProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`);
      return response.data.payload;
    } catch (err) {
      console.error(err);
    }
    // todo: check if user is authorized
  };

  const axiosGetProject = async (project_id) => {
    try {
      // const response = await axios.get(`${BASE_URL}/projects/${project_id}`);
      // return response.data.payload;
      const response = dispatch(getProject(project_id));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getTaskDetails = async (params) => {
    try {
      const response = dispatch(getTask(params));
      // debugger;
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async ({ task_id, project_id, updates }) => {
    try {
      const response = dispatch(
        updateTaskInDB({ task_id, project_id, updates })
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const postTask = async (project_id, formData) => {
    try {
      // post task
      await axios.post(`${BASE_URL}/projects/${project_id}/tasks`, formData, {
        withCredentials: true,
      });

      // update project to contain task
      const response = dispatch(getProject(project_id));

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getPageDetails = async ({ project_id, task_id }) => {
    try {
      const response = dispatch(getPage({ project_id, task_id }));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    axiosLogin,
    axiosSignup,
    axiosGetProjects,
    axiosGetProject,
    getTaskDetails,
    updateTask,
    postTask,
    getPageDetails,
  };
}
