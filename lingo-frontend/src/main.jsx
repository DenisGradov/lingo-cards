import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Modal from './components/Modal';
import useModalStore from './store/modalStore';
import { useEffect, useMemo } from 'react';

import InfoSlides from './components/InfoSlides.jsx';
import useInfoSlidesStore from './store/infoSlidesStore.js';

function Main() {
  const isModalOpen = useModalStore((state) => state.isOpen);

  const {
    isOpen,
    currentSlide,
    slides,
    completeSlides,
    nextSlide,
    previousSlide,
  } = useInfoSlidesStore();

  const modalProps = useMemo(
    () => ({
      title: useModalStore.getState().title,
      description: useModalStore.getState().description,
      hasCloseIcon: useModalStore.getState().hasCloseIcon,
      buttons: useModalStore.getState().buttons,
    }),
    [isModalOpen]
  );

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

createRoot(document.getElementById('root')).render(<Main />);
