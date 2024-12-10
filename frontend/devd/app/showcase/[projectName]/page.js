"use client";
import React from "react";
import useShowcase from "@/app/hooks/useShowcase";
import Image from "next/image";
import ShowcasePageItem from "@/app/components/ShowcasePageItem";
import HorizontalDivider from "@/app/components/utilities/HorizontalDivider";
import ShowcaseComponentItem from "@/app/components/ShowcaseComponentItem";
import useAuth from "@/app/hooks/useAuth";
import ShowcaseProjectInfoContainer from "@/app/components/ShowcaseProjectInfoContainer";
import ShowcasePagesContainer from "@/app/components/ShowcasePagesContainer";
import ShowcaseComponentsContainer from "@/app/components/ShowcaseComponentsContainer";

export default function ProjectShowcase({ params }) {
  const { projectName } = React.use(params);
  const {
    project,
    updateProjectDetails,
    addNewPage,
    handlePageUpdate,
    handleDeletePageImage,
    postNewPageImage,
    postNewComponent,
    handleComponentUpdate,
    handleDeleteComponentImage,
    postNewComponentImage,
  } = useShowcase(projectName);
  const { needsLogin } = useAuth();

  return (
    <div className="w-full h-[90vh] p-3 overflow-auto ">
      <div className="w-full flex flex-col gap-6">
        <ShowcaseProjectInfoContainer
          project={project}
          needsLogin={needsLogin}
          updateProjectDetails={updateProjectDetails}
        />

        <ShowcasePagesContainer
          project={project}
          addNewPage={addNewPage}
          updatePage={handlePageUpdate}
          handleDeletePageImage={handleDeletePageImage}
          postNewPageImage={postNewPageImage}
          needsLogin={needsLogin}
        />

        {/* Component Section */}
        <ShowcaseComponentsContainer
          project={project}
          needsLogin={needsLogin}
          postNewComponent={postNewComponent}
          updateComponent={handleComponentUpdate}
          handleDeleteComponentImage={handleDeleteComponentImage}
          postNewComponentImage={postNewComponentImage}
        />
      </div>
    </div>
  );
}
