
import {NavLink} from 'react-router-dom';
import {RiCrosshair2Line, RiMap2Line, RiUser5Line} from "react-icons/ri";
const Footer = () => {
    return (
        <nav className="absolute w-full py-[24px] bottom-0 bg-[#F6F7FF] dark:bg-[#936dff] rounded-t shadow">
            <ul className="flex justify-around">
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `flex flex-col items-center dark:text-[#F3F7FF] text-[#282950] duration-300 ${isActive ? 'opacity-1' : 'opacity-60'}`
                        }
                        to="/"
                        style={{ textDecoration: 'none' }}
                    >
                        <RiCrosshair2Line className="text-2xl mb-1"/>
                        <span>Training</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `flex flex-col items-center dark:text-[#F3F7FF] text-[#282950] duration-300 ${isActive ? 'opacity-1' : 'opacity-60'}`
                        }
                        to="/library"
                        style={{ textDecoration: 'none' }}
                    >
                        <RiMap2Line className="text-2xl mb-1" />
                        <span>Library</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `flex flex-col items-center dark:text-[#F3F7FF] text-[#282950] duration-300 ${isActive ? 'opacity-1' : 'opacity-60'}`
                        }
                        to="/me"
                        style={{ textDecoration: 'none' }}
                    >
                        <RiUser5Line className="text-2xl mb-1" />
                        <span>Profile</span>
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
};

export default Footer;