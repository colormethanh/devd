import React, { useEffect, useState } from "react";
import DescriptionContainer from "./DescriptionContainer";
import useHelpers from "../hooks/useHelpers";
import useModal from "../hooks/useModal";
import DetailPanel from "./utilities/DetailPanel";
import ImageForm from "./ImageForm";

export default function ComponentDetailPanel({
  component,
  updateComponentVisibility,
  addComponentImage,
}) {
  const { formatDate } = useHelpers();
  const [description, setDescription] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("private");

  const handleVisibilityChange = (e) => {
    updateComponentVisibility(component, e.target.value);
  };

  // Setting up modal for image upload
  const handleImageUpload = (name, image) => {
    addPageImage(page, image, name);
    closeModal();
  };
  const modalBody = <ImageForm handleSubmit={handleImageUpload} />;
  const { Modal, openModal, closeModal } = useModal("Add a task", modalBody);

  useEffect(() => {
    setSelectedVisibility(component.visibility);
    setDescription(component.description);
  }, [component]);

  return (
    <DetailPanel>
      <div className="w-full flex flex-col">
        <h1 className="text-4xl"> {component.name} </h1>
        <hr className="my-2 "></hr>

        {/* container for info bar */}
        <div className="flex flex-col w-1/2 sm:flex-row sm:w-full">
          {/* Posted date */}
          <div className="mr-3 ">
            <div className="flex flex-col sm:flex-row">
              <span className="text-s">
                {" "}
                Created: {formatDate(component.date_created)}{" "}
              </span>
            </div>
          </div>

          <div className="border-l border-white mr-3"></div>

          {/* Component visibility */}
          <div className="mr-3 ">
            <select
              id="status"
              name="status"
              className="block w-full border border-black hover:border-white py-1.5 bg-black text-white focus:outline-none focus:ring-0 focus:ring-inset focus:ring-gray-500 sm:max-w-xs text-xs hover:cursor-pointer"
              value={selectedVisibility}
              onChange={handleVisibilityChange}
            >
              <option value={"private"}>Private</option>
              <option value={"public"}>Public</option>
            </select>
          </div>

          <div className="border-l border-white mr-3"></div>

          {/* upload an image */}
          <div
            className={
              "flex text-sm border border-black hover:border-white hover:cursor-pointer p-1 p-y-2"
            }
            onClick={openModal}
          >
            Upload an image
          </div>
        </div>
        {Modal}
      </div>
    </DetailPanel>
  );
}
