import axios from "axios";
import { useDispatch } from "react-redux";
import { signup } from "../store/slices/authSlice";

export default function useAxios() {
  const dispatch = useDispatch();

  const axiosLogin = async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      formData,
      { withCredentials: true }
    );

    return response;
  };

  const axiosSignup = async (formData) => {
    dispatch(signup(formData));

    // const response = await axios.post(
    //   "http://localhost:3000/auth/signup",
    //   formData,
    //   { withCredentials: true }
    // );
    return response;
  };

  return { axiosLogin, axiosSignup };
}
