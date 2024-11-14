import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import useModal from "@/app/hooks/useModal";

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

  const handleMouseEnter = () => {
    outerContainerRef.current.style.overflow = "hidden";
  };

  const handleMouseLeave = () => {
    outerContainerRef.current.style.overflow = "auto";
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    openModal();
  };

  // Handle mouse wheel scroll
  const handleWheel = (e) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-y-hidden"
      ref={containerRef}
      onWheel={handleWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-4/5 items-center gap-5">
        {images !== undefined && images.length !== 0 ? (
          images.map((image, i) => (
            <div
              key={`page-image-${i}`}
              className="min-w-[300px] h-full flex items-center justify-center overflow-hidden hover:cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <Image
                height={400}
                width={500}
                src={image.url}
                alt={image.title}
              />
            </div>
          ))
        ) : (
          <div className="h-12">
            <h1 className="text-lg">
              {" "}
              📸 No images to show...Upload an image to view them here
            </h1>
          </div>
        )}
      </div>
      {Modal}
    </div>
  );
}
