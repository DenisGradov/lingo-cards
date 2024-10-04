import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Training from './components/Training';
import Library from './components/Library';
import Footer from './components/Footer';
import useThemeStore from './store/themeStore';
import { useEffect, useState } from 'react';
import UserProfile from './components/Me.jsx';
import SignIn from './components/Auth/SignIn.jsx';
import SignUp from './components/Auth/SignUp.jsx';
import useUserInfo from './store/userInfo';  // Подключаем хранилище для пользователя
import { useLocation } from 'react-router-dom';

function AppContent({ isAuthenticated }) {
    const location = useLocation();

    return (
        <div className="w-full flex-grow flex flex-col m-auto">
            <div className="max-w-[550px] w-full m-auto flex flex-col flex-grow">
                <Routes>
                    <Route
                        path="/"
                        element={isAuthenticated ? <Training /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/library"
                        element={isAuthenticated ? <Library /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/me"
                        element={isAuthenticated ? <UserProfile /> : <Navigate to="/signin" />}
                    />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
            {location.pathname !== '/signin' && location.pathname !== '/signup' && <Footer />}
        </div>
    );
}

function App() {
    const isDark = useThemeStore((state) => state.isDark);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const setUserName = useUserInfo((state) => state.setUserName);  // Для сохранения логина пользователя
    const setUserEmail = useUserInfo((state) => state.setUserEmail);  // Для сохранения email пользователя

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    // Проверка аутентификации и получение данных пользователя при загрузке
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/checkAuth`, {
                    credentials: 'include',
                });
                const data = await response.json();

                if (response.ok && data.message === 'Authenticated') {
                    setIsAuthenticated(true);
                    setUserName(data.user.login);  // Сохраняем логин пользователя
                    setUserEmail(data.user.email);  // Сохраняем email пользователя
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [setUserName, setUserEmail]);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen h-full flex items-center justify-center bg-[#fff] dark:bg-[#282950] text-black dark:text-white">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen h-full flex flex-col bg-[#fff] dark:bg-[#282950] text-black dark:text-white">
            <Router>
                <AppContent isAuthenticated={isAuthenticated} />
            </Router>
        </div>
    );
}

export default App;
