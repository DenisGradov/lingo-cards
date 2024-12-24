import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const InfoSlides = ({
  slides,
  currentSlide,
  onNext,
  onPrevious,
  completeSlides,
}) => {
  const slidesArray = slides.slides;
  const [currentIndex, setCurrentIndex] = useState(currentSlide);
  const [autoPlay, setAutoPlay] = useState(true);
  const slideDuration = 5000;
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 100 / (slideDuration / 100));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [autoPlay]);

  useEffect(() => {
    if (progress >= 100) {
      handleNextSlide();
    }
  }, [progress]);

  const handleNextSlide = () => {
    setProgress(0);
    if (currentIndex < slidesArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
      swiperRef.current.slideTo(currentIndex + 1, 0);
      onNext();
    } else {
      completeSlides();
    }
  };

  const handlePreviousSlide = () => {
    if (currentIndex > 0) {
      setProgress(0);
      setCurrentIndex(currentIndex - 1);
      swiperRef.current.slideTo(currentIndex - 1, 0);
      onPrevious();
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
    setProgress(0);
  };

  const handleTapSlide = (event) => {
    const slideWidth = event.currentTarget.clientWidth;
    const clickPosition =
      event.clientX - event.currentTarget.getBoundingClientRect().left;

    if (clickPosition < slideWidth / 2) {
      handlePreviousSlide();
    } else {
      setAutoPlay(false);
      handleNextSlide();
      setAutoPlay(true);
    }
  };

  const handleMouseEnter = () => setAutoPlay(false);
  const handleMouseLeave = () => setAutoPlay(true);

  return (
    <div className="min-h-screen h-full flex flex-col bg-[#fff] dark:bg-[#282950] text-black dark:text-white">
      <div className="w-full flex-grow flex flex-col m-auto overflow-hidden">
        <div className="max-w-[550px] w-full m-auto flex flex-col flex-grow">
          <section className="flex flex-col flex-grow max-h-[100vh] overflow-auto ">
            <div className="flex flex-col flex-grow h-full">
              <div className="pt-[40px] pb-[40px] pr-[30px] pl-[30px]">
                <div className="flex w-full place-content-end ">
                  <button
                    onClick={completeSlides}
                    className=" dark:text-white text-[#181830] text-xl"
                  >
                    &times;
                  </button>
                </div>

                <div className="progress-bars flex mb-[20px] felx w-full gap-1">
                  {slidesArray.map((_, index) => (
                    <div
                      key={index}
                      className="progress-bar flex-grow bg-gray-300  relative overflow-hidden"
                      style={{
                        height: "4px",
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 h-full dark:bg-[#4A4E84] bg-[#C1C3EC]"
                        style={{
                          width: "100%",
                          transition: "width 0.1s linear",
                        }}
                      />
                      <div
                        className="absolute left-0 top-0 h-full dark:bg-[#F3F7FF] bg-[#282950] transition-all duration-100"
                        style={{
                          width:
                            index === currentIndex
                              ? `${progress}%`
                              : index < currentIndex
                              ? "100%"
                              : "0%",
                          transition:
                            index === currentIndex
                              ? "width 0.1s linear"
                              : "none",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  className="mySwiper relative text-center"
                  onSlideChange={handleSlideChange}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  allowTouchMove={false}
                  effect="fade"
                  speed={0}
                >
                  {slidesArray.map((slide, index) => (
                    <SwiperSlide
                      key={`slide-number-${index}`}
                      onClick={handleTapSlide}
                    >
                      <div className="flex flex-col items-center justify-between flex-grow h-[85vh] overflow-auto">
                        <div className="flex w-full">
                          <h2 className="text-left text-[36px] font-extrabold dark:text-[#F3F7FF] text-[#282950] w-[260px] leading-none pb-[5px]">
                            {slide.title}
                          </h2>
                        </div>
                        <div className="flex flex-col items-center  w-[300px] ">
                          <img src={slide.image} alt="intro image" />
                        </div>

                        {slide.description && (
                          <div>
                            <p className="big:mt-[16px] mb-[20px] small:mb-[10px] max-w-[265px] text-[#9194C3] text-[14px] font-semibold">
                              {slide.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoSlides;
