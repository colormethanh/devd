import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import ShowcaseImageModalImageItem from "./ShowcaseImageModalImageItem";

export default function ShowcaseImageModal({ images, handleDelete }) {
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
      <ul>
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
