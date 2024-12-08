import React, { useEffect, useState } from "react";
import HorizontalDivider from "./utilities/HorizontalDivider";
import ShowcaseComponentItem from "./ShowcaseComponentItem";
import Image from "next/image";
import useModal from "../hooks/useModal";
import Form from "./utilities/Form";

export default function ShowcaseComponentsContainer({
  project,
  needsLogin,
  postNewComponent,
  updateComponent,
}) {
  const [components, setComponents] = useState([]);
  const [componentFormData, setComponentFormData] = useState({
    name: "",
    description: "",
    snippet: "",
    pages: [],
    visibility: "public",
  });

  const handleFormInputChange = (inputName, value) => {
    setComponentFormData((prev) => ({
      ...componentFormData,
      [inputName]: value,
    }));
  };

  const handlePostNewComponent = () => {
    postNewComponent(componentFormData);
    closeModal();
  };

  const {
    Modal: AddComponentModal,
    closeModal,
    openModal,
  } = useModal(
    "Add a new component",
    <div className="w-[75vw] md:w-[50vw]">
      <Form title={""} onSubmit={handlePostNewComponent}>
        <div>
          <label
            htmlFor="component-name"
            className="block text-sm font-medium text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="page-name"
            name="page-name"
            value={componentFormData["name"]}
            onChange={(e) => handleFormInputChange("name", e.target.value)}
            required
            className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div>
          <label
            htmlFor="component-description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            className="bg-black w-full border border-gray-500 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
            id="component-description"
            name="description"
            onChange={(e) => {
              handleFormInputChange("description", e.target.value);
            }}
            required
            value={componentFormData["description"]}
            rows={"3"}
          />
        </div>
        <div>
          <label
            htmlFor="component-snippet"
            className="block text-sm font-medium text-gray-300"
          >
            Code Snippet
          </label>
          <textarea
            className="bg-black w-full border border-gray-500 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
            id="component-snippet"
            name="description"
            onChange={(e) => {
              handleFormInputChange("snippet", e.target.value);
            }}
            required
            value={componentFormData["snippet"]}
            rows={"3"}
          />
        </div>
      </Form>
    </div>
  );

  useEffect(() => {
    setComponents(project.components);
  }, [project]);

  return (
    <div className="mb-3">
      <div className="w-full flex justify-between mb-1">
        <h2 className="text-4xl">Components</h2>
        {!needsLogin && (
          <div
            className="flex items-center text-xs hover:bg-gray-500 rounded-lg hover:cursor-pointer h-1/2 p-1"
            onClick={openModal}
          >
            <Image
              src={"/static/plusIcon-green.png"}
              width={15}
              height={15}
              alt="add-pages-icon"
              className="w-[2rem] h-[2rem] p-2"
            />
            Add a new component
          </div>
        )}
      </div>
      <HorizontalDivider />
      {/* Components List */}
      {components?.map((component) => (
        <ShowcaseComponentItem
          key={`component-${component._id}`}
          component={component}
          needsLogin={needsLogin}
          updateComponent={updateComponent}
        />
      ))}
      {AddComponentModal}
    </div>
  );
}
