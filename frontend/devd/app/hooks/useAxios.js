import { useDispatch } from "react-redux";
import { signup, login } from "../store/slices/authSlice";

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

  return { axiosLogin, axiosSignup };
}
