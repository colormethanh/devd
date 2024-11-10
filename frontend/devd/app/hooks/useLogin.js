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
  const { dispatchLogin } = useAxios();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // send login info
      await dispatchLogin(loginFormData);

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
