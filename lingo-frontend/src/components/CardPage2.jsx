import { 
  RiArrowLeftSLine,
  RiQuestionLine,
  RiVolumeUpLine,
  RiFlagLine,
  RiDeleteBinLine,
  RiAddLine,
  RiShiningLine
} from "react-icons/ri";

const CardPage2 = () => {
  return (
    <section className="flex flex-col h-screen p-4 bg-[#E2E3FF] dark:bg-[#282950] relative">
      {/* Верхня панель */}
      <div className="flex justify-between items-center mb-6">
        <RiArrowLeftSLine className="text-4xl text-[#9194C3]" />
        <div className="flex items-center gap-4">
          <img src="./flags/en.webp" alt="language" className="w-6" />
          <span className="text-lg font-Poppins text-[#9194C3]">B2</span>
        </div>
        <RiQuestionLine className="text-4xl text-[#9194C3]" />
      </div>

      {/* Порожній блок з кнопкою Teach */}
      <div className="flex-grow flex flex-col items-center justify-center mb-6 relative">
        <div className="bg-[#E2E3FF] dark:bg-[#2D2E5A] rounded-3xl w-[310px] h-[174px] border-[3px] border-[#946DFF] flex flex-col justify-center items-center relative">
          <button className="bg-gradient-to-r from-[#946DFF] to-[#5A4BFF] text-white px-6 py-2 rounded-full absolute bottom-[-20px] flex items-center justify-center shadow-lg border border-[#946DFF]">
            <RiShiningLine className="mr-2" />
            Teach
          </button>
        </div>
      </div>

      {/* Картка слова */}
      <div className="bg-[#E7E7FF] dark:bg-[#2D2E5A] w-[310px] h-[216px] rounded-2xl p-6 mb-6 shadow-lg mx-auto relative">
        <RiFlagLine className="absolute top-4 left-4 text-[#9194C3]" />
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <RiVolumeUpLine className="text-4xl dark:text-[#775CFF] text-[#5A4BFF]" />
            <h2 className="text-3xl dark:text-[#F3F7FF] text-[#282950] font-semibold ml-2">
              affluent
            </h2>
          </div>
          <p className="text-sm text-[#9194C3] font-Poppins mb-4">The area is the most affluent area in Wales</p>
          <h3 className="text-2xl dark:text-[#F3F7FF] text-[#282950] font-bold">Заможний, багатий</h3>
        </div>
      </div>

      {/* Нижня панель */}
      <div className="relative w-[310px] mx-auto mb-6">
        <div className="relative">
          <button className="bg-gradient-to-r from-[#FF6193] to-[#C36583] text-white px-6 py-2 rounded-full flex items-center justify-center shadow-lg absolute top-[-28px] left-1/2 transform -translate-x-1/2 z-10">
            <RiDeleteBinLine className="mr-2" />
            <span>Delete / I know</span>
          </button>
          <div className="w-full h-[100px] border-2 border-dashed border-[#FF7B93] rounded-3xl flex justify-end items-center pr-4 mt-4">
            <button className="bg-gradient-to-r from-[#5476FF] to-[#4A62C2] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg absolute bottom-[-20px] right-[-20px]">
              <RiAddLine className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardPage2;



