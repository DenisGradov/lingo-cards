import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Training from './components/Training';
import Library from './components/Library';
import Footer from './components/Footer';
import useThemeStore from './store/themeStore';
import { useEffect } from 'react';
import UserProfile from "./components/Me.jsx";

function App() {
    const isDark = useThemeStore((state) => state.isDark);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="min-h-screen h-full flex flex-col bg-[#fff] dark:bg-[#282950] text-black dark:text-white">
            <Router>
                <div className="w-full flex-grow flex flex-col m-auto">
                    <div className="max-w-[550px] w-full m-auto flex flex-col flex-grow">
                        <Routes>
                            <Route path="/" element={<Training />} />
                            <Route path="/library" element={<Library />} />
                            <Route path="/me" element={<UserProfile />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </div>
    );

}

export default App;
