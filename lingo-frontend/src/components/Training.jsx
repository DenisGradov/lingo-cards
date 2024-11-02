import {
  RiAddLine,
  RiArrowUpSLine,
  RiBallPenFill,
  RiBarChartFill,
  RiMoonFill,
  RiPlayLargeFill,
  RiQuestionLine,
  RiSunFill,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import useThemeStore from "../store/themeStore.js";
import useWordsStore from "../store/wordsStore.js";
import { openModalWithInfo } from "../utils/modalUtils.js";
import { getWordCountByCategory } from "../utils/getWordCountByCategory.js";
import useModalStore from "../store/modalStore.js";
import { modalInfo } from "../constants/modalInfo.js";
import Learn from "./Learn.jsx";

const Training = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const words = useWordsStore((state) => state.words);
  const openModal = useModalStore((state) => state.openModal);
  const setSelectedWord = useModalStore((state) => state.setSelectedWord);

  const [isLearn, setIsLearn] = useState(false);
  const [wordCounts, setWordCounts] = useState({ teach: 0, iKnow: 0, learned: 0 });
  const [showWordList, setShowWordList] = useState(false);
  const [wordsActual, setWordsActual] = useState([]);
  useEffect(() => {
    setWordsActual([...words].reverse());
    const counts = getWordCountByCategory(words);
    setWordCounts(counts);
  }, [words]);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedCounts = getWordCountByCategory(words);
      setWordCounts(updatedCounts);
    }, 30000);

    return () => clearInterval(timer);
  }, [words]);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handleEditWord = (word) => {
    setSelectedWord(word);
    openModal({
      ...modalInfo.find((modal) => modal.type === "Edit Word"),
      contentType: "editWord",
      selectedWord: word,
    });
  };

  const toggleWordList = () => {
    setShowWordList((prev) => !prev);
  };

  if (isLearn) return <Learn setIsLearn={setIsLearn} wordCounts={wordCounts} />;

  return (
      <div className="flex flex-col flex-grow">
        <div className="w-full flex items-center justify-between py-[5px] mt-[10px] px-[16px]">
          <img alt="logo" src="/logo.webp" />
          <div className="flex">
            <RiBarChartFill
                className={`mr-[32px] text-3xl ${isDark ? "text-[#9194C3]" : "text-[#282950]"}`}
            />
            <span
                onClick={handleToggleTheme}
                className="px-[16px] relative flex items-center justify-center cursor-pointer"
            >
            <span className={`absolute ${!isDark ? "opacity-100" : "opacity-0"}`}>
              <RiSunFill className="text-3xl text-[#775CFF]" />
            </span>
            <span className={`absolute ${isDark ? "opacity-100" : "opacity-0"}`}>
              <RiMoonFill className="text-3xl text-[#775CFF]" />
            </span>
          </span>
          </div>
        </div>

        <div className="flex flex-col flex-grow justify-between">
          <div className="flex flex-col justify-around flex-grow">
            <div className="flex justify-between w-full px-[16px] big:py-[16px] py-[2px]">
              <div className="flex flex-col items-center w-full border-t border-r border-[#434575]">
              <span className="big:mt-[24px] mt-[5px] text-[#775CFF] text-[32px] font-bold">
                {wordCounts.teach}
              </span>
                <span className="small:mt-[-10px] text-[#9194C3] font-semibold text-[14px]">
                Teach
              </span>
                <RiQuestionLine
                    onClick={() => {
                      openModalWithInfo("Teach");
                    }}
                    className="big:mb-[24px] mb-[5px] text-[#9194C3] text-[20px] hover:scale-105 cursor-pointer duration-300"
                />
              </div>
              <div className="flex flex-col items-center w-full border-t border-r border-[#434575]">
              <span className="big:mt-[24px] mt-[5px] dark:text-[#F3F7FF] text-[#282950] text-[32px] font-bold">
                {wordCounts.iKnow}
              </span>
                <span className="small:mt-[-10px] text-[#9194C3] font-semibold text-[14px]">
                I know
              </span>
                <RiQuestionLine
                    onClick={() => {
                      openModalWithInfo("I know");
                    }}
                    className="big:mb-[24px] mb-[5px] text-[#9194C3] text-[20px] hover:scale-105 cursor-pointer duration-300"
                />
              </div>
              <div className="flex flex-col items-center w-full border-t border-[#434575]">
              <span className="big:mt-[24px] mt-[5px] dark:text-[#F3F7FF] text-[#282950] text-[32px] font-bold">
                {wordCounts.learned}
              </span>
                <span className="small:mt-[-10px] text-[#9194C3] font-semibold text-[14px]">
                Learned
              </span>
                <RiQuestionLine
                    onClick={() => {
                      openModalWithInfo("Learned");
                    }}
                    className="big:mb-[24px] mb-[5px] text-[#9194C3] text-[20px] hover:scale-105 cursor-pointer duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col items-center text-center py-[5px] px-[16px]">
              <div className="small:flex items-center">
                <img
                    className="m-auto w-[32px] small:w-[20px] small:mx-[5px] relative top-[3px]"
                    alt="img of nut"
                    src="/nut.webp"
                />
                <h2 className="mt-[8px] small:mx-[5px] dark:text-[#F3F7FF] text-[#282950] font-semibold small:text-[25px] text-[32px]">
                  Collecting Walnut
                </h2>
              </div>
              <h3 className="big:mt-[16px] mb-[20px] small:mb-[10px] max-w-[265px] text-[#9194C3] text-[14px] font-semibold">
                For tuition, we will charge them to you. Spend it wisely
              </h3>
              <div className="mt-[55px] relative flex justify-center">
                <img
                    className="absolute bottom-[15px] small:w-[110px]"
                    alt="animal"
                    src="/animal.webp"
                />
                <img
                    alt="ellipse"
                    src={isDark ? "/ellipse.webp" : "/whiteEllipse.webp"}
                    className="small:w-[150px]"
                />
              </div>
              <div
                  className="select-none mt-[11px] mb-[5px] xs:w-[310px] w-full h-[54px] rounded-tl-[50px] rounded-br-[50px] rounded-tr-[100px] rounded-bl-[100px] flex justify-center items-center font-extrabold text-[26px] dark:text-[#F3F7FF] text-[#282950] dark:bg-[#333560]/50 bg-[#C1C3EC]/50 backdrop-blur-24 hover:scale-105 duration-300 cursor-pointer "
                  onClick={() => {
                    setIsLearn(true);
                  }}
              >
                <div className="flex items-center">
                  <RiPlayLargeFill className="text-[#775CFF] text-[20px] mr-[16px]" />
                  Start
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center w-full">
            {showWordList && (
                <div className="absolute bottom-[150px] max-w-[550px] w-[97%] m-auto flex flex-col flex-grow inset-x-0 bg-white dark:bg-[#333560] shadow-lg rounded-lg h-[200px] overflow-y-auto p-4">
                  <h3 className="text-lg font-semibold dark:text-white text-[#282950] mb-2">
                    Your Words
                  </h3>
                  <ul>
                    {wordsActual.map((word, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2"
                        >
                          <span className="text-sm dark:text-white">{word.word}</span>
                          <div className="flex">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {word.translation}
                      </span>
                            <RiBallPenFill
                                onClick={() => handleEditWord(word)}
                                className="text-[#775CFF] text-[20px] mr-[16px] hover:opacity-60 cursor-pointer duration-300"
                            />
                          </div>
                        </li>
                    ))}
                  </ul>
                </div>
            )}

            <div className="flex items-center justify-center py-[5px] p-[16px] mb-[50px] w-full">
              <div
                  onClick={toggleWordList}
                  className="select-none flex items-center justify-center dark:text-[#F3F7FF] text-[#282950] text-[24px] border border-[#333560] hover:opacity-60 cursor-pointer duration-300 rounded py-[10px] w-[50%] mx-[10px]"
              >
                <RiArrowUpSLine />
                Cards
              </div>
              <div
                  onClick={() => {
                    openModalWithInfo("Create word");
                  }}
                  className="rounded-full bg-gradient-radial from-[#946DFF] to-[#5A4BFF] w-[40px] h-[40px] drop-shadow-xl cursor-pointer"
              >
                <RiAddLine className="text-[25px] text-[#F3F7FF] relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Training;
