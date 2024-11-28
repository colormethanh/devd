import React from "react";
import Image from "next/image";
import VerticalDivider from "./utilities/VerticalDivider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function ShowcasePageItem({ page }) {
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div style={{}}>
        <ul style={{ color: "white" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="w-full my-3 flex">
      {/* Page Image */}
      <div className="w-[60%] flex justify-center p-5">
        <div className="slider-container w-5/6">
          <Slider {...sliderSettings}>
            {page?.images &&
              page.images.map((image) => (
                <div
                  key={`showcase-image-${image._id}`}
                  className="w-full p-2 flex justify-center"
                >
                  <div className="flex-grow flex justify-center">
                    <Image
                      src={
                        page.images !== undefined
                          ? page.images[0].url
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
        <h1 className="text-6xl font-bold"> {page.name} </h1>
        <p className="text-xl italic"> {page.description} </p>

        <ul className="list-disc list-inside">
          {page?.features?.length > 0 && (
            <h3 className="text-4xl"> Features </h3>
          )}
          {page.features !== undefined &&
            page.features.map((feature, i) => (
              <li key={`${page._id}-feature-${feature._id}}`}>
                {" "}
                {feature.text}{" "}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
