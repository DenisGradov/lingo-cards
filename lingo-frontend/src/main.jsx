import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Modal from './components/Modal';  // Импортируем модальное окно
import useModalStore from './store/modalStore';  // Импортируем хранилище состояния модалки
import { useMemo } from 'react';  // Для мемоизации состояния

function Main() {
    const isModalOpen = useModalStore((state) => state.isOpen);  // Проверяем, активно ли модальное окно

    // Мемозируем пропсы модального окна, чтобы предотвратить лишние рендеры
    const modalProps = useMemo(() => ({
        title: useModalStore.getState().title,
        description: useModalStore.getState().description,
        hasCloseIcon: useModalStore.getState().hasCloseIcon,
        buttons: useModalStore.getState().buttons,
    }), [isModalOpen]);  // Только при изменении состояния окна перерендериваем

    return (
        <div className="relative min-h-screen">
            <App />
            {isModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <Modal {...modalProps} />
                </div>
            )}
        </div>
    );
}

createRoot(document.getElementById('root')).render(
    <Main />
);
