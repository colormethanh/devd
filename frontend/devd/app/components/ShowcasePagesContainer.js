import React, { useEffect, useState, useRef } from "react";
import HorizontalDivider from "./utilities/HorizontalDivider";
import ShowcasePageItem from "./ShowcasePageItem";
import Image from "next/image";
import useModal from "../hooks/useModal";
import Form from "./utilities/Form";

export default function ShowcasePagesContainer({
  project,
  addNewPage,
  updatePage,
  handleDeletePageImage,
  postNewPageImage,
  needsLogin,
}) {
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

  const handleFormPost = () => {
    addNewPage(pageFormData);
    closeModal();
  };

  const { Modal, closeModal, openModal } = useModal(
    "Add a new page",
    <Form title={""} onSubmit={handleFormPost}>
      <div>
        <label
          htmlFor="page-name"
          className="block text-sm font-medium text-gray-300"
        >
          Name
        </label>
        <input
          ref={nameTextInputRef}
          type="text"
          id="page-name"
          name="page-name"
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
      <div className="flex-grow flex justify-between">
        <h2 className="text-3xl lg:text-4xl mb-1"> Pages </h2>
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
            Add a new page
          </div>
        )}
      </div>
      <HorizontalDivider />
      {/* Pages list*/}
      {project.pages !== undefined &&
        project.pages.map((page) => (
          <ShowcasePageItem
            key={`page-${page._id}`}
            page={page}
            updatePage={updatePage}
            handleDeletePageImage={handleDeletePageImage}
            postNewPageImage={postNewPageImage}
            needsLogin={needsLogin}
          />
        ))}
      {Modal}
    </div>
  );
}
