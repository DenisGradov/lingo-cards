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
               hi
        </div>
    );

}

export default App;
