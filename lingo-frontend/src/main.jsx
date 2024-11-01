import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Modal from "./components/Modal"; // Импортируем модальное окно
import useModalStore from "./store/modalStore"; // Импортируем хранилище состояния модалки
import { useEffect, useMemo } from "react"; // Для мемоизации состояния

import InfoSlides from "./components/infoSlides";
import { openInfoSlidesWithInfo } from "./utils/infoSlidesUtils";
import useInfoSlidesStore from "./store/infoSlidesStore";

function Main() {
  const isModalOpen = useModalStore((state) => state.isOpen); // Проверяем, активно ли модальное окно

  const {
    isOpen,
    currentSlide,
    slides,
    completeSlides,
    nextSlide,
    previousSlide,
  } = useInfoSlidesStore();

  // Мемозируем пропсы модального окна, чтобы предотвратить лишние рендеры
  const modalProps = useMemo(
    () => ({
      title: useModalStore.getState().title,
      description: useModalStore.getState().description,
      hasCloseIcon: useModalStore.getState().hasCloseIcon,
      buttons: useModalStore.getState().buttons,
    }),
    [isModalOpen]
  ); // Только при изменении состояния окна перерендериваем

  useEffect(() => {
    if (isModalOpen) {
      useModalStore.getState().closeModal();
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      {isOpen ? (
        <InfoSlides
          slides={slides}
          currentSlide={currentSlide}
          completeSlides={completeSlides}
          onNext={nextSlide}
          onPrevious={previousSlide}
        />
      ) : (
        <>
          <App />
          {isModalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              <Modal {...modalProps} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
