"use client";
import { useState } from "react";
import useAxios from "./useAxios";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
  username: "",
  password: "",
  password2: "",
};

export default function useSignup() {
  const [signupFormData, setSignupFormData] = useState(defaultFormData);
  const { dispatchSignup } = useAxios();
  const router = useRouter();

  const handleSignup = async (onSuccessCallback) => {
    try {
      // Check passwords match
      if (!setSignupFormData.password === setSignupFormData.password2)
        throw Error("passwords don't match");

      // send login info
      const response = await dispatchSignup(signupFormData);

      if (response.meta?.requestStatus === "fulfilled") {
        setSignupFormData(defaultFormData);
        onSuccessCallback();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { signupFormData, setSignupFormData, handleSignup };
}
