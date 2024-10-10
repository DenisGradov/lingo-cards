import useModalStore from '../store/modalStore';

const Modal = () => {
    const { isOpen, title, description, hasCloseIcon, buttons, closeModal } = useModalStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#181830] rounded-lg shadow-lg max-w-md w-full p-6 relative">
                {hasCloseIcon && (
                    <button onClick={closeModal} className="absolute top-4 right-4 text-white text-xl">
                        &times;
                    </button>
                )}
                <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
                <p className="text-white text-opacity-75 mb-6">{description}</p>
                <div className="flex space-x-4">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            onClick={button.func}
                            className="bg-[#936dff] hover:bg-[#7c59e6] text-white py-2 px-4 rounded-md transition"
                        >
                            {button.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
