import Image from "next/image";
import React, { useState } from "react";

export default function HorizontalImagesSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="relative h-96 w-full flex justify-between mx-auto">
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          className="h-12 text-black bg-white bg-opacity-50 p-2 rounded-full"
        >
          {"<"}
        </button>
      </div>
      <div>
        {/* Carousel Image */}
        {images !== undefined && images.length !== 0 ? (
          <Image
            height={1500}
            width={800}
            alt={`Slide ${currentIndex + 1}`}
            src={images[currentIndex].url}
          />
        ) : (
          <h1> No images available </h1>
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={nextSlide}
          className="h-12 text-black bg-white  bg-opacity-50 p-2 rounded-full"
        >
          {">"}
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images !== undefined &&
          images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          ))}
      </div>
    </div>
  );
}
