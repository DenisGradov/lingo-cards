import {useEffect, useState} from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Header.jsx';
import useUserInfo from "../../store/userInfo.js";

const SignIn = () => {
    const [userInfo, setUserInfo] = useState({
        login: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const setUserName = useUserInfo((state) => state.setUserName);  // Устанавливаем имя пользователя в состояние
    const setUserEmail = useUserInfo((state) => state.setUserEmail);  // Устанавливаем email пользователя
    const isAuthenticated = useUserInfo((state) => state.isAuthenticated);
    const setIsAuthenticated = useUserInfo((state) => state.setIsAuthenticated); // Устанавливаем аутентификацию

    const navigate = useNavigate();
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        setError(null);  // Сбрасываем ошибку при изменении полей
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
                method: 'POST',
                credentials: 'include', // Добавляем куки для аутентификации
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });
            const data = await response.json();
            if (response.ok) {
                // Устанавливаем имя и email в Zustand после успешного логина
                setUserName(data.user.login);
                setUserEmail(data.user.email);
                setIsAuthenticated(true);  // Устанавливаем флаг аутентификации
                navigate('/');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Ошибка сети. Попробуйте позже.');
        }
    };

    return (
        <section className="flex flex-col flex-grow px-[10px] justify-center">
            <div className="fixed top-0 max-w-[550px] w-full">
                <Header />
            </div>
            <div className="mt-[40px]">
                <h1 className="text-[48px] font-bold">Welcome</h1>
                <h3 className="text-[14px] text-[#9194C3] font-semibold">Learn languages easily</h3>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}  {/* Вывод ошибки */ }

            <form className="mt-[120px] flex flex-col" onSubmit={handleSubmit}>

                <span className="text-[#9194C3] text-[14px] font-semibold">Login</span>
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
                    <span className="text-[#9194C3] text-[14px] font-semibold">Password</span>
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
                    <div className="absolute right-0 top-3 cursor-pointer hover:opacity-60" onClick={togglePasswordVisibility}>
                        {showPassword ? <AiFillEyeInvisible size={24} color="#946DFF" /> : <AiFillEye size={24} color="#946DFF" />}
                    </div>
                </div>

                <div className="mt-4">
                    <span className="text-[16px] font-bold text-[#745BFF] hover:opacity-60 cursor-pointer duration-300">Forgot Password</span>
                </div>

                <div className="mt-[120px] flex flex-col items-center">
                    <button
                        type="submit"
                        className="duration-300 hover:opacity-60 cursor-pointer bg-[#936dff] text-[#F3F7FF] text-[14px] font-bold py-[20px] rounded-2xl w-full flex justify-center"
                    >
                        Login
                    </button>
                    <span className="mt-[24px] text-[#9194C3] text-[14px] font-semibold">
                        Or <NavLink to="/signup" className="text-[#000] dark:text-[#fff] text-[14px] font-semibold duration-300 hover:opacity-60 cursor-pointer">Register</NavLink>
                    </span>
                </div>
            </form>
        </section>
    );
};

export default SignIn;
