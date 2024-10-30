"use client";
import { useState } from "react";
import axios from "axios";
import useAxios from "./useAxios";

const defaultFormData = {
  username: "",
  password: "",
};

export default function useLogin() {
  const [loginFormData, setLoginFormData] = useState(defaultFormData);
  const { axiosLogin } = useAxios();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Form: ");
      console.log(loginFormData);

      // send login info
      const response = await axiosLogin(loginFormData);
      // set response as cookie
      console.log("Login success!");
      console.log("setting tokens...");
      console.log(response.data.payload);

      localStorage.setItem("accessToken", response.data.payload.token);

      // Reset form
      setLoginFormData(defaultFormData);

      // redirect

      // testing refresh token
      // const response2 = await axios.post(
      //   "http://localhost:3000/auth/refresh-token",
      //   {},
      //   { withCredentials: true }
      // );
      // console.log(response2);
    } catch (err) {
      console.log(err);
    }
  };

  return { loginFormData, setLoginFormData, handleLogin };
}
