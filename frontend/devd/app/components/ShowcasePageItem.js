import React, { useEffect, useState } from "react";
import Image from "next/image";
import VerticalDivider from "./utilities/VerticalDivider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useModal from "../hooks/useModal";
import ShowcaseUpdatePageModal from "./ShowcaseUpdatePageModal";
import ShowcaseImageModal from "./ShowcaseImageModal";

export default function ShowcasePageItem({
  page,
  updatePage,
  handleDeletePageImage,
  postNewPageImage,
  needsLogin,
}) {
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

  // Modal for updating page title and descriptions
  const handleUpdatePage = (formData, page_id) => {
    updatePage(formData, page_id);
    closeModal();
  };
  const { Modal, openModal, closeModal } = useModal(
    "Edit Page Title and Description",
    <ShowcaseUpdatePageModal page={page} handleSubmit={handleUpdatePage} />
  );

  const handleImageDelete = (image) => {
    handleDeletePageImage(image, page._id);
  };

  const handlePostNewImage = (title, image) => {
    postNewPageImage(title, image, page._id);
  };

  // Modal for updating page image
  const {
    Modal: ImageModal,
    openModal: openImageModal,
    closeModal: closeImageModal,
  } = useModal(
    "Manage Page Images",
    <ShowcaseImageModal
      images={page.images}
      handleDelete={handleImageDelete}
      handlePostNewImage={handlePostNewImage}
    />
  );

  return (
    <div className="w-full my-3 flex">
      {/* Page Image */}
      <div className="relative w-[60%] flex justify-center p-5">
        {!needsLogin && (
          <Image
            src={"/static/pencilIcon.png"}
            width={30}
            height={30}
            alt="Modify project data Icon"
            className="absolute hover:cursor-pointer hover:bg-gray-500 p-1 rounded-lg right-3 top-1"
            onClick={openImageModal}
          />
        )}
        <div className="slider-container w-5/6">
          <Slider {...sliderSettings}>
            {page?.images &&
              page.images.map((image, i) => (
                <div
                  key={`showcase-image-${image._id}`}
                  className="w-full p-2 flex justify-center"
                >
                  <div className="flex-grow flex justify-center">
                    <Image
                      src={
                        page.images !== undefined
                          ? page.images[i].url
                          : "/static/loadingIcon-white.png"
                      }
                      width={1000}
                      height={300}
                      alt={"page picture"}
                    />
                  </div>
                  <p className="italic text-center underline">
                    {" "}
                    {image.title}{" "}
                  </p>
                </div>
              ))}
          </Slider>
        </div>
      </div>
      <VerticalDivider />
      {/* Page details */}
      <div className="w-[40%] p-3 flex flex-col gap-3">
        <div className="w-full flex flex-row justify-between">
          <h1 className="text-6xl font-bold"> {page.name} </h1>
          {!needsLogin && (
            <Image
              src={"/static/pencilIcon.png"}
              width={30}
              height={30}
              alt="Modify project data Icon"
              className="h-[2rem] w-[2rem] hover:cursor-pointer hover:bg-gray-500 p-1 rounded-lg"
              onClick={openModal}
            />
          )}
        </div>
        <p className="text-xl italic"> {page.description} </p>

        <ul className="list-disc list-inside">
          {page?.features?.length > 0 && (
            <h3 className="text-4xl"> Features </h3>
          )}
          {page.features !== undefined &&
            page.features.map((feature, i) => (
              <li key={`feature-${feature._id}}`}> {feature.text} </li>
            ))}
        </ul>
      </div>
      {Modal}
      {ImageModal}
    </div>
  );
}
