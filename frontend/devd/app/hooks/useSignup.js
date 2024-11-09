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
  const { signup } = useAxios();
  const router = useRouter();

  const handleSignup = async () => {
    try {
      console.log("Submitting Form: ");
      console.log(signupFormData);

      // Check passwords match
      if (!setSignupFormData.password === setSignupFormData.password2)
        throw Error("passwords don't match");

      // send login info
      const response = await signup(signupFormData);
      // set response as cookie
      console.log("signup success!");

      // Reset form
      setSignupFormData(defaultFormData);

      // redirect
      router.push("/projects");
    } catch (err) {
      console.log(err);
    }
  };

  return { signupFormData, setSignupFormData, handleSignup };
}
