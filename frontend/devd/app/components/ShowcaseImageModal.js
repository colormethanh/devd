import React, { useEffect, useState } from "react";
import ShowcaseImageModalImageItem from "./ShowcaseImageModalImageItem";
import ImageForm from "./ImageForm";

export default function ShowcaseImageModal({
  images,
  handleDelete,
  handlePostNewImage,
}) {
  const [pageImages, setPageImages] = useState([]);

  useEffect(() => {
    setPageImages(images);
  });
  return (
    <div className=" w-[90vw] lg:w-[60vw] h-[60vh] overflow-auto p-4">
      <div className="">
        <h1 className="text-2xl underline"> Upload an image </h1>
        <ImageForm handleSubmit={handlePostNewImage} />
      </div>
      <div className="w-full border-b border-gray-500 mb-3"></div>
      <ul>
        <h1 className="text-2xl underline"> Images </h1>
        {pageImages.length >= 1 ? (
          pageImages.map((image) => {
            return (
              <ShowcaseImageModalImageItem
                key={image._id}
                image={image}
                handleDelete={handleDelete}
              />
            );
          })
        ) : (
          <p className="text-sm">
            {" "}
            😔 Looks like you haven't uploaded any images. Upload one now to
            view them here!{" "}
          </p>
        )}
      </ul>
    </div>
  );
}
