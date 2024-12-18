import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import useModal from "@/app/hooks/useModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from "./Button";

export default function HorizontalImagesSlider({ images, handleImageDelete }) {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState();
  const [isDeleteWarning, setIsDeleteWarning] = useState(false);

  const handleDeleteSubmission = () => {
    handleImageDelete(selectedImage);
    closeModal();
  };

  const ModalBody = () => {
    return (
      <div className="w-full h-full flex justify-center">
        {selectedImage !== undefined && (
          <div className="w-2/3 h-2/3 mt-4 flex-col justify-center items-center">
            <Image
              height={1080}
              width={1920}
              src={selectedImage.url}
              alt={selectedImage.title}
            />
            <div className="flex w-full justify-between items-center ">
              <h1 className="text-start text-3xl mt-3 underline">
                {" "}
                {selectedImage.title}{" "}
              </h1>
              {!isDeleteWarning ? (
                <Image
                  src={"/static/trashIcon-white.png"}
                  width={30}
                  height={25}
                  alt="Delete image Icon"
                  className="border p-1 hover:border-red-500 hover:cursor-pointer"
                  onClick={() => setIsDeleteWarning(true)}
                />
              ) : (
                <div className="flex justify-center items-center gap-4">
                  <p> Delete this image? </p>
                  <Button
                    addStyle="py-0 border-yellow-500"
                    clickCallback={() => setIsDeleteWarning(false)}
                  >
                    {" "}
                    {"No, nevermind!"}{" "}
                  </Button>
                  <Button
                    addStyle="py-0 border-red-500"
                    clickCallback={handleDeleteSubmission}
                  >
                    {" "}
                    {"Yes, Delete!"}{" "}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  const { Modal, openModal, closeModal } = useModal(
    "Image View",
    <ModalBody />
  );

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
                      className="h-full"
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
