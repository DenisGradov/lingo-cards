import React, { useState, useEffect } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import useWordsStore from '../store/wordsStore.js';
import { reviewStages } from '../constants/reviewStages.js';
import {useTranslation} from "react-i18next";

const Learn = ({ setIsLearn }) => {
    const { words, updateWordStage } = useWordsStore(); // Функция updateWordStage синхронизирует изменения с бэкендом
    const [localPlaylist, setLocalPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isInitial, setIsInitial] = useState(false);
    const [mode] = useState(Math.random() < 0.5 ? 'original' : 'translation');
    const { t } = useTranslation();

    useEffect(() => {
        const playlist = words
            .filter(word => word.next_review_time === 0 || word.next_review_time <= Date.now())
            .map(word => ({
                ...word,
                learned: false,
            }));
        setLocalPlaylist(playlist);
        setIsInitial(true)
        console.log('Initial localPlaylist:', playlist);
    }, [words]);

    const visibleCards = localPlaylist
        .filter(word => !word.learned)
        .slice(currentIndex, currentIndex + 3);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextWord = async (learned) => {
        setIsFlipped(false); // Сброс состояния переворота сразу

        // Добавляем задержку, чтобы сброс анимации применился
        setTimeout(async () => {
            const updatedPlaylist = [...localPlaylist];
            const wordIndex = currentIndex % updatedPlaylist.length;
            const word = updatedPlaylist[wordIndex];
            const currentStage = reviewStages[word.review_stage] || reviewStages[0];
            let adjustedStage = word.review_stage;

            if (learned) {
                adjustedStage = Math.min(adjustedStage + 1, reviewStages.length - 1);

                if (adjustedStage === reviewStages.length - 1) {
                    updatedPlaylist.splice(wordIndex, 1);
                } else {
                    word.review_stage = adjustedStage;
                    word.next_review_time = Date.now() + reviewStages[adjustedStage].delay * 1000;
                }
            } else {
                adjustedStage = Math.max(adjustedStage - 1, 0);
                word.review_stage = adjustedStage;
                word.next_review_time = Date.now();
                updatedPlaylist.push(word);
            }

            await updateWordStage(word.id, word.review_stage, word.next_review_time);

            updatedPlaylist.splice(wordIndex, 1);
            setLocalPlaylist(updatedPlaylist);
            setCurrentIndex((prevIndex) => prevIndex % updatedPlaylist.length);

            console.log('Updated localPlaylist:', updatedPlaylist);
        }, 300); // Устанавливаем паузу в 300 мс для завершения анимации
    };


    useEffect(() => {
        if (!visibleCards.length && isInitial) {
            setIsLearn(false);
        }
    }, [visibleCards.length, isInitial, setIsLearn]);

    if (!visibleCards.length) return null;
    if (isInitial) return (
        <div className="flex flex-col items-center mt-[10px] px-[16px] relative">
            <div className="w-full">
                <RiArrowLeftLine
                    className="hover:opacity-60 cursor-pointer duration-300 text-[30px] mb-4"
                    onClick={() => setIsLearn(false)}
                />
            </div>

            <div className="relative w-[300px] h-[400px] perspective-1000">
                {/* Фоновые карточки */}
                {visibleCards.length > 1 && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 transform rotate-6 z-0 rounded-lg"></div>
                )}
                {visibleCards.length > 2 && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-100 transform -rotate-6 z-0 rounded-lg"></div>
                )}

                {/* Основная карточка */}
                <div
                    className={`card-container ${isFlipped ? 'flipped' : ''} z-10`}
                    onClick={handleFlip}
                >
                    {/* Передняя сторона */}
                    <div className="card front flex justify-center items-center bg-white text-black text-2xl font-semibold rounded-lg shadow-lg cursor-pointer">
                        <h3>{mode === 'original' ? visibleCards[0].word : visibleCards[0].translation}</h3>
                    </div>
                    {/* Задняя сторона */}
                    <div className="card back flex justify-center items-center bg-white text-black text-2xl font-semibold rounded-lg shadow-lg cursor-pointer">
                        <h3>{mode === 'original' ? visibleCards[0].translation : visibleCards[0].word}</h3>
                    </div>
                </div>

                {/* Кнопки "Знал" и "Не знал" */}
                <div className="flex justify-between w-full mt-6">
                    <button
                        onClick={() => handleNextWord(false)}
                        className="text-red-500 font-semibold px-4 py-2 bg-gray-200 rounded-md hover:bg-red-100"
                    >
                        {t("I didn't know")}
                    </button>
                    <button
                        onClick={() => handleNextWord(true)}
                        className="text-green-500 font-semibold px-4 py-2 bg-gray-200 rounded-md hover:bg-green-100"
                    >
                        {t("I knew")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Learn;
