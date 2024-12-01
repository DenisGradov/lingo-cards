import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import Header from '../Header.jsx';
import useUserInfo from "../../store/userInfo.js";
import usePlaylistsStore from "../../store/playlistsStore.js";
import useWordsStore from "../../store/wordsStore.js";
import { registerUser } from "../../api/user.js";
import {useTranslation} from "react-i18next";

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        login: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const setUserName = useUserInfo((state) => state.setUserName);
    const setUserEmail = useUserInfo((state) => state.setUserEmail);
    const navigate = useNavigate();
    const isAuthenticated = useUserInfo((state) => state.isAuthenticated);
    const setIsAuthenticated = useUserInfo((state) => state.setIsAuthenticated);
    const clearPlaylists = usePlaylistsStore((state) => state.clearPlaylists);
    const clearWords = useWordsStore((state) => state.clearWords);

    const { t } = useTranslation();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        setError(null);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userInfo.login.length < 3) {
            setError('');
            setError(t("The login must contain at least 3 characters."));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userInfo.email)) {
            setError(t("Enter a valid E-Mail."));
            return;
        }

        if (!userInfo.login || !userInfo.email || !userInfo.password) {
            setError(t("All fields are mandatory."));
            return;
        }

        try {
            const data = await registerUser(userInfo);
            clearPlaylists();
            clearWords();
            setIsAuthenticated(true);
            setUserName(data.user.login);
            setUserEmail(data.user.email);
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
            <div className="mt-[60px]">
                <h1 className="text-[48px] font-bold">{t("Get Started")}</h1>
                <h3 className="text-[14px] text-[#9194C3] font-semibold">{("Create Your Accountt")}</h3>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form className="big:mt-[120px] mt-[20px] flex flex-col" onSubmit={handleSubmit}>
                <span className="text-[#9194C3] text-[14px] font-semibold">{t("Login")}</span>
                <input
                    className={`max-w-[100%] w-full text-[#000] dark:text-[#fff] py-[12px] bg-transparent border-b-2 
                    ${error ? 'border-red-500' : 'border-[#C1C3EC] dark:border-[#333560]'} 
                    caret-[#333560] focus:outline-none`}
                    name="login"
                    placeholder="Login"
                    value={userInfo.login}
                    onChange={handleChange}
                />

                <span className="mt-[22px] text-[#9194C3] text-[14px] font-semibold">{t("E-Mail")}</span>
                <input
                    className={`max-w-[100%] w-full text-[#000] dark:text-[#fff] py-[12px] bg-transparent border-b-2 
                    ${error ? 'border-red-500' : 'border-[#C1C3EC] dark:border-[#333560]'} 
                    caret-[#333560] focus:outline-none`}
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={userInfo.email}
                    onChange={handleChange}
                />

                <span className="mt-[22px] text-[#9194C3] text-[14px] font-semibold">{t("Password")}</span>
                <div className="mt-4 relative max-w-[100%] w-full">
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
                    <div className="absolute right-2 top-3 cursor-pointer hover:opacity-60" onClick={togglePasswordVisibility}>
                        {showPassword ? <AiFillEyeInvisible size={24} color="#946DFF" /> : <AiFillEye size={24} color="#946DFF" />}
                    </div>
                </div>

                <div className="big:mt-[120px] mt-[20px] flex flex-col items-center">
                    <button
                        type="submit"
                        className="duration-300 hover:opacity-60 cursor-pointer bg-[#936dff] text-[#F3F7FF] text-[14px] font-bold py-[20px] rounded-2xl w-full flex justify-center"
                    >
                        {t("Sign Up")}
                    </button>
                    <span className="mt-[24px] text-[#9194C3] text-[14px] font-semibold">
                        {t("Have an Account?")} <NavLink to="/signin" className="text-[#000] dark:text-[#fff] text-[14px] font-semibold duration-300 hover:opacity-60 cursor-pointer">{t("Login")}</NavLink>
                    </span>
                </div>
            </form>
        </section>
    );
};

export default SignUp;
