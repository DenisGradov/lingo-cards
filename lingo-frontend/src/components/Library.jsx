import {
  RiTimerLine,
  RiArrowRightSLine,
  RiAddLine,
  RiPlayLargeLine,
  RiInbox2Line,
  RiStarFill,
} from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import usePlaylistsStore from "../store/playlistsStore.js";
import { openModalWithInfo } from "../utils/modalUtils.js";
import { languages } from "../constants/mainConstants.js";
import Header from "./Header.jsx";

const Library = () => {
  const [sortedLastOpened, setSortedLastOpened] = useState([]);

  const playlists = usePlaylistsStore((state) => state.playlists);
  const isLoading = usePlaylistsStore((state) => state.isLoading); // Добавляем состояние загрузки
  const setPlaylists = usePlaylistsStore((state) => state.setPlaylists);

  // Загружаем плейлисты при монтировании компонента
  useEffect(() => {
    setPlaylists();
  }, [setPlaylists]);

  // Сортировка плейлистов по времени последнего открытия
  useEffect(() => {
    if (playlists.length > 0) {
      const sorted = playlists
          .filter((pl) => pl.last_open_time !== 0)
          .sort((a, b) => b.last_open_time - a.last_open_time);
      setSortedLastOpened(sorted);
    }
  }, [playlists]);

  const getFlagURL = (code) => {
    return languages[code]?.flag || './flags/default.webp';
  };

  const scrollRef = useRef(null);
  const handleWheel = (event) => {
    if (scrollRef.current) {
      event.preventDefault();
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
      <section className="flex flex-col flex-grow max-h-[90vh] overflow-auto">
        <Header />
        {isLoading ? ( // Показываем лоадер, если данные еще загружаются
            <div className="flex justify-center items-center flex-grow">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
        ) : (
            <div className="flex flex-col flex-grow justify-between p-[16px] gap-y-[36px]">
              <div className="flex flex-col gap-y-[25px]">
                <div className="flex items-center mt-[70px]">
                  <RiTimerLine className="text-[20px] text-[#9194C3] mr-[18px]" />
                  <h2 className="dark:text-[#F3F7FF] text-[#282950] text-[40px] font-semibold">Last Open</h2>
                </div>
                <ScrollContainer ref={scrollRef} onWheel={handleWheel}>
                  <div className="flex gap-x-[18px] cursor-pointer">
                    {sortedLastOpened.map((playlist, index) => (
                        <div
                            key={`last-opened-${index}`}
                            style={{ backgroundImage: `url('${getFlagURL(playlist.language_code)}')` }}
                            className="group relative bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl select-none"
                        >
                          <div className="prev-small flex items-center justify-center">
                            <div className="absolute transition duration-300 prev-small bg-gradient-to-b bg-gradient-dark opacity-100 group-hover:opacity-0"></div>
                            <div className="absolute transition duration-300 prev-small bg-gradient-to-b from-[#946DFF]/75 to-[#5A4BFF]/75 opacity-0 group-hover:backdrop-blur-[1px] group-hover:opacity-100"></div>
                            <div className="relative flex flex-col items-center justify-center gap-[6px]">
                              <p className="font-medium mb-0 text-[#FF7967]">{playlist.name}</p>
                              <div className="transition-all duration-300 w-[64px] h-[64px] rounded-3xl flex items-center justify-center play-hover">
                                <RiPlayLargeLine className="transition-all duration-300 text-[30px] text-[#F3F7FF] group-hover:text-[25px]" />
                              </div>
                              <div className="flex items-center gap-[20px]">
                                <div className="flex items-center gap-[10px]">
                                  <RiInbox2Line className="transition duration-300 text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                                  <span className="font-medium text-[#F3F7FF]">{playlist.numberOfCards}</span>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                  <RiStarFill className="transition duration-300 text-[10px] text-[#9194C3] group-hover:text-[#FFE168]" />
                                  <span className="transition duration-300 font-medium group-hover:text-[#FFE168] text-[#9194C3]">{playlist.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </ScrollContainer>
              </div>

              <div className="flex flex-col gap-y-[25px]">
                <div className="flex items-center">
                  <h2 className="dark:text-[#F3F7FF] text-[#282950] text-[32px] font-semibold">Playlists</h2>
                  <RiArrowRightSLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
                  <div
                      onClick={() => {
                        openModalWithInfo('Create playlist');
                      }}
                      className="rounded-full bg-gradient-radial from-[#946DFF] to-[#5A4BFF] w-[40px] h-[40px] flex items-center justify-center ml-auto flex-shrink-0 drop-shadow-xl cursor-pointer"
                  >
                    <RiAddLine className="text-[25px] text-[#F3F7FF]" />
                  </div>
                </div>
                <ScrollContainer ref={scrollRef} onWheel={handleWheel}>
                  <div className="flex gap-x-[18px] cursor-pointer">
                    {playlists && playlists.reverse().map((playlist, index) => (
                        <div
                            key={`playlist-${index}`}
                            style={{ backgroundImage: `url('${getFlagURL(playlist.language_code)}')` }}
                            className="group relative bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl select-none"
                        >
                          <div className="prev-medium flex items-center justify-center">
                            <div className="absolute transition duration-300 prev-medium bg-gradient-to-b bg-gradient-dark-theme bg-gradient-light opacity-100 group-hover:opacity-0"></div>
                            <div className="absolute transition duration-300 prev-medium bg-gradient-to-b from-[#946DFF]/75 to-[#5A4BFF]/75 opacity-0 group-hover:backdrop-blur-[1px] group-hover:opacity-100"></div>
                            <div className="relative flex flex-col justify-center gap-[78px]">
                              <p className="font-medium mb-0 text-[#FF7967]">{playlist.name}</p>
                              <div className="flex flex-col gap-[6px]">
                                <p className="text-[20px] font-bold mb-0">{playlist.name}.</p>
                                <div className="flex items-center gap-[20px]">
                                  <div className="flex items-center gap-[10px]">
                                    <RiInbox2Line className="transition duration-300 text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                                    <span className="font-medium text-[#F3F7FF]">{playlist.number_of_cards}</span>
                                  </div>
                                  <div className="flex items-center gap-[10px]">
                                    <RiStarFill className="transition duration-300 text-[10px] text-[#9194C3] group-hover:text-[#FFE168]" />
                                    <span className="transition duration-300 font-medium text-[#9194C3] group-hover:text-[#FFE168]">{playlist.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </ScrollContainer>
              </div>
            </div>
        )}
      </section>
  );
};

export default Library;
