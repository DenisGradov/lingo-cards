import useInfoSlidesStore from '../store/infoSlidesStore';
import { infoSlidesData } from '../constants/infoSlidesInfo';

export const openInfoSlidesWithInfo = (type) => {
  const slideData = infoSlidesData.find((info) => info.type === type);

  if (slideData) {
    useInfoSlidesStore.getState().openSlides({
      slides: slideData.slides,
    });
  } else {
    console.error(`InfoSlides for type "${type}" not found.`);
  }
};
