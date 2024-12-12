import React from "react";
import Image from "next/image";

export default function ShowcasePortfolioItem({ project }) {
  return (
    <div
      className="w-full 
                md:w-[45%] h-[60vh] 
                rounded lg
                mb-4 lg:mb-0
                "
    >
      <div className="w-full h-2/3 flex items-center justify-center py-3 ">
        <div className="w-full h-full flex justify-center rounded-lg border border-gray-500">
          <Image
            className="h-auto w-full rounded-lg"
            src={"/static/imagePlaceholder.png"}
            height={1080}
            width={1920}
            alt={"project-image"}
          />
        </div>
      </div>
      <div className="text-lg mt-4 mb-2">{project.project_id.name}</div>
      <div className="text-gray-400"> {project.project_id.description} </div>
    </div>
  );
}
