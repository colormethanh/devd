import React from "react";
import VerticalDivider from "./utilities/VerticalDivider";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useModal from "../hooks/useModal";
import ShowcaseUpdateComponentModal from "./ShowcaseUpdateComponentModal";

export default function ShowcaseComponentItem({
  component,
  needsLogin,
  updateComponent,
}) {
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  return (
    <div className="w-full my-3 flex">
      {/* Component Image */}
      <div className="w-[60%] flex justify-center p-5">
        <div className="slider-container w-5/6">
          <Slider {...sliderSettings}>
            {component?.images &&
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
              ))}
          </Slider>
        </div>
      </div>
      <VerticalDivider />
      {/* Component Details */}
      <div className="w-[40%] p-3 flex flex-col gap-3">
        <div className="w-full flex flex-row justify-between">
          <h1 className="text-6xl font-bold"> {component.name} </h1>
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
        <p className="text-xl italic"> {component.description} </p>
      </div>
      {ComponentModal}
    </div>
  );
}
