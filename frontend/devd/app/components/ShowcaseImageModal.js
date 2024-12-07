import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import ShowcaseImageModalImageItem from "./ShowcaseImageModalImageItem";
import ImageForm from "./ImageForm";

export default function ShowcaseImageModal({
  images,
  handleDelete,
  handlePostNewImage,
}) {
  const [pageImages, setPageImages] = useState([]);

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    appendDots: (dots) => (
      <div style={{}}>
        <ul style={{ color: "white" }}> {dots} </ul>
      </div>
    ),
  };

  useEffect(() => {
    console.log(images);
    setPageImages(images);
  });
  return (
    <div className="w-[50vw] h-[60vh] overflow-auto p-4">
      <div className="">
        <h1 className="text-2xl underline"> Upload an image </h1>
        <ImageForm handleSubmit={handlePostNewImage} />
      </div>
      <div className="w-full border-b border-gray-500 mb-3"></div>
      <ul>
        <h1 className="text-2xl underline"> Images </h1>
        {pageImages.map((image) => {
          return (
            <ShowcaseImageModalImageItem
              key={image._id}
              image={image}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}
