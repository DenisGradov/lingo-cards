import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Header.jsx';
import useUserInfo from "../../store/userInfo.js";
import usePlaylistsStore from "../../store/playlistsStore.js";
import useWordsStore from "../../store/wordsStore.js";
import { signInUser } from "../../api/user.js";
import {useTranslation} from "react-i18next";
import {openModalWithInfo} from "../../utils/modalUtils.js"; // Импортируем функцию для авторизации

const SignIn = () => {
    const [userInfo, setUserInfo] = useState({
        login: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const setUserName = useUserInfo((state) => state.setUserName);
    const setUserEmail = useUserInfo((state) => state.setUserEmail);
    const isAuthenticated = useUserInfo((state) => state.isAuthenticated);
    const setIsAuthenticated = useUserInfo((state) => state.setIsAuthenticated);
    const clearPlaylists = usePlaylistsStore((state) => state.clearPlaylists);
    const clearWords = useWordsStore((state) => state.clearWords);
    const saveWords = useWordsStore((state) => state.saveWords);

    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        setError(null);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signInUser(userInfo);
            clearPlaylists();
            clearWords();
            setUserName(data.user.login);
            setUserEmail(data.user.email);
            saveWords(data.words);
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            setError(error.message || t("Network error. Try later."));
        }
    };

    return (
        <section className="flex flex-col flex-grow px-[10px] justify-center">
            <div className="fixed top-0 max-w-[550px] w-full">
                <Header />
            </div>
            <div className="mt-[40px]">
                <h1 className="text-[48px] font-bold">{t("Welcome")}</h1>
                <h3 className="text-[14px] text-[#9194C3] font-semibold">{t("Learn languages easily")}</h3>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form className="mt-[120px] flex flex-col" onSubmit={handleSubmit}>
                <span className="text-[#9194C3] text-[14px] font-semibold">{t("Login")}</span>
                <input
                    className={`max-w-[100%] w-full text-[#000] dark:text-[#fff] py-[12px] bg-transparent border-b-2 
                    ${error ? 'border-red-500' : 'border-[#C1C3EC] dark:border-[#333560]'} 
                    caret-[#333560] focus:outline-none`}
                    name="login"
                    placeholder="Login or mail"
                    value={userInfo.login}
                    onChange={handleChange}
                />

                <div className="mt-4 relative max-w-[100%] w-full">
                    <span className="text-[#9194C3] text-[14px] font-semibold">{t("Password")}</span>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`w-full text-[#000] dark:text-[#fff] py-[12px] bg-transparent border-b-2 
                        ${error ? 'border-red-500' : 'border-[#C1C3EC] dark:border-[#333560]'} 
                        caret-[#333560] focus:outline-none`}
                            name="password"
                            placeholder="Password"
                            value={userInfo.password}
                            onChange={handleChange}
                        />
                        <div className="absolute right-2 cursor-pointer hover:opacity-60"
                             onClick={togglePasswordVisibility}>
                            {showPassword ? <AiFillEyeInvisible size={24} color="#946DFF"/> :
                                <AiFillEye size={24} color="#946DFF"/>}
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <span className="text-[16px] font-bold text-[#745BFF] hover:opacity-60 cursor-pointer duration-300" onClick={()=>{openModalWithInfo("Coming Soon!");}}>{t("Forgot Password")}</span>
                </div>

                <div className="mt-[120px] flex flex-col items-center">
                    <button
                        type="submit"
                        className="duration-300 hover:opacity-60 cursor-pointer bg-[#936dff] text-[#F3F7FF] text-[14px] font-bold py-[20px] rounded-2xl w-full flex justify-center"
                    >
                        {t("Login")}
                    </button>
                    <span className="mt-[24px] text-[#9194C3] text-[14px] font-semibold">
                        {t("Or")} <NavLink to="/signup"
                                    className="text-[#000] dark:text-[#fff] text-[14px] font-semibold duration-300 hover:opacity-60 cursor-pointer">{t("Register")} </NavLink>
                    </span>
                </div>
            </form>
        </section>
    );
};

export default SignIn;
