import useThemeStore from '../store/themeStore';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

const UserProfile = () => {
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <div className="p-6 bg-[#f0f0f0] dark:bg-[#121212] text-black dark:text-white">
            <h2 className="text-3xl font-bold mb-4">Profile</h2>
            <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg dark:bg-gray-700"
            >
                {isDark ? <RiSunLine className="text-2xl" /> : <RiMoonLine className="text-2xl" />}
                <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
            </button>
        </div>
    );
};

export default UserProfile;
