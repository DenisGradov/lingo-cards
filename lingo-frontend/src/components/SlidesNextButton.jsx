import React from "react";
import { useSwiper } from "swiper/react";

const NextButton = ({ currentSlide, completeSlides, slides }) => {
  const swiper = useSwiper();
  const slidesArray = slides.slides;

  if (currentSlide < slidesArray.length - 1) {
    return (
      <button
        onClick={() => swiper.slideNext()}
        className="font-semibold bg-[#936dff] hover:bg-[#7c59e6] text-white py-2 px-4 rounded-full transition mt-[20px] w-full h-[50px]"
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        onClick={() => completeSlides()}
        className="font-semibold bg-[#936dff] hover:bg-[#7c59e6] text-white py-2 px-4 rounded-full transition mt-[20px] w-full h-[50px] "
      >
        Finish
      </button>
    );
  }
};

export default NextButton;
