import { useDispatch } from "react-redux";
import { signup, login } from "../store/slices/authSlice";
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
      console.log(BASE_URL);
      const response = await axios.get(`${BASE_URL}/projects`);
      return response.data.payload;
    } catch (err) {
      console.error(err);
    }

    // todo: check if user is authorized
  };

  return { axiosLogin, axiosSignup, axiosGetProjects };
}
