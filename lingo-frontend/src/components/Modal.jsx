import React, { useState, useEffect } from 'react';
import { RiInbox2Line, RiStarFill } from 'react-icons/ri';
import ScrollContainer from 'react-indiana-drag-scroll';
import useModalStore from '../store/modalStore';
import usePlaylistsStore from '../store/playlistsStore.js';
import useWordsStore from '../store/wordsStore.js';
import { languages } from '../constants/mainConstants.js';
import { useTranslation } from 'react-i18next';

const Modal = () => {
  const {
    isOpen,
    contentType,
    title,
    description,
    hasCloseIcon,
    buttons,
    buttonsWithClose,
    closeModal,
    inputs,
    selects,
    textareas,
    formButtons,
    selectedWord,
  } = useModalStore();
  const [playlistInfo, setPlaylistInfo] = useState({
    name: '',
    description: '',
    language: 'en',
  });
  const [wordInfo, setWordInfo] = useState({ word: '', translation: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [multiAdd, setMultiAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const playlists = usePlaylistsStore((state) => state.playlists);
  const setPlaylists = usePlaylistsStore((state) => state.setPlaylists);
  const addPlaylist = usePlaylistsStore((state) => state.addPlaylist);
  const addWord = useWordsStore((state) => state.addWord);
  const editWord = useWordsStore((state) => state.editWord);
  const deleteWord = useWordsStore((state) => state.deleteWord);

  useEffect(() => {
    if (contentType === 'editWord' && selectedWord) {
      setWordInfo({
        word: selectedWord.word,
        translation: selectedWord.translation,
      });
      setSelectedPlaylist(selectedWord.playlist_id ?? null);
    }
  }, [contentType, selectedWord]);
  useEffect(() => {
    if (
      isOpen &&
      playlists.length === 0 &&
      (contentType === 'word' ||
        contentType === 'editWord' ||
        contentType === 'playlist')
    ) {
      setPlaylists();
    }
  }, [isOpen, playlists.length, setPlaylists, contentType]);

  if (!isOpen) return null;
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (contentType === 'word' || contentType === 'editWord') {
      setWordInfo((prev) => ({ ...prev, [name]: value }));
    } else if (contentType === 'playlist') {
      setPlaylistInfo((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setError(null);
  };

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylist((prevSelected) =>
      prevSelected === playlistId ? null : playlistId
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newErrors = {};

    if (contentType === 'word' || contentType === 'editWord') {
      if (!wordInfo.word.trim()) newErrors.word = 'The word cannot be empty';
      if (!wordInfo.translation.trim())
        newErrors.translation = 'The translation cannot be empty';
    } else if (contentType === 'playlist') {
      if (!playlistInfo.name.trim())
        newErrors.name = 'Playlist name cannot be empty';
      if (!playlistInfo.description.trim())
        newErrors.description = 'Description cannot be empty';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      let updatedPlaylists;
      if (contentType === 'playlist') {
        await addPlaylist(playlistInfo);
        closeModal();
      } else if (contentType === 'word') {
        const response = await addWord({
          ...wordInfo,
          next_review_time: 0,
          playlistId: selectedPlaylist,
        });
        updatedPlaylists = response.playlists;
        setWordInfo({ word: '', translation: '' });
        if (!multiAdd) closeModal();
      } else if (contentType === 'editWord' && selectedWord) {
        const response = await editWord(selectedWord.id, {
          ...wordInfo,
          playlistId: selectedPlaylist,
        });
        if (response) {
          updatedPlaylists = response.playlists;
        } else {
          console.log('something went wrong');
        }
      }

      if (updatedPlaylists) setPlaylists(updatedPlaylists);
    } catch (error) {
      setError('Network error. Please try again later.');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedWord) {
      try {
        const response = await deleteWord(selectedWord.id);
        if (response && response.playlists) {
          setPlaylists(response.playlists);
        }
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
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 dark:text-white text-[#181830] text-xl"
          >
            &times;
          </button>
        )}
        <h2 className="dark:text-white text-[#181830] text-2xl font-bold mb-4">
          {t(title)}
        </h2>
        <p className="dark:text-white text-[#181830] text-opacity-75 mb-6">
          {t(description)}
        </p>

        {(contentType === 'word' || contentType === 'editWord') && (
          <div className="mb-4">
            <p className="dark:text-white text-[#181830] mb-2">
              {t('Select Playlist')}
            </p>
            <ScrollContainer className="flex gap-x-4 overflow-auto">
              <div className="flex gap-x-[10px] cursor-pointer">
                {playlists.map((playlist, index) => (
                  <div
                    key={`playlist-${index}`}
                    style={{
                      backgroundImage: `url('${languages[playlist.language_code]?.flag || './flags/default.webp'}')`,
                    }}
                    className={`group relative bg-cover bg-center grow-0 shrink-0 w-16 h-16 rounded-t-3xl rounded-b-2xl select-none
                                            ${selectedPlaylist === playlist.id ? 'border-2 border-purple-500' : 'opacity-40'}`}
                    onClick={() => handlePlaylistSelect(playlist.id)}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-65 rounded-t-3xl rounded-b-2xl"></div>
                    <div className="relative flex flex-col justify-center items-center text-center w-full h-full">
                      <p className="text-xs font-medium mb-1 text-[#F3F7FF]">
                        {playlist.name}
                      </p>
                      <div className="flex items-center justify-center gap-[6px]">
                        <RiInbox2Line className="text-[10px] text-[#5890FF]" />
                        <span className="text-xs font-medium text-[#F3F7FF]">
                          {playlist.number_of_cards || 0}
                        </span>
                        <RiStarFill className="text-[10px] text-[#FFE168]" />
                        <span className="text-xs font-medium text-[#FFE168]">
                          {playlist.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollContainer>
            {errors.playlist && (
              <p className="text-red-500 text-sm mt-1">{t(errors.playlist)}</p>
            )}
          </div>
        )}

        <form className="mt-[30px] flex flex-col" onSubmit={handleSubmit}>
          {inputs.map((input, index) => (
            <div key={index} className="mb-[10px] flex flex-col gap-y-[5px]">
              <label
                htmlFor={input.name}
                className="dark:text-white text-[#181830]"
              >
                {t(input.name)}
              </label>
              <input
                type={input.type}
                name={input.name}
                value={formData[input.name] || ''}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                                    ${errors[input.name] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors[input.name] && (
                <p className="text-red-500 text-sm">{t(errors[input.name])}</p>
              )}
            </div>
          ))}
          {textareas.map((textarea, index) => (
            <div key={index} className="mb-[10px] flex flex-col gap-y-[5px]">
              <label
                htmlFor={textarea.name}
                className="dark:text-white text-[#181830]"
              >
                {t(textarea.name)}
              </label>
              <textarea
                name={textarea.name}
                value={formData[textarea.name] || ''}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                                    ${errors[textarea.name] ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {errors[textarea.name] && (
                <p className="text-red-500 text-sm">
                  {t(errors[textarea.name])}
                </p>
              )}
            </div>
          ))}
          {selects.map((select, index) => (
            <div key={index} className="mb-[20px] flex flex-col gap-y-[5px]">
              <label
                htmlFor={select.name}
                className="dark:text-white text-[#181830]"
              >
                {t(select.name)}
              </label>
              <select
                name={select.name}
                value={formData[select.name] || ''}
                onChange={handleChange}
                className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {select.options.map((option, index) => (
                  <option key={index} value={option.code}>
                    {t(option.name)}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {formButtons.map((button, index) => (
            <button
              key={index}
              type={button.name === 'Delete' ? 'button' : 'submit'}
              onClick={button.name === 'Delete' ? handleDelete : undefined} // Привязка handleDelete к кнопке
              className={`bg-[#936dff] hover:bg-[#7c59e6] text-white my-2 py-2 px-4 rounded-md transition ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {t(isLoading ? 'Loading...' : button.name)}
            </button>
          ))}

          {contentType === 'word' && (
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={multiAdd}
                  onChange={() => setMultiAdd(!multiAdd)}
                  className="form-checkbox text-purple-500"
                />
                <span className="ml-2 text-sm dark:text-white text-[#181830]">
                  {t('Add Multiple Words')}
                </span>
              </label>
            </div>
          )}
        </form>

        <div className="flex space-x-4 mt-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.func}
              className="bg-[#936dff] hover:bg-[#7c59e6] text-white py-2 px-4 rounded-md transition"
            >
              {t(button.name)}
            </button>
          ))}
        </div>
        <div className="flex space-x-4 mt-4">
          {buttonsWithClose.map((button, index) => (
            <button
              key={index}
              onClick={() => {
                closeModal();
              }}
              className="bg-[#936dff] hover:bg-[#7c59e6] text-white py-2 px-4 rounded-md transition"
            >
              {t(button.name)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
