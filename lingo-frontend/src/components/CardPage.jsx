import { RiArrowLeftSLine, RiFilterLine, RiVolumeUpLine, RiPlayFill, RiInformationLine, RiBookmarkLine, HiAcademicCap, CiMap } 
from "react-icons/ri";

const CardPage = () => {
  return (
    <section className="flex flex-col h-screen p-[16px]">
      {/* Верхня панель */}
      <div className="flex justify-between items-center">
        <RiArrowLeftSLine className="text-[25px] text-[#9194C3]" />
        <div className="flex items-center gap-x-[10px]">
          <img src="./flags/en.webp" alt="language" className="w-[25px]" />
          <RiFilterLine className="text-[25px] text-[#9194C3]" />
          <span className="relative">
            <span className="absolute top-[-8px] right-[-8px] bg-[#FF5C5C] text-white text-xs rounded-full px-[6px]">5</span>
          </span>
        </div>
      </div>

      {/* Основний контент */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Картка */}
        <div className="bg-[#2A2C55] rounded-2xl p-[24px] text-center">
          <div className="text-[50px] text-[#775CFF] font-bold">2</div>
          <RiVolumeUpLine className="text-[40px] text-[#775CFF] mx-auto my-[10px]" />
          <h2 className="text-[32px] text-white font-semibold">Two</h2>
          <h3 className="text-[24px] text-[#9194C3]">Два</h3>
        </div>
      </div>

      {/* Нижня панель */}
      <div className="flex justify-between items-center py-[10px]">
        <RiInformationLine className="text-[30px] text-[#9194C3]" />
        <RiPlayFill className="text-[50px] text-[#775CFF]" />
        <RiBookmarkLine className="text-[30px] text-[#775CFF]" />
      </div>

      {/* Нижнє меню */}
      <div className="flex justify-between items-center bg-[#2A2C55] p-[10px] rounded-t-2xl">
        <div className="text-[#9194C3] flex flex-col items-center">
          <HiAcademicCap className="text-[30px]" />
          <span className="text-xs">Training</span>
        </div>
        <div className="text-[#775CFF] flex flex-col items-center">
          <CiMap className="text-[30px]" />
          <span className="text-xs">Library</span>
        </div>
        <img src="/avatar.png" alt="user avatar" className="w-[30px] rounded-full" />
      </div>
    </section>
  );
};

export default CardPage;