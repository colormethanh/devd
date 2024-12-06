import React, { useEffect, useState, useRef } from "react";
import HorizontalDivider from "./utilities/HorizontalDivider";
import ShowcasePageItem from "./ShowcasePageItem";
import Image from "next/image";
import useModal from "../hooks/useModal";
import Form from "./utilities/Form";

export default function ShowcasePagesContainer({ project, addNewPage }) {
  const [pages, setPages] = useState();
  const [pageFormData, setPageFormData] = useState({
    name: "",
    description: "",
    visibility: "public",
  });

  const descriptionTextInputRef = useRef(null);
  const nameTextInputRef = useRef(null);

  const handleFormInputChange = (inputName, value) => {
    setPageFormData((prev) => ({ ...pageFormData, [inputName]: value }));
  };

  const { Modal, closeModal, openModal } = useModal(
    "Add a new page",
    <Form
      title={""}
      onSubmit={() => {
        addNewPage(pageFormData);
        closeModal();
      }}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
          Name
        </label>
        <input
          ref={nameTextInputRef}
          type="text"
          id="name"
          name="name"
          value={pageFormData["name"]}
          onChange={() =>
            handleFormInputChange("name", nameTextInputRef?.current?.value)
          }
          required={true}
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
          ref={descriptionTextInputRef}
          className="bg-black w-full border border-gray-500 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
          id="description"
          name="description"
          onChange={() => {
            handleFormInputChange(
              "description",
              descriptionTextInputRef?.current?.value
            );
          }}
          required={true}
          value={pageFormData["description"]}
          rows={"3"}
        />
      </div>
    </Form>
  );

  useEffect(() => {
    setPages(project.pages);
  }, [project]);

  return (
    <div className="relative w-full">
      <div className="w-full flex justify-between">
        <h2 className="text-4xl mb-1"> Pages </h2>
        <Image
          src={"/static/plusIcon-green.png"}
          width={15}
          height={15}
          alt="add-pages-icon"
          className="w-7 h-7 hover:bg-gray-500 p-1 m-1 rounded-lg hover:cursor-pointer"
          onClick={openModal}
        />
      </div>
      <HorizontalDivider />
      {/* Pages list*/}
      {project.pages !== undefined &&
        project.pages.map((page) => (
          <ShowcasePageItem key={`page-${page._id}`} page={page} />
        ))}
      {Modal}
    </div>
  );
}
