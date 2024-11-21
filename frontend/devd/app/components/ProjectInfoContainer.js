import React from "react";
import useHelpers from "../hooks/useHelpers";
import Button from "./utilities/Button";
import Image from "next/image";
import Form from "./utilities/Form";

export default function ProjectInfoContainer({
  selectedProject,
  isAddProjectView,
  handlePostProject,
  formData,
  handleInputChange,
  handleGoToProjectEdit,
  handleOpenModal,
  handleGoToProjectShowcase,
}) {
  const { formatDate } = useHelpers();
  return (
    <div className="h-full w-1/2 p-3">
      <h3 className="text-start text-lg font-bold mb-1"> Project </h3>
      {/* Project info */}
      <div className="border border-gray-500 h-5/6 p-3 overflow-auto">
        {isAddProjectView && (
          <>
            {" "}
            <Form title={"add A Project"} onSubmit={handlePostProject}>
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
          </>
        )}
        {selectedProject !== undefined && !isAddProjectView && (
          <>
            <h1 className="text-xl font-bold underline m-3">
              {" "}
              {selectedProject.project.name}{" "}
            </h1>
            <div className="border border-gray-500 text-start p-3 h-20 overflow-auto my-3">
              {selectedProject.project.description}
            </div>
            <p className="text-start my-1">
              {" "}
              Created At: {formatDate(
                selectedProject.project.date_created
              )}{" "}
            </p>
            <p className="text-start my-1">
              {" "}
              Tasks: {selectedProject.project.tasks.length}{" "}
            </p>
            <p className="text-start my-1">
              {" "}
              Pages: {selectedProject.project.pages.length}{" "}
            </p>
            <p className="text-start my-1">
              {" "}
              Component: {selectedProject.project.components.length}{" "}
            </p>
            <div className="w-full h-8 flex gap-4 justify-end my-3">
              <Button
                clickCallback={handleGoToProjectShowcase}
                addStyle="py-0 px-0 text-sm"
              >
                {" "}
                Project Showcase{" "}
              </Button>
              <Button
                clickCallback={handleGoToProjectEdit}
                addStyle="py-0 px-0 text-sm"
              >
                {" "}
                Edit Project{" "}
              </Button>
              <div
                className="w-10 p-1 h-full border border-red-400 hover:border-red-700 flex justify-center hover:cursor-pointer"
                onClick={handleOpenModal}
              >
                {" "}
                <Image
                  src={"/static/trashIcon-white.png"}
                  height={30}
                  width={22}
                  alt="delete project icon"
                />{" "}
              </div>
            </div>
          </>
        )}

        {selectedProject === undefined && !isAddProjectView && (
          <>
            <div className="w-full h-full flex justify-center items-center">
              {" "}
              <h1 className="text-2xl">
                {" "}
                ⬅️ Select a project from the left to view it's details{" "}
              </h1>{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
