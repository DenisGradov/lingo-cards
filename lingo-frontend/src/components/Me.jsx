import {
    RiLogoutBoxLine,
    RiMessage2Line,
    RiNotification2Line,
    RiPencilLine,
    RiQuestionMark,
    RiUser5Line
} from 'react-icons/ri';
import {useState} from "react";
import {useUserInfo} from "../store/userInfo.js";

const UserProfile = () => {

    const { userName, userEmail, selectedLanguage, changeLanguage, getLanguageInfo } = useUserInfo();
    const [language, setLanguage] = useState(getLanguageInfo(selectedLanguage));

    function handleChangeLanguage() {
        changeLanguage();
        setLanguage(getLanguageInfo(selectedLanguage));
    }

    return (
        <section className="flex flex-col flex-grow">
            {/* Шапка фиксирована сверху */}
            <div className="flex justify-between items-center py-[5px] mt-[10px] px-[16px]">
                <RiNotification2Line className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
                <img className="w-[40px]" onClick={handleChangeLanguage} alt={language.code} src={language.flag} />
                <RiQuestionMark className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
            </div>

            <span className="relative mt-[20px] w-[60%] h-[1px] bg-[#C1C3EC] m-auto"></span>

            {/* Основной контент */}
            <div className="flex-grow flex flex-col items-center justify-around px-[16px]">
                <div className="flex flex-col items-center">
                    <RiUser5Line className="text-[100px] dark:text-[#F3F7FF] text-[#282950]" />
                    <div className="mt-[20px] flex items-center">
                        <h2 className="text-[48px] font-bold dark:text-[#F3F7FF] text-[#282950]">{userName}</h2>
                        <RiPencilLine className="text-[#FFC046] text-[26px] ml-[24px]" />
                    </div>
                    <h3 className="mt-[14px] text-[#9194C3] text-[14px] font-semibold">{userEmail}</h3>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-center">
                        <RiNotification2Line className="text-[#5484FF] text-[20px]" />
                        <span className="ml-[32px] text-[#5484FF] text-[20px] font-semibold">Notifications</span>
                    </div>
                    <div className="flex items-center">
                        <RiMessage2Line className="text-[#5484FF] text-[20px]" />
                        <span className="ml-[32px] text-[#5484FF] text-[20px] font-semibold">Help center</span>
                    </div>
                </div>

                {/* Нижняя часть */}
                <div className="flex items-center mt-[20px]">
                    <RiLogoutBoxLine className="text-[#FF6193] text-[20px]" />
                    <span className="ml-[32px] text-[#FF6193] text-[20px] font-semibold">Logout</span>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
