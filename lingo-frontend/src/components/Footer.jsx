import { NavLink } from 'react-router-dom';
import { RiCrosshair2Line, RiMap2Line, RiUser5Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <nav className="relative w-full bg-[#F6F7FF] dark:bg-[#936dff] rounded-t shadow h-[80px] mt-[-14px] flex-shrink-0">
            <ul className="select-none max-w-[550px] w-full m-auto flex justify-around">
                <li className="w-full h-full">
                    <NavLink
                        className={({isActive}) =>
                            `w-full h-full py-[14px] flex flex-col items-center dark:text-[#F3F7FF] text-[#282950] duration-300 ${
                                isActive ? 'opacity-1' : 'opacity-60'
                            }`
                        }
                        to="/"
                        style={{textDecoration: 'none'}}
                    >
                        <RiCrosshair2Line className="text-2xl mb-1"/>
                        <span>{t("Training")}</span>
                    </NavLink>
                </li>
                <li className="w-full h-full">
                    <NavLink
                        className={({isActive}) =>
                            `w-full h-full py-[14px] flex flex-col items-center dark:text-[#F3F7FF] text-[#282950] duration-300 ${
                                isActive ? 'opacity-1' : 'opacity-60'
                            }`
                        }
                        to="/playlists"
                        style={{textDecoration: 'none'}}
                    >
                        <RiMap2Line className="text-2xl mb-1"/>
                        <span>{t("Library")}</span>
                    </NavLink>
                </li>
                <li className="w-full h-full">
                    <NavLink
                        className={({isActive}) =>
                            `w-full h-full py-[14px] flex flex-col items-center dark:text-[#F3F7FF] text-[#282950] duration-300 ${
                                isActive ? 'opacity-1' : 'opacity-60'
                            }`
                        }
                        to="/me"
                        style={{textDecoration: 'none'}}
                    >
                        <RiUser5Line className="text-2xl mb-1"/>
                        <span>{t("Profile")}</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Footer;
