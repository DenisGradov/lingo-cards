import useModalStore from '../store/modalStore';
import { useState, useEffect } from "react";
import usePlaylistsStore from "../store/playlistsStore.js";
import useWordsStore from "../store/wordsStore.js";

const Modal = () => {
    const {
        isOpen,
        contentType,
        title,
        description,
        hasCloseIcon,
        buttons,
        closeModal,
        inputs,
        selects,
        textareas,
        formButtons,
        selectedWord
    } = useModalStore();
    const [playlistInfo, setPlaylistInfo] = useState({
        name: '',
        description: '',
        language: 'en',
    });
    const [wordInfo, setWordInfo] = useState({
        word: '',
        translation: '',
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    const addPlaylist = usePlaylistsStore((state) => state.addPlaylist);
    const addWord = useWordsStore((state) => state.addWord);
    const editWord = useWordsStore((state) => state.editWord);
    const deleteWord = useWordsStore((state) => state.deleteWord); // Добавляем deleteWord

    useEffect(() => {
        if (contentType === 'editWord' && selectedWord) {
            setWordInfo({ word: selectedWord.word, translation: selectedWord.translation });
        }
    }, [contentType, selectedWord]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (contentType === 'playlist') {
            setPlaylistInfo((prev) => ({ ...prev, [name]: value }));
        } else if (contentType === 'word' || contentType === 'editWord') {
            setWordInfo((prev) => ({ ...prev, [name]: value }));
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (contentType === 'playlist') {
            if (playlistInfo.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
            if (playlistInfo.description.length < 3) newErrors.description = 'Description must be at least 3 characters';
        } else if (contentType === 'word' || contentType === 'editWord') {
            if (wordInfo.word.length < 1) newErrors.word = 'Word cannot be empty';
            if (wordInfo.translation.length < 1) newErrors.translation = 'Translation cannot be empty';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            if (contentType === 'playlist') {
                await addPlaylist(playlistInfo);
            } else if (contentType === 'word') {
                await addWord({ ...wordInfo, next_review_time: 0 });
            } else if (contentType === 'editWord' && selectedWord) {
                await editWord(selectedWord.id, wordInfo);
            }
            closeModal();
        } catch (error) {
            setError('Network error. Please try again later.');
        }
    };

    const handleDelete = async () => {
        if (selectedWord) {
            try {
                await deleteWord(selectedWord.id); // Удаляем слово по его ID
                closeModal();
            } catch (error) {
                setError('Failed to delete the word.');
            }
        }
    };

    const formData = contentType === 'playlist' ? playlistInfo : wordInfo;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="dark:bg-[#181830] bg-[#FFFFFF] rounded-lg shadow-lg max-w-md w-full p-6 relative">
                {hasCloseIcon && (
                    <button onClick={closeModal} className="absolute top-4 right-4 dark:text-white text-[#181830] text-xl">
                        &times;
                    </button>
                )}
                <h2 className="dark:text-white text-[#181830] text-2xl font-bold mb-4">{title}</h2>
                <p className="dark:text-white text-[#181830] text-opacity-75 mb-6">{description}</p>

                <form className="mt-[30px] flex flex-col" onSubmit={handleSubmit}>
                    {inputs.map((input, index) => (
                        <div key={index} className="mb-[10px] flex flex-col gap-y-[5px]">
                            <label htmlFor={input.name} className="dark:text-white text-[#181830]">{input.name}</label>
                            <input
                                type={input.type}
                                name={input.name}
                                value={formData[input.name] || ''}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                                    ${errors[input.name] ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors[input.name] && (
                                <p className="text-red-500 text-sm">{errors[input.name]}</p>
                            )}
                        </div>
                    ))}
                    {textareas.map((textarea, index) => (
                        <div key={index} className="mb-[10px] flex flex-col gap-y-[5px]">
                            <label htmlFor={textarea.name} className="dark:text-white text-[#181830]">{textarea.name}</label>
                            <textarea
                                name={textarea.name}
                                value={formData[textarea.name] || ''}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                                    ${errors[textarea.name] ? 'border-red-500' : 'border-gray-300'}`}
                            ></textarea>
                            {errors[textarea.name] && (
                                <p className="text-red-500 text-sm">{errors[textarea.name]}</p>
                            )}
                        </div>
                    ))}
                    {selects.map((select, index) => (
                        <div key={index} className="mb-[20px] flex flex-col gap-y-[5px]">
                            <label htmlFor={select.name} className="dark:text-white text-[#181830]">{select.name}</label>
                            <select
                                name={select.name}
                                value={formData[select.name] || ''}
                                onChange={handleChange}
                                className='block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                            >
                                {select.options.map((option, index) => (
                                    <option key={index} value={option.code}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    {formButtons.map((button, index) => (
                        <button
                            key={index}
                            type={button.name === 'Delete' ? 'button' : 'submit'}
                            onClick={button.name === 'Delete' ? handleDelete : undefined}
                            className="bg-[#936dff] hover:bg-[#7c59e6] text-white my-2 py-2 px-4 rounded-md transition"
                        >
                            {button.name}
                        </button>
                    ))}
                </form>

                <div className="flex space-x-4">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            onClick={button.func}
                            className="bg-[#936dff] hover:bg-[#7c59e6] text-white  py-2 px-4 rounded-md transition"
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
