import {
  RiArrowLeftSLine,
  RiFilterLine,
  RiVolumeUpLine,
  RiPlayFill,
  RiInformationLine,
  RiBookmarkLine,
} from 'react-icons/ri';

const CardPage = () => {
  return (
    <section className="flex flex-col h-screen p-[16px] bg-[#E2E3FF] dark:bg-[#282950]">
      <div className="flex justify-between items-center">
        <RiArrowLeftSLine className="text-[40px] dark:text-[#9194C3] text-[#282950]" />
        <div className="flex items-center gap-x-[180px]">
          <img src="./flags/en.webp" alt="language" className="w-[25px]" />
          <RiFilterLine className="text-[40px] dark:text-[#9194C3] text-[#282950]" />
          <span className="relative">
            <span className="absolute top-[-12px] right-[5px] bg-[#FF6D86] text-white text-s rounded-full px-[12px] py-[6px]">
              5
            </span>
          </span>
        </div>
      </div>
      <hr className="border-t border-[#9194C3] dark:border-[#282950] my-[10px]" />

      {/* Основний контент */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Картка */}
        <div className="bg-[#E7E7FF] dark:bg-[#2A2C55] w-[250px] h-[350px] rounded-2xl p-[24px] flex flex-col justify-between shadow-lg">
          <div className="text-center">
            <div className="text-[50px] text-[#775CFF] font-bold">2</div>
            <RiVolumeUpLine className="text-[40px] dark:text-[#775CFF] text-[#946DFF] mx-auto my-[10px]" />
            <h2 className="text-[32px] dark:text-[#F3F7FF] text-[#282950] font-semibold">
              Two
            </h2>
            <h3 className="text-[24px] dark:text-[#F3F7FF] text-[#282950]">
              Два
            </h3>
          </div>

          <div className="flex justify-between items-center py-[10px]">
            <RiInformationLine className="text-[30px] text-[#9194C3]" />
            <RiPlayFill className="text-[50px] text-[#9194C3]" />
            <RiBookmarkLine className="text-[30px] text-[#FFC046]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardPage;
