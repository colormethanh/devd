"use client";
import React, { useState } from "react";
import axios from "axios";

const defaultFormData = {
  username: "",
  password: "",
};

export default function useLogin() {
  const [loginFormData, setLoginFormData] = useState(defaultFormData);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Submitting Form: ");
    console.log(loginFormData);

    // send login info
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      loginFormData
    );
    // set response as cookie
    console.log("Login success!");
    console.log("setting tokens...");
    console.log(response.data.payload);

    // Reset form
    setLoginFormData(defaultFormData);

    // redirect
  };

  return { loginFormData, setLoginFormData, handleLogin };
}
