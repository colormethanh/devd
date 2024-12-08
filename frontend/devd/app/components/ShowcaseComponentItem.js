import React from "react";
import VerticalDivider from "./utilities/VerticalDivider";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useModal from "../hooks/useModal";
import ShowcaseUpdateComponentModal from "./ShowcaseUpdateComponentModal";
import ShowcaseImageModal from "./ShowcaseImageModal";

export default function ShowcaseComponentItem({
  component,
  needsLogin,
  updateComponent,
  postNewComponentImage,
  handleDeleteComponentImage,
}) {
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Modal for updating component
  const handleUpdateComponent = (formData, component_id) => {
    updateComponent(formData, component_id);
    closeComponentModal();
  };
  const {
    Modal: ComponentModal,
    openModal: openComponentModal,
    closeModal: closeComponentModal,
  } = useModal(
    "Manage Component Information",
    <ShowcaseUpdateComponentModal
      component={component}
      handleSubmit={handleUpdateComponent}
    />
  );

  // Modal for updating component images
  const handleImageDelete = (image) => {
    handleDeleteComponentImage(image, component._id);
  };

  const handlePostNewImage = (title, image) => {
    postNewComponentImage(title, image, component._id);
  };

  const {
    Modal: ComponentImageModal,
    openModal: openComponentImageModal,
    closeModal: closeComponentImageModal,
  } = useModal(
    "Manage Component Images",
    <ShowcaseImageModal
      images={component.images}
      handleDelete={handleImageDelete}
      handlePostNewImage={handlePostNewImage}
    />
  );

  return (
    <div className="w-full my-3 flex flex-col-reverse lg:flex-row">
      {/* Component Image */}
      <div className="relative lg:w-[60%] flex justify-center p-5">
        {!needsLogin && (
          <Image
            src={"/static/pencilIcon.png"}
            width={30}
            height={30}
            alt="Modify project data Icon"
            className="absolute hover:cursor-pointer hover:bg-gray-500 p-1 rounded-lg right-3 top-1"
            onClick={openComponentImageModal}
          />
        )}
        <div className="slider-container w-5/6">
          <Slider {...sliderSettings}>
            {component?.images?.length >= 1 ? (
              component.images.map((image) => (
                <div
                  key={`showcase-image-${image._id}`}
                  className="w-full p-2 flex justify-center"
                >
                  <div className="flex-grow flex justify-center">
                    <Image
                      src={
                        component.images !== undefined
                          ? component.images[0].url
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
              ))
            ) : (
              <div
                key={`placeholder-image`}
                className="w-full p-2 flex justify-center"
              >
                <div className="flex-grow flex justify-center">
                  <Image
                    src={"/static/imagePlaceHolder.png"}
                    width={1000}
                    height={300}
                    alt={"page picture"}
                  />
                </div>
                <p className="italic text-center underline">
                  {" "}
                  {"Placeholder"}{" "}
                </p>
              </div>
            )}
          </Slider>
        </div>
      </div>
      <div className={"border-l hidden lg:block"}>
        <VerticalDivider />
      </div>
      {/* Component Details */}
      <div className="lg:w-[40%] p-3 flex flex-col gap-3">
        <div className="w-full flex flex-row justify-between">
          <h1 className="text-4xl md:text-6xl font-bold"> {component.name} </h1>
          {!needsLogin && (
            <Image
              src={"/static/pencilIcon.png"}
              width={30}
              height={30}
              alt="Modify project data Icon"
              className="h-[2rem] w-[2rem] hover:cursor-pointer hover:bg-gray-500 p-1 rounded-lg"
              onClick={openComponentModal}
            />
          )}
        </div>
        <p className="lg:text-xl italic"> {component.description} </p>
      </div>
      {ComponentModal}
      {ComponentImageModal}
    </div>
  );
}
