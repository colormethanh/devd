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

export default function ProjectShowcase({ params }) {
  const { projectName } = React.use(params);
  const {
    project,
    updateProjectDetails,
    addNewPage,
    handlePageUpdate,
    handleDeletePageImage,
  } = useShowcase(projectName);
  const { needsLogin } = useAuth();

  return (
    <div className="w-full h-[90%] p-3 overflow-auto ">
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
        />

        {/* Component Section */}
        {project.components !== undefined && (
          <div className="mb-3">
            <h2 className="text-4xl">Components</h2>
            <HorizontalDivider />
            {/* Components List */}
            {project.components.map((component) => (
              <ShowcaseComponentItem
                key={`component-${component._id}`}
                component={component}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
