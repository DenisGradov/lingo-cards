// імпорт іконок
import {
    RiMenuFill ,
    RiSearchLine,
    RiTimerLine,
    RiArrowRightSLine,
    RiAddLine,
    RiPlayLargeLine,
    RiInbox2Line,
    RiStarFill
} from 'react-icons/ri';
import {userInfo} from "../store/userInfo.js";
import {useState} from "react";

const Library = () => {
    // якісь функції та константи
    const { userName, userEmail, selectedLanguage, changeLanguage, getLanguageInfo } = userInfo();
    const [language, setLanguage] = useState(getLanguageInfo(selectedLanguage));

    function handleChangeLanguage() {
        changeLanguage();
        setLanguage(getLanguageInfo(selectedLanguage));
    }

    return (
      // <div>
      //     <h2>Library</h2>
      // </div>
      <section className="flex flex-col flex-grow ">
        {/* Шапка фиксирована сверху */}
        <div className="flex justify-between items-center py-[5px] mt-[10px] px-[16px]">
          <RiMenuFill className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
          <img
            className="w-[40px]"
            onClick={handleChangeLanguage}
            alt={language.code}
            src={language.flag}
          />
          <RiSearchLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
        </div>
        <span className="relative mt-[20px] w-[60%] h-[1px] bg-[#C1C3EC] m-auto"></span>

        {/* Основний контент */}
        <div className="flex flex-col flex-grow justify-between p-[16px] gap-y-[36px]">
          <div className="flex flex-col gap-y-[25px]">
            <div class="flex items-center">
              <RiTimerLine className="text-[20px] text-[#9194C3]  mr-[18px]" />
              <h2 className=" dark:text-[#F3F7FF] text-[#282950] text-[40px] font-semibold">
                Last Open
              </h2>
            </div>

            {/* Свайпери */}
            <div className="flex gap-x-[18px] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl '>
                  <div className='w-[148px] h-[156px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b from-[#333560]/75 to-[#333560]/75 group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center gap-[6px]'>
                        <p className='font-medium mb-0 text-[#FFE168]'>Medium</p>
                        <div className='w-[64px] h-[64px] flex  items-center justify-center group-hover:rounded-3xl group-hover:bg-[#232544] group-hover:bg-opacity-40 group-hover:backdrop-blur-lg'>
                          <RiPlayLargeLine className="text-[30px] text-[#F3F7FF] group-hover:text-[25px]" />
                        </div>
                        <div className='flex items-center gap-[20px]'>
                          <div className='flex items-center gap-[10px]'>
                            <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                            <span className='font-medium text-[#F3F7FF]'>120</span>
                          </div >
                          <div className='flex items-center gap-[10px]'> 
                            <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                            <span className='font-medium group-hover:text-[#FFE168] text-[#9194C3]'>10</span>
                          </div>
                        </div>
                    </div>
                    
                  </div>
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl '>
                  <div className='w-[148px] h-[156px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b from-[#333560]/75 to-[#333560]/75 group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center gap-[6px]'>
                        <p className='font-medium mb-0 text-[#78FFBC]'>Easy</p>
                        <div className='w-[64px] h-[64px] flex  items-center justify-center group-hover:rounded-3xl group-hover:bg-[#232544] group-hover:bg-opacity-40 group-hover:backdrop-blur-lg'>
                          <RiPlayLargeLine className="text-[30px] text-[#F3F7FF] group-hover:text-[25px]" />
                        </div>
                        <div className='flex items-center gap-[20px]'>
                          <div className='flex items-center gap-[10px]'>
                            <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                            <span className='font-medium text-[#F3F7FF]'>120</span>
                          </div >
                          <div className='flex items-center gap-[10px]'> 
                            <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                            <span className='font-medium group-hover:text-[#FFE168] text-[#9194C3]'>10</span>
                          </div>
                        </div>
                    </div>
                    
                  </div>
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl '>
                  <div className='w-[148px] h-[156px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b from-[#333560]/75 to-[#333560]/75 group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center gap-[6px]'>
                        <p className='font-medium mb-0 text-[#FFE168]'>Medium</p>
                        <div className='w-[64px] h-[64px] flex  items-center justify-center group-hover:rounded-3xl group-hover:bg-[#232544] group-hover:bg-opacity-40 group-hover:backdrop-blur-lg'>
                          <RiPlayLargeLine className="text-[30px] text-[#F3F7FF] group-hover:text-[25px]" />
                        </div>
                        <div className='flex items-center gap-[20px]'>
                          <div className='flex items-center gap-[10px]'>
                            <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                            <span className='font-medium text-[#F3F7FF]'>120</span>
                          </div >
                          <div className='flex items-center gap-[10px]'> 
                            <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                            <span className='font-medium group-hover:text-[#FFE168] text-[#9194C3]'>10</span>
                          </div>
                        </div>
                    </div>
                    
                  </div>
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl '>
                  <div className='w-[148px] h-[156px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b from-[#333560]/75 to-[#333560]/75 group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center gap-[6px]'>
                        <p className='font-medium mb-0 text-[#78FFBC]'>Easy</p>
                        <div className='w-[64px] h-[64px] flex  items-center justify-center group-hover:rounded-3xl group-hover:bg-[#232544] group-hover:bg-opacity-40 group-hover:backdrop-blur-lg'>
                          <RiPlayLargeLine className="text-[30px] text-[#F3F7FF] group-hover:text-[25px]" />
                        </div>
                        <div className='flex items-center gap-[20px]'>
                          <div className='flex items-center gap-[10px]'>
                            <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                            <span className='font-medium text-[#F3F7FF]'>120</span>
                          </div >
                          <div className='flex items-center gap-[10px]'> 
                            <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                            <span className='font-medium group-hover:text-[#FFE168] text-[#9194C3]'>10</span>
                          </div>
                        </div>
                    </div>
                    
                  </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-[25px]">
            <div class="flex items-center">
              <h2 className=" dark:text-[#F3F7FF] text-[#282950] text-[32px] font-semibold">
                Courses
              </h2>
              <RiArrowRightSLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
            </div>

            <div className="flex gap-x-[18px] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl bg-opacity-25'>
                <div className='w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b dark:from-[#333560]/75 dark:to-[#333560]/75 from-[#E1E2FE]/85 to-[#E1E2FE]/85  group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                    <div className='flex flex-col  justify-center gap-[78px]'>
                        <p className='font-medium mb-0 text-[#FF7967]'>Hard</p>
                        {/* <div className='w-[64px] h-[64px] flex  items-center justify-center'>
                          <RiPlayLargeLine className="text-[30px] dark:text-[#9194C3] text-[#282950]" />
                        </div> */}
                        <div className='flex flex-col gap-[6px]'>
                          <p className='text-[20px] font-bold mb-0'>Course for...</p>
                          <div className='flex items-center gap-[20px]'>
                            <div className='flex items-center gap-[10px]'>
                              <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                              <span className='font-medium text-[#F3F7FF]'>120</span>
                            </div >
                            <div className='flex items-center gap-[10px]'> 
                              <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                              <span className='font-medium text-[#9194C3] group-hover:text-[#FFE168]'>10</span>
                            </div>
                          </div>
                        </div>
                        
                    </div>
                </div>
                
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl bg-opacity-25'>
                <div className='w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b dark:from-[#333560]/75 dark:to-[#333560]/75 from-[#E1E2FE]/85 to-[#E1E2FE]/85  group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                    <div className='flex flex-col  justify-center gap-[78px]'>
                        <p className='font-medium mb-0 text-[#78FFBC]'>Easy</p>
                        <div className='flex flex-col gap-[6px]'>
                          <p className='text-[20px] font-bold mb-0'>Course for...</p>
                          <div className='flex items-center gap-[20px]'>
                            <div className='flex items-center gap-[10px]'>
                              <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                              <span className='font-medium text-[#F3F7FF]'>120</span>
                            </div >
                            <div className='flex items-center gap-[10px]'> 
                              <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                              <span className='font-medium text-[#9194C3] group-hover:text-[#FFE168]'>10</span>
                            </div>
                          </div>
                        </div>
                        
                    </div>
                </div>
                
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl bg-opacity-25'>
                <div className='w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b dark:from-[#333560]/75 dark:to-[#333560]/75 from-[#E1E2FE]/85 to-[#E1E2FE]/85  group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                    <div className='flex flex-col  justify-center gap-[78px]'>
                        <p className='font-medium mb-0 text-[#FF7967]'>Hard</p>
                        {/* <div className='w-[64px] h-[64px] flex  items-center justify-center'>
                          <RiPlayLargeLine className="text-[30px] dark:text-[#9194C3] text-[#282950]" />
                        </div> */}
                        <div className='flex flex-col gap-[6px]'>
                          <p className='text-[20px] font-bold mb-0'>Course for...</p>
                          <div className='flex items-center gap-[20px]'>
                            <div className='flex items-center gap-[10px]'>
                              <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                              <span className='font-medium text-[#F3F7FF]'>120</span>
                            </div >
                            <div className='flex items-center gap-[10px]'> 
                              <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                              <span className='font-medium text-[#9194C3] group-hover:text-[#FFE168]'>10</span>
                            </div>
                          </div>
                        </div>
                        
                    </div>
                </div>
                
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl bg-opacity-25'>
                <div className='w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b dark:from-[#333560]/75 dark:to-[#333560]/75 from-[#E1E2FE]/85 to-[#E1E2FE]/85  group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                    <div className='flex flex-col  justify-center gap-[78px]'>
                        <p className='font-medium mb-0 text-[#FF7967]'>Hard</p>
                        {/* <div className='w-[64px] h-[64px] flex  items-center justify-center'>
                          <RiPlayLargeLine className="text-[30px] dark:text-[#9194C3] text-[#282950]" />
                        </div> */}
                        <div className='flex flex-col gap-[6px]'>
                          <p className='text-[20px] font-bold mb-0'>Course for...</p>
                          <div className='flex items-center gap-[20px]'>
                            <div className='flex items-center gap-[10px]'>
                              <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                              <span className='font-medium text-[#F3F7FF]'>120</span>
                            </div >
                            <div className='flex items-center gap-[10px]'> 
                              <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168]" />
                              <span className='font-medium text-[#9194C3] group-hover:text-[#FFE168]'>10</span>
                            </div>
                          </div>
                        </div>
                        
                    </div>
                </div>
                
              </div>
            </div>

          </div>
          <div className="flex flex-col gap-y-[25px]">
            <div class="flex items-center">
              <h2 className=" dark:text-[#F3F7FF] text-[#282950] text-[32px] font-semibold">
                Course Sets
              </h2>
              <RiArrowRightSLine className="text-[25px] dark:text-[#9194C3] text-[#282950]" />
              <div className="rounded-full bg-gradient-radial from-[#946DFF] to-[#5A4BFF] w-[40px] h-[40px] flex  items-center justify-center ml-auto flex-shrink-0 drop-shadow-xl">
                <RiAddLine className="text-[25px] text-[#F3F7FF] " />
              </div>
            </div>
            <div className="flex gap-x-[18px] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl'>
                  <div className='w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b dark:from-[#333560]/75 dark:to-[#333560]/75 from-[#E1E2FE]/85 to-[#E1E2FE]/85 group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                      <div className='flex flex-col  justify-center gap-[78px]'>
                          <p className='font-medium mb-0 text-[#FF7967]'>Hard</p>
                          {/* <div className='w-[64px] h-[64px] flex  items-center justify-center'>
                            <RiPlayLargeLine className="text-[30px] dark:text-[#9194C3] text-[#282950]" />
                          </div> */}
                          <div className='flex flex-col gap-[6px]'>
                            <p className='text-[20px] font-bold mb-0'>Course for...</p>
                            <div className='flex items-center gap-[20px]'>
                              <div className='flex items-center gap-[10px]'>
                                <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                                <span className='font-medium text-[#F3F7FF]'>120</span>
                              </div >
                              <div className='flex items-center gap-[10px]'> 
                                <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168] " />
                                <span className='font-medium text-[#9194C3] group-hover:text-[#FFE168]'>10</span>
                              </div>
                            </div>
                          </div>
                          
                      </div>
                  </div>
                
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl'>
                  <div className='w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b dark:from-[#333560]/75 dark:to-[#333560]/75 from-[#E1E2FE]/85 to-[#E1E2FE]/85 group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                      <div className='flex flex-col  justify-center gap-[78px]'>
                          <p className='font-medium mb-0 text-[#78FFBC]'>Easy</p>
                          {/* <div className='w-[64px] h-[64px] flex  items-center justify-center'>
                            <RiPlayLargeLine className="text-[30px] dark:text-[#9194C3] text-[#282950]" />
                          </div> */}
                          <div className='flex flex-col gap-[6px]'>
                            <p className='text-[20px] font-bold mb-0'>Course for...</p>
                            <div className='flex items-center gap-[20px]'>
                              <div className='flex items-center gap-[10px]'>
                                <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                                <span className='font-medium text-[#F3F7FF]'>120</span>
                              </div >
                              <div className='flex items-center gap-[10px]'> 
                                <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168] " />
                                <span className='font-medium text-[#9194C3] group-hover:text-[#FFE168]'>10</span>
                              </div>
                            </div>
                          </div>
                          
                      </div>
                  </div>
                
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl'>
                  <div className='w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b dark:from-[#333560]/75 dark:to-[#333560]/75 from-[#E1E2FE]/85 to-[#E1E2FE]/85 group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                      <div className='flex flex-col  justify-center gap-[78px]'>
                          <p className='font-medium mb-0 text-[#FF7967]'>Hard</p>
                          {/* <div className='w-[64px] h-[64px] flex  items-center justify-center'>
                            <RiPlayLargeLine className="text-[30px] dark:text-[#9194C3] text-[#282950]" />
                          </div> */}
                          <div className='flex flex-col gap-[6px]'>
                            <p className='text-[20px] font-bold mb-0'>Course for...</p>
                            <div className='flex items-center gap-[20px]'>
                              <div className='flex items-center gap-[10px]'>
                                <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                                <span className='font-medium text-[#F3F7FF]'>120</span>
                              </div >
                              <div className='flex items-center gap-[10px]'> 
                                <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168] " />
                                <span className='font-medium text-[#9194C3] group-hover:text-[#FFE168]'>10</span>
                              </div>
                            </div>
                          </div>
                          
                      </div>
                  </div>
                
              </div>
              <div className='group  bg-[url("..\public\img\Flag_of_the_United_Kingdom_(1-2).svg")] bg-cover bg-center grow-0 shrink-0 rounded-t-3xl rounded-b-2xl'>
                  <div className='w-[170px] h-[199px] rounded-t-3xl rounded-b-2xl bg-gradient-to-b dark:from-[#333560]/75 dark:to-[#333560]/75 from-[#E1E2FE]/85 to-[#E1E2FE]/85 group-hover:from-[#946DFF]/75 group-hover:to-[#5A4BFF]/75 group-hover:backdrop-blur-[1px] flex items-center justify-center'>
                      <div className='flex flex-col  justify-center gap-[78px]'>
                          <p className='font-medium mb-0 text-[#FF7967]'>Hard</p>
                          {/* <div className='w-[64px] h-[64px] flex  items-center justify-center'>
                            <RiPlayLargeLine className="text-[30px] dark:text-[#9194C3] text-[#282950]" />
                          </div> */}
                          <div className='flex flex-col gap-[6px]'>
                            <p className='text-[20px] font-bold mb-0'>Course for...</p>
                            <div className='flex items-center gap-[20px]'>
                              <div className='flex items-center gap-[10px]'>
                                <RiInbox2Line className="text-[12px] group-hover:text-[#F3F7FF] text-[#5890FF]" />
                                <span className='font-medium text-[#F3F7FF]'>120</span>
                              </div >
                              <div className='flex items-center gap-[10px]'> 
                                <RiStarFill className="text-[10px]  text-[#9194C3] group-hover:text-[#FFE168] " />
                                <span className='font-medium text-[#9194C3] group-hover:text-[#FFE168]'>10</span>
                              </div>
                            </div>
                          </div>
                          
                      </div>
                  </div>
                
              </div>
            </div>

          </div>
        </div>
      </section>
    );
};

export default Library;