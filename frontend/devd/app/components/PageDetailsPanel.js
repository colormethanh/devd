import React, { useState, useEffect, useRef } from "react";
import useHelpers from "../hooks/useHelpers";
import DescriptionContainer from "./DescriptionContainer";
import HorizontalImagesSlider from "./utilities/HorizontalImagesSlider";

export default function PageDetailsPanel({
  page,
  updatePageVisibility,
  updatePageDescription,
}) {
  const { formatDate } = useHelpers();

  const [description, setDescription] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("private");

  const detailsContainerRef = useRef(null);

  const handleVisibilityChange = (e) => {
    updatePageVisibility(page, e.target.value);
    console.log("changing page visibility");
  };

  const handleDescriptionUpdate = (updatedDescription) => {
    updatePageDescription(page, updatedDescription);
  };

  useEffect(() => {
    console.log(page);
    setSelectedVisibility(page.visibility);
    setDescription(page.description);
  }, [page]);
  return (
    <div className="border-l h-full w-full flex">
      <div
        ref={detailsContainerRef}
        className="mx-3 h-full w-full flex flex-col gap-y-12 overflow-y-auto overflow-x-hidden no-scrollbar"
      >
        <div className="w-full flex flex-col">
          <h1 className="text-4xl"> {page.name} </h1>
          <hr className="my-2 "></hr>

          {/* container for info bar under page name */}
          <div className="flex flex-col w-1/2 sm:flex-row sm:w-full">
            {/* Posted date */}
            <div className="mr-3">
              <div className="flex flex-col sm:flex-row">
                <span className="text-s">
                  {" "}
                  Created: {formatDate(page.date_created)}{" "}
                </span>
              </div>
            </div>

            <div className="border-l border-white mr-3"></div>

            {/* Page visibility */}
            <div className="mr-3 ">
              <select
                id="status"
                name="status"
                className="block w-full border border-black hover:border-white py-1.5 bg-black text-white focus:outline-none focus:ring-0 focus:ring-inset focus:ring-gray-500 sm:max-w-xs text-xs hover:cursor-pointer"
                value={selectedVisibility}
                onChange={handleVisibilityChange}
              >
                <option value={"private"}>Private</option>
                <option value={"public"}>Public</option>
              </select>
            </div>
          </div>
        </div>

        <DescriptionContainer
          description={description}
          classString={"max-h-1/3 mt-3"}
          updateCallback={handleDescriptionUpdate}
        />

        <div className="flex flex-col">
          <h4 className="text-xl"> Images </h4>
          <div className="h-8 border"> Options bar </div>

          {/* Page Images, should open a modal on click */}
          <div className="w-full h-full">
            <HorizontalImagesSlider
              outerContainerRef={detailsContainerRef}
              images={page.images}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
