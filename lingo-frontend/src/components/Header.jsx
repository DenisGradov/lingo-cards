// Header.jsx
import React from "react";
import { RiNotification2Line, RiQuestionMark } from "react-icons/ri";
import useUserInfo from "../store/userInfo.js";
import useInfoSlidesStore from "../store/infoSlidesStore.js";
import { openInfoSlidesWithInfo } from "../utils/infoSlidesUtils.js";

const Header = () => {
  const selectedLanguage = useUserInfo((state) => state.selectedLanguage);
  const changeLanguage = useUserInfo((state) => state.changeLanguage);
  const getLanguageInfo = useUserInfo((state) => state.getLanguageInfo);
  const isViewed = useInfoSlidesStore((state) => state.isViewed);

  const language = getLanguageInfo(selectedLanguage);

  const handleChangeLanguage = () => {
    changeLanguage();
  };

  const handleInfoSlides = () => {
    openInfoSlidesWithInfo("intro");
  };

  return (
    <div className="flex justify-between items-center py-[5px] mt-[10px] px-[16px]">
      <RiNotification2Line className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
      <img
        className="w-[40px] cursor-pointer"
        onClick={handleChangeLanguage}
        alt={language.code}
        src={language.flag}
      />
      <div
        className={`relative cursor-pointer ${
          isViewed ? "" : "ring-2 ring-purple-500 rounded-full"
        }`}
        onClick={handleInfoSlides}
      >
        <RiQuestionMark
          className={`text-[25px] ${
            isViewed ? "dark:text-[#9194C3] text-[#282950]" : "text-purple-500"
          }`}
        />
      </div>
    </div>
  );
};

export default Header;
