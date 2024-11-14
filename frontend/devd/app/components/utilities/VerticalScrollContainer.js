import { useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function VerticalScrollContainer({ setActiveChild, children }) {
  const settings = {
    className: "center",
    dots: false,
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current) => {
      setActiveChild(current);
    },
  };
  const slider = useRef(null);

  function scroll(e) {
    if (slider === null) return 0;

    e.wheelDelta > 0 ? slider.current.slickNext() : slider.current.slickPrev();
  }

  useEffect(() => {
    window.addEventListener("wheel", scroll, true);
    return () => {
      window.removeEventListener("wheel", scroll, true);
    };
  });

  return (
    <div className="slider-container">
      <Slider {...settings} ref={slider}>
        {children}
      </Slider>
    </div>
  );
}
