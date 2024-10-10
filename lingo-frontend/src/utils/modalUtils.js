import useModalStore from '../store/modalStore';
import { modalInfo } from '../constants/modalInfo';

export const openModalWithInfo = (type) => {
    // Найти объект с информацией по типу
    const modalData = modalInfo.find((info) => info.type === type);

    if (modalData) {
        console.log('Modal Data:', modalData);  // Для проверки вывода данных
        useModalStore.getState().openModal({
            title: modalData.title,
            description: modalData.description,
            hasCloseIcon: modalData.hasCloseButton,
            buttons: modalData.buttons
        });
    } else {
        console.error(`Modal info for type "${type}" not found.`);
    }
};
