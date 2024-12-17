import useModalStore from '../store/modalStore';
import { modalInfo } from '../constants/modalInfo';

export const openModalWithInfo = (type) => {
    const modalData = modalInfo.find((info) => info.type === type);

    if (modalData) {
        useModalStore.getState().openModal({
            contentType: type === 'Create playlist' ? 'playlist' :
                type === 'Create word' ? 'word' : 'info',
            ...modalData
        });
    } else {
        console.error(`Modal info for type "${type}" not found.`);
    }
};
