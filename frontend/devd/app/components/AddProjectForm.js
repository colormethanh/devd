import React from "react";
import Form from "./utilities/Form";

export default function AddProjectForm({
  handleSubmit,
  formData,
  handleInputChange,
  handleCancel,
}) {
  return (
    <Form
      title={"Add A Project"}
      onSubmit={handleSubmit}
      submitText={"Post Project"}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm text-start font-medium text-gray-300"
        >
          Project name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData["name"]}
          onChange={handleInputChange}
          required
          autoComplete="username"
          className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm text-start font-medium text-gray-300"
        >
          Description
        </label>
        <textarea
          className="w-full border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
          name="description"
          rows={"3"}
          value={formData["description"]}
          onChange={handleInputChange}
        />
      </div>
    </Form>
  );
}
