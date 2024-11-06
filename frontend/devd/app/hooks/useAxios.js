import { useDispatch } from "react-redux";
import { signup, login } from "../store/slices/authSlice";
import { getProject, getTask } from "../store/slices/projectSlice";
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

  const getTaskDetails = async (task_id) => {
    try {
      const response = await dispatch(getTask(task_id));
      // debugger;
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
  };
}
