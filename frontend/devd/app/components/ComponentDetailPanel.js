import React, { useEffect, useState, useRef } from "react";
import DescriptionContainer from "./DescriptionContainer";
import useHelpers from "../hooks/useHelpers";
import useModal from "../hooks/useModal";
import DetailPanel from "./utilities/DetailPanel";
import ImageForm from "./ImageForm";
import HorizontalImagesSlider from "./utilities/HorizontalImagesSlider";
import DeleteWarning from "./DeleteWarning";
import CodeSnippetContainer from "./CodeSnippetContainer";

export default function ComponentDetailPanel({
  component,
  updateComponentVisibility,
  addComponentImage,
  updateComponentDescription,
  updateComponentStatus,
  updateComponentSnippet,
  deleteComponent,
  deleteImage,
}) {
  const { formatDate } = useHelpers();
  const [description, setDescription] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("private");
  const [selectedStatus, setSelectedStatus] = useState("backlog");
  const detailsContainerRef = useRef();

  const handleVisibilityChange = (e) => {
    updateComponentVisibility(component, e.target.value);
  };

  const handleDescriptionUpdate = (updatedDescription) => {
    updateComponentDescription(component, updatedDescription);
  };

  const handleSnippetUpdate = (updatedSnipper) => {
    updateComponentSnippet(component, updatedSnipper);
  };

  const handleStatusChange = (e) => {
    updateComponentStatus(component, e.target.value);
  };

  const handleDeleteImage = (image) => {
    deleteImage(component, image);
  };

  // Setting up modal for image upload
  const handleImageUpload = (name, image) => {
    addComponentImage(component, image, name);
    closeModal();
  };
  const modalBody = <ImageForm handleSubmit={handleImageUpload} />;
  const { Modal, openModal, closeModal } = useModal("Add an image", modalBody);

  // Setting up modal for page deletion
  const handleDeleteCancel = () => closeDeleteModal();
  const handleDelete = () => {
    deleteComponent(component);
    closeDeleteModal();
  };
  const deleteModalBody = (
    <DeleteWarning
      item={component}
      handleCancel={handleDeleteCancel}
      onDelete={handleDelete}
    />
  );
  const {
    Modal: DeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal("Delete task", deleteModalBody);

  useEffect(() => {
    setSelectedVisibility(component.visibility);
    setDescription(component.description);
    setSelectedStatus(component.status);
  }, [component]);

  return (
    <DetailPanel detailsContainerRef={detailsContainerRef}>
      {/* Title and info bar */}
      <div className="w-full flex flex-col">
        <h1 className="text-4xl"> {component.name} </h1>
        <hr className="my-2 "></hr>

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

          {/* Component status */}
          <div className="mr-3 ">
            <select
              id="status"
              name="status"
              className="block w-full border border-black hover:border-white py-1.5 bg-black text-white focus:outline-none focus:ring-0 focus:ring-inset focus:ring-gray-500 sm:max-w-xs text-xs hover:cursor-pointer"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value={"backlog"}>Backlog</option>
              <option value={"inProgress"}>In progress</option>
              <option value={"done"}>Done</option>
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

          <div className="border-l border-white mr-3"></div>

          {/* Delete Component */}
          <div
            onClick={openDeleteModal}
            className="mr-3 text-xs flex items-center border border-black py-1 px-2 hover:cursor-pointer hover:border-red-500"
          >
            Delete Component
          </div>
        </div>
      </div>

      {/* Description */}
      <DescriptionContainer
        description={description}
        classString={"max-h-1/3 mt-3"}
        updateCallback={handleDescriptionUpdate}
      />

      <div className="border-b border-gray-500 mr-3 w-full"></div>

      {/* Code Snippet */}
      <CodeSnippetContainer
        snippet={component.snippet}
        handleSnippetUpdate={handleSnippetUpdate}
      />

      {/* Container for horizontal image scrolls */}
      <div className="flex flex-col">
        <h4 className="text-xl font-bold underline mb-2"> Images </h4>
        <p className="text-gray-500"> Double Click images to view them! </p>
        <HorizontalImagesSlider
          outerContainerRef={detailsContainerRef}
          images={component.images}
          handleImageDelete={handleDeleteImage}
        />
      </div>

      {Modal}
      {DeleteModal}
    </DetailPanel>
  );
}
