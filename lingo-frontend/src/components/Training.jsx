import {
  RiArrowUpSLine,
  RiBarChartFill,
  RiMoonFill,
  RiPlayLargeFill,
  RiQuestionLine,
  RiSunFill,
} from "react-icons/ri";
import useThemeStore from "../store/themeStore.js";
import { useState } from "react";
import {useCardStore} from "../store/userInfo.js";

const Training = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { teach, iKnow, learned } = useCardStore();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
      <div className="flex flex-col flex-grow">
        <div className="w-full flex items-center justify-between py-[5px] mt-[10px] px-[16px]">
          <img alt="logo" src="/logo.webp" />
          <div className="flex">
            <RiBarChartFill
                className={`mr-[32px] text-3xl ${
                    isDark ? "text-[#9194C3]" : "text-[#282950]"
                }`}
            />
            <span
                onClick={handleToggleTheme}
                className="px-[16px] relative flex items-center justify-center cursor-pointer"
            >
            <span className={`absolute ${!isDark ? "opacity-100" : "opacity-0"}`}>
              <RiSunFill className="text-3xl text-[#775CFF]" />
            </span>
            <span className={`absolute ${isDark ? "opacity-100" : "opacity-0"}`}>
              <RiMoonFill className="text-3xl text-[#775CFF]" />
            </span>
          </span>
          </div>
        </div>

        <div className="flex flex-col flex-grow justify-between">
          <div className="flex flex-col justify-around flex-grow">
            <div className="flex justify-between w-full p-[16px]">
              <div className="flex flex-col items-center w-full border-t border-r border-[#434575]">
              <span className="mt-[24px] text-[#775CFF] text-[32px] font-bold">
                {teach}
              </span>
                <span className="text-[#9194C3] font-semibold text-[14px]">
                Teach
              </span>
                <RiQuestionLine className="mb-[24px] text-[#9194C3] text-[20px] hover:scale-105 cursor-pointer " />
              </div>
              <div className="flex flex-col items-center w-full border-t border-r border-[#434575]">
              <span className="mt-[24px] dark:text-[#F3F7FF] text-[#282950] text-[32px] font-bold">
                {iKnow}
              </span>
                <span className="text-[#9194C3] font-semibold text-[14px]">
                I know
              </span>
                <RiQuestionLine className="mb-[24px] text-[#9194C3] text-[20px] hover:scale-105 cursor-pointer " />
              </div>
              <div className="flex flex-col items-center w-full border-t border-[#434575]">
              <span className="mt-[24px] dark:text-[#F3F7FF] text-[#282950] text-[32px] font-bold">
                {learned}
              </span>
                <span className="text-[#9194C3] font-semibold text-[14px]">
                Learned
              </span>
                <RiQuestionLine className="mb-[24px] text-[#9194C3] text-[20px] hover:scale-105 cursor-pointer " />
              </div>
            </div>

            <div className="flex flex-col items-center text-center py-[5px] px-[16px]">
              <img className="w-[32px]" alt="img of nut" src="/nut.webp" />
              <h2 className="mt-[8px] dark:text-[#F3F7FF] text-[#282950] font-semibold text-[32px]">
                Collecting Walnut
              </h2>
              <h3 className="mt-[16px] mb-[20px] max-w-[265px] text-[#9194C3] text-[14px] font-semibold">
                For tuition, we will charge them to you. Spend it wisely
              </h3>
              <div className="mt-[55px] relative flex justify-center">
                <img
                    className="absolute bottom-[15px]"
                    alt="animal"
                    src="/animal.webp"
                />
                <img
                    alt="ellipse"
                    src={isDark ? "/ellipse.webp" : "/whiteEllipse.webp"}
                />
              </div>
              <div className="mt-[11px] mb-[5px] xs:w-[310px] w-full h-[54px] rounded-tl-[50px] rounded-br-[50px] rounded-tr-[100px] rounded-bl-[100px] flex justify-center items-center font-extrabold text-[26px] dark:text-[#F3F7FF] text-[#282950] dark:bg-[#333560]/50 bg-[#C1C3EC]/50 backdrop-blur-24 hover:scale-105 cursor-pointer ">
                <div className="flex items-center">
                  <RiPlayLargeFill className="text-[#775CFF] text-[20px] mr-[16px]" />
                  Start
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-[5px] p-[16px] mb-[20px]">
            <div className="flex items-center justify-center dark:text-[#F3F7FF] text-[#282950] text-[24px] border border-[#333560] w-[50%] mx-[10px]">
              <RiArrowUpSLine />Cards
            </div>
            <div className="text-[30px] text-[#F3F7FF] w-[56px] h-[56px] bg-[#775CFF] rounded-full flex items-center justify-center mx-[10px]">
              +
            </div>
          </div>
        </div>
      </div>
  );
};

export default Training;
