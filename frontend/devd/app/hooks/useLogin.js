"use client";
import { useState } from "react";
import useAxios from "./useAxios";
import { useRouter } from "next/navigation";

const defaultFormData = {
  username: "",
  password: "",
};

export default function useLogin() {
  const [loginFormData, setLoginFormData] = useState(defaultFormData);
  const { axiosLogin } = useAxios();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // send login info
      await axiosLogin(loginFormData);

      // Reset form
      setLoginFormData(defaultFormData);

      // todo: redirect
      router.push("/projects");
    } catch (err) {
      console.log(err);
    }
  };

  return { loginFormData, setLoginFormData, handleLogin };
}
