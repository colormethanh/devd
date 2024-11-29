"use client";
import React, { useEffect } from "react";
import SignupForm from "../../components/SignupForm";
import useSignup from "../../hooks/useSignup";
import useModal from "@/app/hooks/useModal";
import Button from "@/app/components/utilities/Button";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signupFormData, setSignupFormData, handleSignup, error, isLoading } =
    useSignup();
  const router = useRouter();

  const { Modal, openModal } = useModal(
    "Sign up success!",
    <div className="mt-3 flex flex-col gap-4">
      <p> Your sign up was successful </p>
      <div className="">
        <Button
          addStyle="float-end py-0"
          clickCallback={() => router.push("/auth")}
        >
          {" "}
          Proceed to login{" "}
        </Button>
      </div>
    </div>
  );

  return (
    <div
      className={`p-1 w-full flex justify-center ${isLoading && "cursor-wait"}`}
    >
      <SignupForm
        formData={signupFormData}
        setFormData={setSignupFormData}
        handleSubmit={() => handleSignup(openModal)}
        error={error}
      />
      {Modal}
    </div>
  );
}
