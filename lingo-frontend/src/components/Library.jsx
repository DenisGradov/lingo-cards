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
import { userInfo } from "../store/userInfo.js";
import { useState } from "react";

const Library = () => {
  const {
    userName,
    userEmail,
    selectedLanguage,
    changeLanguage,
    getLanguageInfo,
  } = userInfo();
  const [language, setLanguage] = useState(getLanguageInfo(selectedLanguage));
  const complexityHard = {
    name: "Hard",
    color: "#FF7967",
  };
  const complexityEasy = {
    name: "Easy",
    color: "#78FFBC",
  };
  const complexityMedium = {
    name: "Medium",
    color: "#FFE168",
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

  return (
    <section className="flex flex-col flex-grow ">
      {/* Шапка фиксирована сверху */}
      <div className="flex justify-between items-center py-[5px] mt-[10px] px-[16px]">
        <RiMenuFill className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
        <img
          className="w-[40px]"
          onClick={handleChangeLanguage}
          alt={language.code}
          src={language.flag}
        />
        <RiSearchLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
      </div>
      <span className="relative mt-[20px] w-[60%] h-[1px] bg-[#C1C3EC] m-auto"></span>

      {/* Основний контент */}
      <div className="flex flex-col flex-grow justify-between p-[16px] gap-y-[36px]">
        <div className="flex flex-col gap-y-[25px]">
          <div class="flex items-center">
            <RiTimerLine className="text-[20px] text-[#9194C3]  mr-[18px]" />
            <h2 className=" dark:text-[#F3F7FF] text-[#282950] text-[40px] font-semibold">
              Last Open
            </h2>
          </div>

          {/* Свайпери */}
          <div className="flex gap-x-[18px] overflow-auto hide-scrollbar ">
            {lastOpenInfo.map(function (e) {
              return (
                <div
                  style={{ backgroundImage: `url('${e.imageURL}')` }}
                  className="group bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl"
                >
                  <div className="w-[148px] h-[156px] rounded-t-3xl rounded-b-2xl bg-gradient-dark prev-hover flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-[6px]">
                      <p
                        className={`font-medium mb-0 text-[${e.complexity.color}]`}
                      >
                        {e.complexity.name}
                      </p>
                      <div className="w-[64px] h-[64px] flex  items-center justify-center play-hover">
                        <RiPlayLargeLine className="text-[30px] text-[#F3F7FF] group-hover:text-[25px]" />
                      </div>
                      <div className="flex items-center gap-[20px]">
                        <div className="flex items-center gap-[10px]">
                          <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                          <span className="font-medium text-[#F3F7FF]">
                            {e.numberOfCards}
                          </span>
                        </div>
                        <div className="flex items-center gap-[10px]">
                          <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                          <span className="font-medium group-hover:text-[#FFE168] text-[#9194C3]">
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
        </div>
        {/* через map */}
        <div className="flex flex-col gap-y-[25px]">
          <div class="flex items-center">
            <h2 className=" dark:text-[#F3F7FF] text-[#282950] text-[32px] font-semibold">
              Courses
            </h2>
            <RiArrowRightSLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
          </div>

          <div className="flex gap-x-[18px] overflow-auto hide-scrollbar ">
            {coursesInfo.map(function (e) {
              return (
                <div
                  style={{ backgroundImage: `url('${e.imageURL}')` }}
                  className="group bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl bg-opacity-25"
                >
                  <div className="w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-light dark:from-[#333560]/75 dark:to-[#333560]/75  prev-hover flex items-center justify-center">
                    <div className="flex flex-col  justify-center gap-[78px]">
                      <p
                        className={`font-medium mb-0 text-[${e.complexity.color}]`}
                      >
                        {e.complexity.name}
                      </p>
                      <div className="flex flex-col gap-[6px]">
                        <p className="text-[20px] font-bold mb-0">{e.name}.</p>
                        <div className="flex items-center gap-[20px]">
                          <div className="flex items-center gap-[10px]">
                            <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                            <span className="font-medium text-[#F3F7FF]">
                              {e.numberOfCards}
                            </span>
                          </div>
                          <div className="flex items-center gap-[10px]">
                            <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                            <span className="font-medium text-[#9194C3] group-hover:text-[#FFE168]">
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

          <div className="flex gap-x-[18px] overflow-auto hide-scrollbar ">
            {courseSetsInfo.map(function (e) {
              return (
                <div
                  style={{ backgroundImage: `url('${e.imageURL}')` }}
                  className="group bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl bg-opacity-25"
                >
                  <div className="w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-light dark:from-[#333560]/75 dark:to-[#333560]/75  prev-hover flex items-center justify-center">
                    <div className="flex flex-col  justify-center gap-[78px]">
                      <p
                        className={`font-medium mb-0 text-[${e.complexity.color}]`}
                      >
                        {e.complexity.name}
                      </p>
                      <div className="flex flex-col gap-[6px]">
                        <p className="text-[20px] font-bold mb-0">{e.name}.</p>
                        <div className="flex items-center gap-[20px]">
                          <div className="flex items-center gap-[10px]">
                            <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                            <span className="font-medium text-[#F3F7FF]">
                              {e.numberOfCards}
                            </span>
                          </div>
                          <div className="flex items-center gap-[10px]">
                            <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                            <span className="font-medium text-[#9194C3] group-hover:text-[#FFE168]">
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
        </div>
      </div>
    </section>
  );
};

export default Library;