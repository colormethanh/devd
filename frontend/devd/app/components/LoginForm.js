"use client";
import React from "react";
import Form from "./Form";

export default function LoginForm({ formData, setFormData, handleSubmit }) {
  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <Form onSubmit={handleSubmit} title={"Sign In"}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData["password"]}
          onChange={handleInputChange}
          required
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </Form>
  );
}
