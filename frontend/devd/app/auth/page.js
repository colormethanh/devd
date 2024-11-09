"use client";
import LoginForm from "../components/LoginForm";
import useLogin from "../hooks/useLogin";

export default function AuthPage() {
  const { loginFormData, setLoginFormData, handleLogin } = useLogin();

  return (
    <div className="p-1 w-full flex justify-center">
      <LoginForm
        formData={loginFormData}
        setFormData={setLoginFormData}
        handleSubmit={handleLogin}
      />
    </div>
  );
}
