// імпорт іконок
import {
  RiMenuFill,
  RiSearchLine,
  RiTimerLine,
  RiArrowRightSLine,
  RiAddLine,
  RiPlayLargeLine,
  RiInbox2Line,
  RiStarFill,
} from "react-icons/ri";
import { useState, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import userInfo from "../store/userInfo.js";

const Library = () => {
  const { selectedLanguage, changeLanguage, getLanguageInfo } = userInfo();
  const [language, setLanguage] = useState(getLanguageInfo(selectedLanguage));
  const complexityHard = {
    name: "Hard",
    color: "text-[#FF7967]",
  };
  const complexityEasy = {
    name: "Easy",
    color: "text-[#78FFBC]",
  };
  const complexityMedium = {
    name: "Medium",
    color: "text-[#FFE168]",
  };
  const lastOpenInfo = [
    {
      complexity: complexityHard,
      numberOfCards: 170,
      rating: 7,
      imageURL: "/img/Flag_of_the_United_Kingdom_(1-2).svg",
    },
    {
      complexity: complexityEasy,
      numberOfCards: 100,
      rating: 9,
      imageURL: "/img/Flag_of_Ukraine.svg",
    },
    {
      complexity: complexityMedium,
      numberOfCards: 150,
      rating: 5,
      imageURL: "/img/Flag_of_Ukraine.svg",
    },
    {
      complexity: complexityHard,
      numberOfCards: 156,
      rating: 10,
      imageURL: "/img/Flag_of_the_United_Kingdom_(1-2).svg",
    },
  ];

  const coursesInfo = [
    {
      complexity: complexityEasy,
      name: "Course for..",
      numberOfCards: 160,
      rating: 10,
      imageURL: "/img/Flag_of_the_United_Kingdom_(1-2).svg",
    },
    {
      complexity: complexityMedium,
      name: "Course for..",
      numberOfCards: 100,
      rating: 7,
      imageURL: "/img/Flag_of_Ukraine.svg",
    },
    {
      complexity: complexityEasy,
      name: "Course for..",
      numberOfCards: 150,
      rating: 6,
      imageURL: "/img/Flag_of_the_United_Kingdom_(1-2).svg",
    },
    {
      complexity: complexityHard,
      name: "Course for..",
      numberOfCards: 150,
      rating: 10,
      imageURL: "/img/Flag_of_Ukraine.svg",
    },
  ];

  const courseSetsInfo = [
    {
      complexity: complexityEasy,
      name: "Course for..",
      numberOfCards: 180,
      rating: 10,
      imageURL: "/img/Flag_of_the_United_Kingdom_(1-2).svg",
    },
    {
      complexity: complexityHard,
      name: "Course for..",
      numberOfCards: 155,
      rating: 9,
      imageURL: "/img/Flag_of_Ukraine.svg",
    },
    {
      complexity: complexityMedium,
      name: "Course for..",
      numberOfCards: 98,
      rating: 10,
      imageURL: "/img/Flag_of_the_United_Kingdom_(1-2).svg",
    },
    {
      complexity: complexityEasy,
      name: "Course for..",
      numberOfCards: 46,
      rating: 10,
      imageURL: "/img/Flag_of_Ukraine.svg",
    },
  ];

  function handleChangeLanguage() {
    changeLanguage();
    setLanguage(getLanguageInfo(selectedLanguage));
  }

  const scrollRef = useRef(null);
  const handleWheel = (event) => {
    if (scrollRef.current) {
      event.preventDefault();
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
    <section className="flex flex-col flex-grow max-h-[90vh] overflow-auto ">
      {/* Шапка фиксирована сверху */}
      <div className="fixed z-[100] max-w-[550px] h-[70px] w-full flex justify-between items-center py-[5px] px-[16px] dark:bg-[#282950] bg-[#FFFFFF]">
        <RiMenuFill className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
        <img
          className="w-[40px]"
          onClick={handleChangeLanguage}
          alt={language.code}
          src={language.flag}
        />
        <RiSearchLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
      </div>

      {/* Основний контент */}
      <div className="flex flex-col flex-grow justify-between p-[16px] gap-y-[36px]">
        <div className="flex flex-col gap-y-[25px]">
          <div class="flex items-center mt-[70px]">
            <RiTimerLine className="text-[20px] text-[#9194C3]  mr-[18px]" />
            <h2 className=" dark:text-[#F3F7FF] text-[#282950] text-[40px] font-semibold">
              Last Open
            </h2>
          </div>
          <ScrollContainer ref={scrollRef} onWheel={handleWheel}>
            <div className="flex gap-x-[18px] ">
              {lastOpenInfo.map(function (e) {
                return (
                  <div
                    style={{ backgroundImage: `url('${e.imageURL}')` }}
                    className="group relative bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl select-none"
                  >
                    <div className=" prev-small flex items-center justify-center">
                      <div className="absolute transition duration-300 prev-small bg-gradient-to-b bg-gradient-dark opacity-100 group-hover:opacity-0"></div>
                      <div className="absolute transition duration-300 prev-small bg-gradient-to-b from-[#946DFF]/75 to-[#5A4BFF]/75 opacity-0 group-hover:backdrop-blur-[1px] group-hover:opacity-100"></div>
                      <div className="relative flex flex-col items-center justify-center gap-[6px]">
                        <p className={`font-medium mb-0 ${e.complexity.color}`}>
                          {e.complexity.name}
                        </p>
                        <div className="transition-all duration-300  w-[64px] h-[64px] rounded-3xl flex  items-center justify-center play-hover">
                          <RiPlayLargeLine className=" transition-all duration-300 text-[30px] text-[#F3F7FF] group-hover:text-[25px]" />
                        </div>
                        <div className="flex items-center gap-[20px]">
                          <div className="flex items-center gap-[10px]">
                            <RiInbox2Line className="transition duration-300 text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                            <span className="font-medium text-[#F3F7FF]">
                              {e.numberOfCards}
                            </span>
                          </div>
                          <div className="flex items-center gap-[10px]">
                            <RiStarFill className="transition duration-300 text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                            <span className="transition duration-300 font-medium group-hover:text-[#FFE168] text-[#9194C3]">
                              {e.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollContainer>
        </div>

        <div className="flex flex-col gap-y-[25px]">
          <div class="flex items-center">
            <h2 className=" dark:text-[#F3F7FF] text-[#282950] text-[32px] font-semibold">
              Courses
            </h2>
            <RiArrowRightSLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
          </div>
          <ScrollContainer ref={scrollRef} onWheel={handleWheel}>
            <div className="flex gap-x-[18px]">
              {coursesInfo.map(function (e) {
                return (
                  <div
                    style={{ backgroundImage: `url('${e.imageURL}')` }}
                    className="group relative bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl select-none"
                  >
                    <div className=" prev-medium  flex items-center justify-center">
                      <div className="absolute transition duration-300  prev-medium bg-gradient-to-b bg-gradient-dark-theme bg-gradient-light opacity-100 group-hover:opacity-0"></div>
                      <div className="absolute transition duration-300  prev-medium bg-gradient-to-b from-[#946DFF]/75 to-[#5A4BFF]/75 opacity-0 group-hover:backdrop-blur-[1px] group-hover:opacity-100"></div>
                      <div className="relative flex flex-col  justify-center gap-[78px]">
                        <p className={`font-medium mb-0 ${e.complexity.color}`}>
                          {e.complexity.name}
                        </p>
                        <div className="flex flex-col gap-[6px]">
                          <p className="text-[20px] font-bold mb-0">
                            {e.name}.
                          </p>
                          <div className="flex items-center gap-[20px]">
                            <div className="flex items-center gap-[10px]">
                              <RiInbox2Line className="transition duration-300 text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                              <span className="font-medium text-[#F3F7FF]">
                                {e.numberOfCards}
                              </span>
                            </div>
                            <div className="flex  items-center gap-[10px]">
                              <RiStarFill className="transition duration-300 text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                              <span className="transition duration-300 font-medium text-[#9194C3] group-hover:text-[#FFE168]">
                                {e.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollContainer>
        </div>
        <div className="flex flex-col gap-y-[25px]">
          <div class="flex items-center">
            <h2 className=" dark:text-[#F3F7FF] text-[#282950] text-[32px] font-semibold">
              Course Sets
            </h2>
            <RiArrowRightSLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
            <div className="rounded-full bg-gradient-radial from-[#946DFF] to-[#5A4BFF] w-[40px] h-[40px] flex  items-center justify-center ml-auto flex-shrink-0 drop-shadow-xl">
              <RiAddLine className="text-[25px] text-[#F3F7FF] " />
            </div>
          </div>
          <ScrollContainer ref={scrollRef} onWheel={handleWheel}>
            <div className="flex gap-x-[18px]">
              {courseSetsInfo.map(function (e) {
                return (
                  <div
                    style={{ backgroundImage: `url('${e.imageURL}')` }}
                    className="group relative bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl select-none"
                  >
                    <div className=" prev-medium  flex items-center justify-center">
                      <div className="absolute transition duration-300  prev-medium bg-gradient-to-b bg-gradient-dark-theme bg-gradient-light opacity-100 group-hover:opacity-0"></div>
                      <div className="absolute transition duration-300  prev-medium bg-gradient-to-b from-[#946DFF]/75 to-[#5A4BFF]/75 opacity-0 group-hover:backdrop-blur-[1px] group-hover:opacity-100"></div>
                      <div className="relative flex flex-col  justify-center gap-[78px]">
                        <p className={`font-medium mb-0 ${e.complexity.color}`}>
                          {e.complexity.name}
                        </p>
                        <div className="flex flex-col gap-[6px]">
                          <p className="text-[20px] font-bold mb-0">
                            {e.name}.
                          </p>
                          <div className="flex items-center gap-[20px]">
                            <div className="flex items-center gap-[10px]">
                              <RiInbox2Line className="transition duration-300 text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                              <span className="font-medium text-[#F3F7FF]">
                                {e.numberOfCards}
                              </span>
                            </div>
                            <div className="flex  items-center gap-[10px]">
                              <RiStarFill className="transition duration-300 text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                              <span className="transition duration-300 font-medium text-[#9194C3] group-hover:text-[#FFE168]">
                                {e.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollContainer>
        </div>
      </div>
    </section>
  );
};

export default Library;
