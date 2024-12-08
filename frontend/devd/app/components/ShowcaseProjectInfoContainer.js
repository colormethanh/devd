import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useModal from "../hooks/useModal";
import useProject from "../hooks/useProject";
import Form from "./utilities/Form";

export default function ShowcaseProjectInfoContainer({
  project,
  needsLogin,
  updateProjectDetails,
}) {
  const [projectDetails, setProjectDetails] = useState({
    description: "",
    url: "",
  });

  const descriptionRef = useRef(null);
  const urlRef = useRef(null);

  const handleDetailsChange = (detail, value) => {
    setProjectDetails((prev) => ({ ...prev, [detail]: value }));
  };

  const handleProjectDetailsUpdate = () => {
    updateProjectDetails(projectDetails);
    closeModal();
  };

  // Modal for updating project details
  const { Modal, openModal, closeModal } = useModal(
    "Update Project Data",
    <div className=" sm:w-[40vw]">
      <Form onSubmit={handleProjectDetailsUpdate}>
        <div className="flex flex-col text-gray-300">
          <label htmlFor="project-description"> Description: </label>
          <textarea
            ref={descriptionRef}
            className="border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none p-2"
            name="text-textarea"
            id="project-descriptions"
            rows={3}
            defaultValue={projectDetails.description}
            onChange={() =>
              handleDetailsChange("description", descriptionRef?.current.value)
            }
          />
        </div>
        <div className="flex flex-col text-gray-300">
          <label htmlFor="project-url"> URL: </label>
          <input
            type="text"
            ref={urlRef}
            className="w-full border border-white text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none px-3  text-lg"
            name="description-textarea"
            defaultValue={projectDetails["url"]}
            id={"project-url"}
            onChange={() => handleDetailsChange("url", urlRef?.current.value)}
          />
        </div>
      </Form>
    </div>
  );

  useEffect(() => {
    setProjectDetails({
      description: project.description,
      url: project.url,
    });
  }, [project]);

  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <div>
        <h1 className="text-5xl lg:text-8xl mb-2">{project.name}</h1>
        {!needsLogin && (
          <Image
            src={"/static/pencilIcon.png"}
            width={30}
            height={30}
            alt="Modify project data Icon"
            className="absolute right-1 top-0 hover:cursor-pointer hover:bg-gray-500 p-1 rounded-lg"
            onClick={openModal}
          />
        )}
        <div className=" flex gap-4 text-gray-500 justify-center">
          <div className="flex">
            <Image
              src={"/static/userIcon-white.png"}
              width={25}
              height={20}
              alt="user Icon"
              className="mr-1 opacity-60 "
            />
            {project.owner !== undefined && project.owner.username}{" "}
          </div>
          <a href={`${project.url}`}>
            <div className="flex">
              <Image
                src={"/static/linkIcon-white.png"}
                width={25}
                height={20}
                alt="user Icon"
                className="mr-1 opacity-60 "
              />
              {`Visit ${project.name}`}{" "}
            </div>
          </a>
        </div>
      </div>
      <div className="w-full text-center mt-3">
        <p className="italic md:text-lg lg:text-xl"> {project.description} </p>
      </div>
      {Modal}
    </div>
  );
}
