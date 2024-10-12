import {
    RiCheckFill,
    RiLogoutBoxLine,
    RiMessage2Line,
    RiNotification2Line,
    RiPencilLine,
    RiUser5Line
} from 'react-icons/ri';
import useUserInfo from '../store/userInfo.js';
import Header from "./Header.jsx";
import {useNavigate} from 'react-router-dom';
import {useState} from "react"; // Для перенаправления
import { updateUserName } from '../api/user';  // Импорт функции для смены имени

const UserProfile = () => {
    const userName = useUserInfo((state) => state.userName);  // Получаем логин
    const userEmail = useUserInfo((state) => state.userEmail);  // Получаем email
    const setUserName = useUserInfo((state) => state.setUserName);  // Функция для изменения имени пользователя
    const clearUserInfo = useUserInfo((state) => state.clearUserInfo);  // Очистка данных пользователя
    const navigate = useNavigate();  // Для использования навигации
    const [changeName, setChangeName] = useState({state: false, newName: ''});
    const [error, setError] = useState(null);

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

    function handleClickOnPen() {
        setChangeName((prevValue) => ({...prevValue, state: !prevValue.state}));
    }

    // Функция для отправки запроса на изменение имени с валидацией
    const handleChangeName = async () => {
        const regex = /^[a-zA-Z0-9]{6,}$/;  // Регулярное выражение для проверки имени (только буквы и цифры, минимум 6 символов)
        if (!regex.test(changeName.newName)) {
            setError('Имя должно содержать минимум 6 символов, только латинские буквы и цифры');
            return;
        }

        try {
            const result = await updateUserName(changeName.newName);  // Запрос на смену имени
            setUserName(result.newLogin);  // Меняем имя в состоянии
            clearUserInfo();
            navigate('/signin');  // Перенаправляем на страницу входа
        } catch (err) {
            setError('Это имя уже занято');  // Если запрос вернул ошибку
        }
    };

    return (
        <section className="flex flex-col flex-grow">
            <Header/>

            <span className="relative mt-[20px] w-[60%] h-[1px] bg-[#C1C3EC] m-auto"></span>

            <div className="flex-grow flex flex-col items-center justify-around px-[16px]">
                <div className="flex flex-col items-center">
                    <RiUser5Line className="text-[100px] dark:text-[#F3F7FF] text-[#282950]"/>
                    <div className="mt-[20px] flex items-center">
                        {changeName.state ?
                            <div className="flex relative mt-[20px]">
                                <h2 className="absolute bottom-[35px]">Ваше новое имя:</h2>
                                <input
                                    className={`max-w-[100%] w-full text-[#000] dark:text-[#fff] p-[3px] bg-transparent border-2 
                    ${error ? 'border-red-500' : 'border-[#C1C3EC] dark:border-[#333560]'} 
                    caret-[#333560] focus:outline-none`}
                                    value={changeName.newName}
                                    onChange={(e) => setChangeName({...changeName, newName: e.target.value})}
                                />
                                <RiCheckFill onClick={handleChangeName}
                                             className="text-[#FFC046] text-[36px] ml-[24px] cursor-pointer hover:opacity-60"/>
                            </div>
                            :
                            <div className="flex items-center">
                                <h2 className="text-[48px] font-bold dark:text-[#F3F7FF] text-[#282950]">
                                    {userName}
                                </h2>
                                <RiPencilLine onClick={handleClickOnPen}
                                              className="text-[#FFC046] text-[26px] ml-[24px] cursor-pointer hover:opacity-60 duration-300"/>
                            </div>
                        }
                    </div>
                    <h3 className="mt-[14px] text-[#9194C3] text-[14px] font-semibold">{userEmail}</h3>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}  {/* Вывод ошибки */}
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-center">
                        <RiNotification2Line className="text-[#5484FF] text-[20px]"/>
                        <span className="ml-[32px] text-[#5484FF] text-[20px] font-semibold">
                            Notifications
                        </span>
                    </div>
                    <div className="flex items-center">
                        <RiMessage2Line className="text-[#5484FF] text-[20px]"/>
                        <span className="ml-[32px] text-[#5484FF] text-[20px] font-semibold">
                            Help center
                        </span>
                    </div>
                </div>

                <div className="flex items-center mt-[20px] cursor-pointer" onClick={handleLogout}>
                    <RiLogoutBoxLine className="text-[#FF6193] text-[20px]"/>
                    <span className="ml-[32px] text-[#FF6193] text-[20px] font-semibold">Logout</span>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
