import './App.scss';
import './components/styles/cards.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Training from './components/Training';
import Library from './components/Library';
import Footer from './components/Footer';
import useThemeStore from './store/themeStore';
import { useEffect } from 'react';
import UserProfile from './components/Me.jsx';
import SignIn from './components/Auth/SignIn.jsx';
import SignUp from './components/Auth/SignUp.jsx';
import useUserInfo from './store/userInfo';  // Подключаем хранилище для пользователя
import { useLocation } from 'react-router-dom';
import useWordsStore from './store/wordsStore.js';
import usePlaylistsStore from "./store/playlistsStore.js";  // Подключаем хранилище для слов

function AppContent() {
    const location = useLocation();
    const isAuthenticated = useUserInfo((state) => state.isAuthenticated);


    return (
        <div className="w-full flex-grow flex flex-col m-auto overflow-hidden">
            <div className="max-w-[550px] w-full m-auto flex flex-col flex-grow">
                <Routes>
                    {/* Страницы входа и регистрации доступны всегда */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Защищенные страницы доступны только для авторизованных пользователей */}
                    <Route
                        path="/playlists"
                        element={isAuthenticated ? <Library /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/me"
                        element={isAuthenticated ? <UserProfile /> : <Navigate to="/signin" />}
                    />
                    {/* Общий маршрут размещаем последним */}
                    <Route
                        path="/"
                        element={isAuthenticated ? <Training /> : <Navigate to="/signin" />}
                    />
                </Routes>
            </div>
            {/* Футер не показывается на страницах signin/signup */}
            {location.pathname !== '/signin' && location.pathname !== '/signup' && <Footer />}
        </div>
    );
}


function App() {
    const isDark = useThemeStore((state) => state.isDark);
    const setIsAuthenticated = useUserInfo((state) => state.setIsAuthenticated);  // Для сохранения состояния аутентификации
    const setUserName = useUserInfo((state) => state.setUserName);  // Для сохранения логина пользователя
    const setUserEmail = useUserInfo((state) => state.setUserEmail);  // Для сохранения email пользователя
    const isAuthenticated = useUserInfo((state) => state.isAuthenticated);
    const saveWords = useWordsStore((state) => state.saveWords);
    const savePlaylists = usePlaylistsStore((state) => state.savePlaylists);
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
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/checkAuth`, {
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.ok && data.message === 'Authenticated') {
                    setIsAuthenticated(true);
                    setUserName(data.user.login);  // Сохраняем логин пользователя
                    setUserEmail(data.user.email); // Сохраняем email пользователя
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log('server error:', error);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [setUserName, setUserEmail, setIsAuthenticated]); // Добавляем зависимости для слов и плейлистов

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
                <AppContent />
            </Router>
        </div>
    );
}

export default App;
