import React, { useState } from "react";
import Form from "./utilities/Form";

const initialFormData = {
  name: "",
  description: "",
};

export default function AddTaskPanel({
  setIsAddTaskView,
  project,
  postNewTask,
  error,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTaskFormSubmit = async () => {
    await postNewTask(project._id, formData);
    debugger;
    if (error) return;
    setIsAddTaskView(false);
  };

  return (
    <div className="border-l border-white h-full w-full flex flex-row justify-center">
      <div className="w-3/4 flex flex-col justify-center">
        <Form title={"Create a task"} onSubmit={handleTaskFormSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData["name"]}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              className="bg-black w-full border border-gray-500 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
              id="description"
              name="description"
              required
              onChange={handleInputChange}
              rows={"3"}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
