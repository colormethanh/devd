"use client";
import React from "react";
import Form from "./utilities/Form";
import { useRouter } from "next/navigation";

export default function LoginForm({
  formData,
  setFormData,
  handleSubmit,
  error,
}) {
  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="w-1/2">
      <Form
        onSubmit={handleSubmit}
        title={"Sign In"}
        error={error?.status === 401 ? error.response_message : false}
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData["username"]}
            onChange={handleInputChange}
            required
            autoComplete="username"
            className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData["password"]}
            onChange={handleInputChange}
            autoComplete="current-password"
            required
            className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
      </Form>
    </div>
  );
}
