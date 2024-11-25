import React, { useState } from "react";
import RelevantContentsItem from "./RelevantContentsItem";
import RelevantContentsForm from "./RelevantContentsForm";
import Dropdown from "./utilities/Dropdown";
import Image from "next/image";
import useModal from "../hooks/useModal";

export default function RelevantContentsContainer({
  projectContents,
  relevantContents,
  addContent,
  changeViewTo,
}) {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContents, setModalContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(undefined);
  const [selectedContentType, setSelectedContentType] = useState();

  // Modal for adding relevant content
  const handleRelevantContentSubmit = () => {
    addContent({
      content_id: selectedContent._id,
      content_type: selectedContentType,
      content_name: selectedContent.name,
    });
    closeModal();
  };

  const { Modal, openModal, closeModal } = useModal(
    modalTitle,
    <RelevantContentsForm
      contents={modalContents}
      setSelectedContent={setSelectedContent}
      handleSubmit={handleRelevantContentSubmit}
    />
  );

  const handleModalToggle = (title, contents) => {
    setModalTitle(title);
    setModalContents(contents);
    openModal();
  };

  const dropdownItems = [
    {
      text: "Add a component",
      callback: () => {
        setSelectedContentType("Component");
        handleModalToggle("Add a component", projectContents.components);
      },
    },
    {
      text: "Add a page",
      callback: () => {
        setSelectedContentType("Page");
        handleModalToggle("Add a page", projectContents.pages);
      },
    },
  ];

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex gap-4">
        <h5 className="text-xl font-bold"> Relevant contents </h5>
        <Dropdown toggleText={"..."} items={dropdownItems} addStyle={"px-2"} />
      </div>

      {/* Contents list */}
      <div
        className={`w-full border overflow-auto no-scrollbar transition-all`}
      >
        {relevantContents !== undefined && relevantContents.length !== 0 ? (
          relevantContents.map((content) => (
            <RelevantContentsItem
              key={`relevantContent-${content._id}`}
              content={content}
              changeViewTo={changeViewTo}
            />
          ))
        ) : (
          <div className="h-12 flex items-center p-2">
            <h1 className="text-md">
              {"😔 Oops, no relevant contents set up yet. Add one now!"}
            </h1>
          </div>
        )}
      </div>
      {Modal}
    </div>
  );
}
