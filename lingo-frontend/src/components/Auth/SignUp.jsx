import {useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import Header from '../Header.jsx';

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        login: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="flex flex-col flex-grow px-[10px] justify-center">
            <div className="fixed top-0 max-w-[550px] w-full">
                <Header/>
            </div>
            <div className="mt-[60px]">
                <h1 className="text-[48px] font-bold">Get Started</h1>
                <h3 className="text-[14px] text-[#9194C3] font-semibold">Create Your Account</h3>
            </div>
            <form className="mt-[30px] flex flex-col">
                <span className="text-[#9194C3] text-[14px] font-semibold">Login</span>
                <input
                    className=" max-w-[100%] w-full text-[#000] dark:text-[#fff] py-[12px] bg-transparent border-b-2 border-[#C1C3EC] dark:border-[#333560] caret-[#333560] focus:outline-none"
                    name="login"
                    placeholder="Login"
                    value={userInfo.login}
                    onChange={handleChange}
                />
                <span className="mt-[22px] text-[#9194C3] text-[14px] font-semibold">E-Mail</span>
                <input
                    className=" max-w-[100%] w-full text-[#000] dark:text-[#fff] py-[12px] bg-transparent border-b-2 border-[#C1C3EC] dark:border-[#333560] caret-[#333560] focus:outline-none"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={userInfo.email}
                    onChange={handleChange}
                />

                <span className="mt-[22px] text-[#9194C3] text-[14px] font-semibold">Password</span>
                <div className="mt-4 relative max-w-[100%] w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full text-[#000] dark:text-[#fff] py-[12px] bg-transparent border-b-2 border-[#C1C3EC] dark:border-[#333560] caret-[#333560] focus:outline-none"
                        name="password"
                        placeholder="Password"
                        value={userInfo.password}
                        onChange={handleChange}
                    />
                    <div className="absolute right-0 top-3 cursor-pointer hover:opacity-60"
                         onClick={togglePasswordVisibility}>
                        {showPassword ? <AiFillEyeInvisible size={24} color="#946DFF"/> :
                            <AiFillEye size={24} color="#946DFF"/>}
                    </div>
                </div>
                <div className="mt-[50px] flex flex-col items-center">
                    <div
                        className="duration-300 hover:opacity-60 cursor-pointer bg-[#936dff] text-[#F3F7FF] text-[14px] font-bold py-[20px] rounded-2xl w-full flex justify-center">
                        Sign Up
                    </div>
                    <span className="mt-[24px] text-[#9194C3] text-[14px] font-semibold">Have an Account? <NavLink to="/signin"
                                                                                                     className="text-[#000] dark:text-[#fff] text-[14px] font-semibold duration-300 hover:opacity-60 cursor-pointer ">Login</NavLink></span>
                </div>

            </form>
        </section>
    );
};

export default SignUp;
