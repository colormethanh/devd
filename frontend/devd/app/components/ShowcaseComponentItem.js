import React from "react";
import VerticalDivider from "./utilities/VerticalDivider";
import HorizontalDivider from "./utilities/HorizontalDivider";
import Image from "next/image";

export default function ShowcaseComponentItem({ component }) {
  return (
    <div className="w-full my-3 flex">
      {/* Component Image */}
      <div className="w-[60%] flex justify-center p-5">
        <Image
          src={
            component.images !== undefined
              ? component.images[0].url
              : "/static/loadingIcon-white.png"
          }
          width={1000}
          height={300}
          alt={"component picture"}
        />
      </div>
      <VerticalDivider />
      {/* Component Details */}
      <div className="w-[40%] p-3 flex flex-col gap-3">
        <h1 className="text-6xl"> {component.name} </h1>
        <p className="text-xl italic"> {component.description} </p>
      </div>
    </div>
  );
}
