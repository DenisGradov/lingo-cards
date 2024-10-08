import { RiLogoutBoxLine, RiMessage2Line, RiNotification2Line, RiPencilLine, RiUser5Line } from 'react-icons/ri';
import useUserInfo from '../store/userInfo.js';
import Header from "./Header.jsx";
import { useNavigate } from 'react-router-dom';  // Для перенаправления

const UserProfile = () => {
    const userName = useUserInfo((state) => state.userName);  // Получаем логин
    const userEmail = useUserInfo((state) => state.userEmail);  // Получаем email
    const clearUserInfo = useUserInfo((state) => state.clearUserInfo);  // Получаем email
    const navigate = useNavigate();  // Для использования навигации

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
                method: 'POST',
                credentials: 'include',  // Для отправки куков
            });
            if (response.ok) {
                clearUserInfo();
                navigate('/signin');  // Перенаправляем на страницу входа
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
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
                        <h2 className="text-[48px] font-bold dark:text-[#F3F7FF] text-[#282950]">
                            {userName}  {/* Отображаем логин */}
                        </h2>
                        <RiPencilLine className="text-[#FFC046] text-[26px] ml-[24px]" />
                    </div>
                    <h3 className="mt-[14px] text-[#9194C3] text-[14px] font-semibold">{userEmail}</h3>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-center">
                        <RiNotification2Line className="text-[#5484FF] text-[20px]" />
                        <span className="ml-[32px] text-[#5484FF] text-[20px] font-semibold">
                            Notifications
                        </span>
                    </div>
                    <div className="flex items-center">
                        <RiMessage2Line className="text-[#5484FF] text-[20px]" />
                        <span className="ml-[32px] text-[#5484FF] text-[20px] font-semibold">
                            Help center
                        </span>
                    </div>
                </div>

                <div className="flex items-center mt-[20px] cursor-pointer" onClick={handleLogout}>
                    <RiLogoutBoxLine className="text-[#FF6193] text-[20px]" />
                    <span className="ml-[32px] text-[#FF6193] text-[20px] font-semibold">Logout</span>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
