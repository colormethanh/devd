"use client";
import { useState } from "react";
import useAxios from "./useAxios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const defaultFormData = {
  username: "",
  password: "",
};

export default function useLogin() {
  const [loginFormData, setLoginFormData] = useState(defaultFormData);
  const { dispatchLogin } = useAxios();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      // send login info
      const response = await dispatchLogin(loginFormData);
      debugger;

      // Reset form
      setLoginFormData(defaultFormData);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/projects");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { loginFormData, setLoginFormData, handleLogin };
}
