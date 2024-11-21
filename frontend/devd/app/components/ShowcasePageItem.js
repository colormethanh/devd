import React from "react";
import Image from "next/image";
import VerticalDivider from "./utilities/VerticalDivider";

export default function ShowcasePageItem({ page }) {
  return (
    <div className="w-full my-3 flex">
      {/* Page Image */}
      <div className="w-[60%] flex justify-center p-5">
        <div>
          <Image
            src={
              page.images !== undefined
                ? page.images[0].url
                : "/static/loadingIcon-white.png"
            }
            width={1000}
            height={300}
            alt={"page picture"}
          />
        </div>
      </div>
      <VerticalDivider />
      {/* Page details */}
      <div className="w-[40%] p-3 flex flex-col gap-3">
        <h1 className="text-6xl"> {page.name} </h1>
        <p className="text-xl italic"> {page.description} </p>

        <ul className="list-disc list-inside">
          <h3 className="text-4xl"> Features </h3>
          {page.features !== undefined &&
            page.features.map((feature, i) => (
              <li key={`${page._id}-feature-${i}}`}> {feature} </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
