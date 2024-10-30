"use client";
import { useState } from "react";
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
      debugger;

      // set response as cookie
      console.log("Login success!");
      console.log("setting tokens...");
      console.log(response.payload);

      localStorage.setItem("accessToken", response.payload.accessToken);

      // Reset form
      setLoginFormData(defaultFormData);

      // todo: redirect
    } catch (err) {
      console.log(err);
    }
  };

  return { loginFormData, setLoginFormData, handleLogin };
}
