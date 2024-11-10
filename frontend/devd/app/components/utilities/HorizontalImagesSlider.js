import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function HorizontalImagesSlider({ images, outerContainerRef }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const handleMouseEnter = () => {
    outerContainerRef.current.style.overflow = "hidden";
  };

  const handleMouseLeave = () => {
    outerContainerRef.current.style.overflow = "auto";
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
        {images !== undefined &&
          images.map((image, i) => (
            <div
              key={`page-image-${i}`}
              ref={(el) => (itemRefs.current[i] = el)} // Store each item reference
              className="min-w-[300px] h-full flex items-center justify-center"
            >
              <Image
                height={500}
                width={500}
                src={image.url}
                alt={image.title}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
