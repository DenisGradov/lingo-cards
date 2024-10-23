import useModalStore from '../store/modalStore';
import {useEffect, useState} from "react";
import usePlaylistsStore from "../store/playlistsStore.js";

const Modal = () => {
    const { isOpen, title, description, hasCloseIcon, buttons, closeModal, inputs,selects,textareas,formButtons, } = useModalStore();
    const [playlistInfo, setPlaylistInfo] = useState({
        name: '',
        description: '',
        language: '',
    });
    const handleChange = (e) => {
        setPlaylistInfo({
            ...playlistInfo,
            [e.target.name]: e.target.value
        });
        setError(null); 
    };

    const [error, setError] = useState(null);
    const addPlaylist = usePlaylistsStore((state) => state.addPlaylist);  
   

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        console.log("creating playlist");
        e.preventDefault();
        try {
            addPlaylist(playlistInfo);
        } catch (error) {
            setError('Ошибка сети. Попробуйте позже.');
        }
    };



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

                {/* Форма */}
                <form className="mt-[30px] flex flex-col" onSubmit={handleSubmit}>
                    {inputs.map((input, index) => (
                        <div key={index} className="mb-[10px] flex flex-col gap-y-[5px]">
                            <label  htmlFor={input.name} className="dark:text-white text-[#181830]">{input.name}</label>
                            <input
                                type={input.type}
                                name={input.name}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    {textareas.map((textarea, index) => (
                        <div key={index} className="mb-[10px] flex flex-col gap-y-[5px]">
                            <label  htmlFor={textarea.name} className="dark:text-white text-[#181830]">{textarea.name}</label>
                            <textarea
                                name={textarea.name}
                                onChange={handleChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            ></textarea>
                        </div>
                    ))}
                    {selects.map((select, index) => (
                        <div key={index} className="mb-[20px] flex flex-col gap-y-[5px]">
                            <label  htmlFor={select.name} className="dark:text-white text-[#181830]">{select.name}</label>
                            <select
                                name={select.name}
                                onChange={handleChange}
                                className='block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                            >
                                {select.options.map((language,index)=>(
                                    <option key={index} value={language.code}>{language.name}</option>
                                ))}
                                
                            </select>
                        </div>
                    ))}
                        
                    {formButtons.map((button, index) => (
                        <button
                                key={index}
                                type='submit'
                                className="bg-[#936dff] hover:bg-[#7c59e6] text-white py-2 px-4 rounded-md transition"
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
