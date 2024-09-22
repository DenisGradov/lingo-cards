import { create } from 'zustand';
import { getItem, setItem } from '../utils/localStorage'; // Подключаем утилиту

const useCardStore = create((set) => ({
    teach: getItem('teach', 0),
    iKnow: getItem('iKnow', 0),
    learned: getItem('learned', 0),
}));

export default useCardStore;
