import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import useModal from "@/app/hooks/useModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function HorizontalImagesSlider({ images, outerContainerRef }) {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState();

  const modalBody = () => {
    return (
      <div className="w-full h-full flex justify-center">
        {selectedImage !== undefined && (
          <div className="w-2/3 h-2/3 flex-col justify-center items-center">
            <Image
              height={1080}
              width={1920}
              src={selectedImage.url}
              alt={selectedImage.title}
            />
            <h1 className="text-center text-3xl mt-3 underline">
              {" "}
              {selectedImage.title}{" "}
            </h1>
          </div>
        )}
      </div>
    );
  };
  const { Modal, openModal, closeModal } = useModal("", modalBody());

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    openModal();
  };

  return (
    <div className="h-full w-full" ref={containerRef}>
      {images !== undefined && images.length !== 0 ? (
        <div className="slider-container">
          <Slider {...sliderSettings}>
            {images.map((image, i) => (
              <div
                key={`page-image-${i._id}`}
                className="h-52 hover:cursor-pointer p-3"
                onDoubleClick={() => handleImageClick(image)}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="h-[80%] flex items-center m-3">
                    <Image
                      height={400}
                      width={600}
                      className=""
                      src={image.url}
                      alt={image.title}
                    />
                  </div>

                  <h4 className="text-center text-lg italic  float-end">
                    {" "}
                    {image.title}{" "}
                  </h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="h-12">
          <h1 className="text-lg">
            {" "}
            📸 No images to show...Upload an image to view them here
          </h1>
        </div>
      )}
      {Modal}
    </div>
  );
}
