"use client";
import React from "react";
import useShowcase from "@/app/hooks/useShowcase";
import Image from "next/image";
import ShowcasePageItem from "@/app/components/ShowcasePageItem";
import HorizontalDivider from "@/app/components/utilities/HorizontalDivider";
import ShowcaseComponentItem from "@/app/components/ShowcaseComponentItem";

export default function ProjectShowcase({ params }) {
  const { projectName } = React.use(params);
  const { project } = useShowcase(projectName);

  return (
    <div className="w-full h-[90%] p-3 overflow-auto ">
      <div className="w-full flex flex-col gap-6">
        {/* Title container */}
        <div className=" w-full flex flex-col justify-center items-center">
          <div>
            <h1 className="text-8xl mb-2">{project.name}</h1>
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
            <p className="italic text-xl"> {project.description} </p>
          </div>
        </div>

        {/* Pages Section*/}
        <div className="w-full">
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
