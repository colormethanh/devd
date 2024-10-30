"use client";
import { useState } from "react";
import useAxios from "./useAxios";

const defaultFormData = {
  email: "",
  username: "",
  password: "",
  password2: "",
};

export default function useSignup() {
  const [signupFormData, setSignupFormData] = useState(defaultFormData);
  const { axiosSignup } = useAxios();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Form: ");
      console.log(signupFormData);

      // Check passwords match
      if (!setSignupFormData.password === setSignupFormData.password2)
        throw Error("passwords don't match");

      debugger;
      // send login info
      const response = await axiosSignup(signupFormData);
      // set response as cookie
      debugger;
      console.log("signup success!");
      console.log(response.data.payload);

      // Reset form
      setSignupFormData(defaultFormData);

      // redirect
    } catch (err) {
      console.log(err);
    }
  };

  return { signupFormData, setSignupFormData, handleSignup };
}
