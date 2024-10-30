"use client";
import React from "react";
import SignupForm from "../../components/SignupForm";
import useSignup from "../../hooks/useSignup";

export default function AuthPage() {
  const { signupFormData, setSignupFormData, handleSignup } = useSignup();

  return (
    <div className="p-1">
      <SignupForm
        formData={signupFormData}
        setFormData={setSignupFormData}
        handleSubmit={handleSignup}
      />
    </div>
  );
}
