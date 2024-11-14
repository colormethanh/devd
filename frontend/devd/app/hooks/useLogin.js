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
      await dispatchLogin(loginFormData);

      if (auth.needs_login === true) {
        setLoginFormData(defaultFormData);
        return;
      }

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
