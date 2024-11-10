import React, { useState, useEffect, useRef } from "react";
import useHelpers from "../hooks/useHelpers";
import DescriptionContainer from "./DescriptionContainer";
import HorizontalImagesSlider from "./utilities/HorizontalImagesSlider";
import Image from "next/image";
import ListContainer from "./utilities/ListContainer";

export default function PageDetailsPanel({
  page,
  updatePageVisibility,
  updatePageDescription,
  addPageImage,
  addPageFeature,
}) {
  const { formatDate } = useHelpers();

  const [description, setDescription] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("private");
  const detailsContainerRef = useRef(null);
  const imageFileUploaderRef = useRef(null);

  const handleVisibilityChange = (e) => {
    updatePageVisibility(page, e.target.value);
  };

  const handleDescriptionUpdate = (updatedDescription) => {
    updatePageDescription(page, updatedDescription);
  };

  const handleImageUploaderClick = (e) => {
    if (imageFileUploaderRef.current) imageFileUploaderRef.current.click();
  };

  const handleImageUpload = (e) => {
    console.log("Handling image upload");
    console.log(e.target.files[0]);
    addPageImage(page, e.target.files[0], e.target.files[0].name);
  };

  const handleAddFeature = (featureText) => {
    console.log("handling feature add");
    console.log(featureText);
    addPageFeature(page, featureText);
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
          <div className="flex flex-col gap-2 sm:flex-row w-full">
            {/* Posted date */}
            <div className="">
              <div className="flex flex-col sm:flex-row">
                <span className="text-s">
                  {" "}
                  Created: {formatDate(page.date_created)}{" "}
                </span>
              </div>
            </div>

            <div className="border-l border-b sm:border-b-0 border-white"></div>

            {/* Page visibility */}
            <div className="">
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

            <div className="border-l border-b sm:border-b-0 border-white"></div>

            {/* Upload image */}
            <div
              className={
                "flex text-sm border border-black hover:border-white hover:cursor-pointer p-1 p-y-2"
              }
              onClick={handleImageUploaderClick}
            >
              Upload an image
              <input
                ref={imageFileUploaderRef}
                type="file"
                id="image"
                name="task-image"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        <DescriptionContainer
          description={description}
          classString={"max-h-1/3 mt-3"}
          updateCallback={handleDescriptionUpdate}
        />

        {/* Features container */}
        <ListContainer
          addStyles={"max-h-20"}
          title={"Features"}
          items={page.features}
          addItem={handleAddFeature}
        />

        {/* Container for horizontal image scrolls */}
        <div className="flex flex-col">
          <h4 className="text-xl"> Images </h4>
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
