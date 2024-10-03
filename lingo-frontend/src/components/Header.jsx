import React from 'react';
import { RiNotification2Line, RiQuestionMark } from 'react-icons/ri';
import useUserInfo from '../store/userInfo.js'; // Импортируем стор

const Header = () => {
    const selectedLanguage = useUserInfo((state) => state.selectedLanguage);
    const changeLanguage = useUserInfo((state) => state.changeLanguage);
    const getLanguageInfo = useUserInfo((state) => state.getLanguageInfo);

    const language = getLanguageInfo(selectedLanguage);

    const handleChangeLanguage = () => {
        changeLanguage();
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
            <RiQuestionMark className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
        </div>
    );
};

export default Header;
