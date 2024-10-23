import useModalStore from '../store/modalStore';
import { modalInfo } from '../constants/modalInfo';

export const openModalWithInfo = (type) => {
    // Найти объект с информацией по типу
    const modalData = modalInfo.find((info) => info.type === type);

    if (modalData) {
        useModalStore.getState().openModal({
            title: modalData.title,
            description: modalData.description,
            hasCloseIcon: modalData.hasCloseButton,
            buttons: modalData.buttons,

            inputs:modalData.inputs,
            textareas:modalData.textareas,
            selects:modalData.selects,
            formButtons:modalData.formButtons,
        });
    } else {
        console.error(`Modal info for type "${type}" not found.`);
    }
};
