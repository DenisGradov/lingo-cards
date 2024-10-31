import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import NextButton from "./SlidesNextButton";

const InfoSlides = ({
  slides,
  currentSlide,
  onNext,
  onPrevious,
  completeSlides,
}) => {
  const slidesArray = slides.slides;
  const [previousIndex, setPreviousIndex] = useState(currentSlide);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;

    if (newIndex > previousIndex) {
      onNext();
    } else if (newIndex < previousIndex) {
      onPrevious();
    }

    setPreviousIndex(newIndex);
  };

  return (
    <div className="slides pt-[40px] pb-[40px] pr-[30px] pl-[30px]">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper relative text-center"
        onSlideChange={handleSlideChange}
      >
        {slidesArray.map(function (slide, index) {
          return (
            <SwiperSlide key={`slide-number-${index}`}>
              <div className="flex flex-col items-center justify-between flex-grow h-[70vh] mb-[20px]">
                <div className="flex w-full">
                  <h2 className="text-left text-[48px] font-extrabold text-[#282950] w-[260px] leading-none">
                    {slide.title}
                  </h2>
                </div>
                <div className="absolute flex flex-col items-center top-[30vh] w-[180px]">
                  <img src={slide.image} alt="intro image" />
                </div>
                <div>
                  <p className="big:mt-[16px] mb-[20px] small:mb-[10px] max-w-[265px] text-[#9194C3] text-[14px] font-semibold">
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <NextButton
          completeSlides={completeSlides}
          currentSlide={currentSlide}
          slides={slides}
        />
      </Swiper>
    </div>
  );
};

export default InfoSlides;
