import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function HorizontalImagesSlider({ images, outerContainerRef }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

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

  // Function to calculate the nearest item based on scroll position
  const getNearestItem = () => {
    const containerRect = containerRef.current.getBoundingClientRect();
    let nearestItem = null;
    let minDistance = Infinity;

    itemRefs.current.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left - containerRect.left);
      if (distance < minDistance) {
        minDistance = distance;
        nearestItem = item;
      }
    });
    return nearestItem;
  };

  // Scroll to the nearest item when scrolling ends
  const handleScrollEnd = () => {
    if (!isScrolling) {
      const nearestItem = getNearestItem();
      if (nearestItem) {
        containerRef.current.scrollTo({
          left: nearestItem.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    // Listen for the scroll event and trigger the nearest item calculation
    const onScroll = () => {
      setIsScrolling(true);
    };

    const scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
      handleScrollEnd();
    }, 100);

    if (containerRef.current)
      containerRef.current.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(scrollTimeout);
      if (containerRef.current)
        containerRef.current.removeEventListener("scroll", onScroll);
    };
  }, [isScrolling]);
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
                layout={"intrinsic"}
                src={image.url}
                alt={image.title}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
