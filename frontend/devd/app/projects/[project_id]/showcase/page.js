"use client";
import React from "react";
import useShowcase from "@/app/hooks/useShowcase";
import Image from "next/image";
import ShowcasePageItem from "@/app/components/ShowcasePageItem";
import HorizontalDivider from "@/app/components/utilities/HorizontalDivider";
import VerticalDivider from "@/app/components/utilities/VerticalDivider";
import ShowcaseComponentItem from "@/app/components/ShowcaseComponentItem";

export default function ProjectShowcase({ params }) {
  const { project_id } = React.use(params);
  const { project } = useShowcase(project_id);

  console.log(project);
  return (
    <div className="w-full h-[90%] p-3 overflow-auto">
      <div className="w-full">
        {/* Title container */}
        <div className="h-32 w-full flex flex-col justify-center items-center">
          <h1 className="text-6xl mb-3">
            {project !== undefined && project.name}
          </h1>
          <p> By: {project.owner !== undefined && project.owner.username} </p>
        </div>

        {/* Pages Section*/}
        <div className="mb-3 w-full">
          <h2 className="text-4xl mb-1"> Pages </h2>

          <HorizontalDivider />

          {/* Pages list*/}
          {project.pages !== undefined &&
            project.pages.map((page) => (
              <ShowcasePageItem key={`page-${page._id}`} page={page} />
            ))}
        </div>

        {/* Component Section */}
        {project.components !== undefined && (
          <div className="mb-3">
            <h2 className="text-4xl">Components</h2>
            <HorizontalDivider />
            {project.components.map((component) => (
              <ShowcaseComponentItem component={component} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
