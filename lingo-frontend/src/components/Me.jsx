import {
  RiCheckFill,
  RiLogoutBoxLine,
  RiMessage2Line,
  RiNotification2Line,
  RiPencilLine,
  RiUser5Line,
} from "react-icons/ri";
import useUserInfo from "../store/userInfo.js";
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateUserName } from "../api/user";
import { useTranslation } from "react-i18next";
import { openModalWithInfo } from "../utils/modalUtils.js";

const UserProfile = () => {
  const userName = useUserInfo((state) => state.userName);
  const userEmail = useUserInfo((state) => state.userEmail);
  const setUserName = useUserInfo((state) => state.setUserName);
  const clearUserInfo = useUserInfo((state) => state.clearUserInfo);
  const navigate = useNavigate();
  const [changeName, setChangeName] = useState({ state: false, newName: "" });
  const [error, setError] = useState(null);

  const { t } = useTranslation();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        clearUserInfo();
        navigate("/signin");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  function handleClickOnPen() {
    setChangeName((prevValue) => ({ ...prevValue, state: !prevValue.state }));
  }

  const handleChangeName = async () => {
    const regex = /^[a-zA-Z0-9]{6,}$/;
    if (!regex.test(changeName.newName)) {
      setError(
        t(
          "The name must contain at least 6 characters, only Latin letters and numbers"
        )
      );
      return;
    }

    try {
      const result = await updateUserName(changeName.newName);
      setUserName(result.newLogin);
      clearUserInfo();
      navigate("/signin");
    } catch (err) {
      setError(t("This name is already taken", err));
    }
  };

  return (
    <section className="flex flex-col flex-grow">
      <Header />

      <span className="relative mt-[20px] w-[60%] h-[1px] bg-[#C1C3EC] m-auto"></span>

      <div className="flex-grow flex flex-col items-center justify-around px-[16px]">
        <div className="flex flex-col items-center">
          <RiUser5Line className="text-[100px] dark:text-[#F3F7FF] text-[#282950]" />
          <div className="mt-[20px] flex items-center">
            {changeName.state ? (
              <div className="flex relative mt-[20px]">
                <h2 className="absolute bottom-[35px]">{t("Your new name:")}</h2>
                <input
                  className={`max-w-[100%] w-full text-[#000] dark:text-[#fff] p-[3px] bg-transparent border-2 
                    ${error ? "border-red-500" : "border-[#C1C3EC] dark:border-[#333560]"} 
                    caret-[#333560] focus:outline-none`}
                  value={changeName.newName}
                  onChange={(e) =>
                    setChangeName({ ...changeName, newName: e.target.value })
                  }
                />
                <RiCheckFill
                  onClick={handleChangeName}
                  className="text-[#FFC046] text-[36px] ml-[24px] cursor-pointer hover:opacity-60"
                />
              </div>
            ) : (
              <div className="flex items-center">
                <h2 className="text-[48px] font-bold dark:text-[#F3F7FF] text-[#282950]">
                  {userName}
                </h2>
                <RiPencilLine
                  onClick={handleClickOnPen}
                  className="text-[#FFC046] text-[26px] ml-[24px] cursor-pointer hover:opacity-60 duration-300"
                />
              </div>
            )}
          </div>
          <h3 className="mt-[14px] text-[#9194C3] text-[14px] font-semibold">
            {userEmail}
          </h3>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center">
            <RiNotification2Line className="text-[#5484FF] text-[20px]" />
            <span
              className="ml-[32px] text-[#5484FF] text-[20px] font-semibold"
              onClick={() => {
                openModalWithInfo("Coming Soon!");
              }}
            >
              {t("Notifications")}
            </span>
          </div>
          <div className="flex items-center">
            <RiMessage2Line className="text-[#5484FF] text-[20px]" />
            <span
              className="ml-[32px] text-[#5484FF] text-[20px] font-semibold"
              onClick={() => {
                openModalWithInfo("Coming Soon!");
              }}
            >
              {t("Help center")}
            </span>
          </div>
        </div>

        <div
          className="flex items-center mt-[20px] cursor-pointer"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine className="text-[#FF6193] text-[20px]" />
          <span className="ml-[32px] text-[#FF6193] text-[20px] font-semibold">
            {t("Logout")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
