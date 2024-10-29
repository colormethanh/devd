"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import useLogin from "../hooks/useLogin";

export default function AuthPage() {
  const { loginFormData, setLoginFormData, handleLogin } = useLogin();

  return (
    <div className="p-1">
      <LoginForm
        formData={loginFormData}
        setFormData={setLoginFormData}
        handleSubmit={handleLogin}
      />
    </div>
  );
}
