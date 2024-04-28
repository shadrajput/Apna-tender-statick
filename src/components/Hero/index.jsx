import React, { useState, useEffect, useRef } from 'react';
import { IoBookmark } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { CiFolderOn } from "react-icons/ci";
import { useRouter } from 'next/router';
import Slider from "react-slick";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";


const Hero = () => {
  const router = useRouter()
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState('keyword');
  const sentences = ["We help you to", "Choose the right tender"];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [typing, setTyping] = useState(true);
  const [counterOn, setCounterOn] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (typing) {
        if (currentText === sentences[currentSentenceIndex]) {
          setTyping(false);
          setTimeout(() => {
            setTyping(true);
            setCurrentText("");
            setCurrentSentenceIndex(
              (currentSentenceIndex + 1) % sentences.length
            );
          }, 1500); // Change delay as per requirement
        } else {
          setCurrentText(
            sentences[currentSentenceIndex].substring(0, currentText.length + 1)
          );
        }
      } else {
        if (currentText === "") {
          setTyping(true);
        } else {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }
      }
    }, 100); // Change typing speed as per requirement

    return () => clearInterval(interval);
  }, [currentText, currentSentenceIndex, typing]);

  const handleUserSearch = (e) => {
    setSearch(() => e.target.value)
  }

  const handleSearchSubmit = (e) => {
    setSearch(e.target.value)
    setFilter(filter)
    router.push({
      pathname: '/tenders',
      query: { search: search, filter: filter }
    });
  }

  const handleSelectFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleConstruction = (value) => {
    router.push({
      pathname: '/tenders',
      query: { search: value, filter: "department" }
    }).then(() => {
      // console.log('Navigated to other page with value:', value);
    });
  };

  return (
    <>
      <section
        id="Hero"
        className="hero w-full py-10 xl:py-0">
        <div className=" lg:p-10 xl:p-20 flex flex-col lg:flex-row items-center w-full">

        <div className="w-full lg:w-[50%] lg:px-0">
            <div className="h-20 lg:h-32 xl:h-40 pl-5 lg:pl-0">
              <h1 className="text-[#000000] text-4xl sm:text-5xl text-center lg:text-left lg:text-6xl xl:text-7xl font-extrabold leading-tight">{currentText} <span className="lg:text-6xl font-medium text-[#00A7AC] text-center -ml-4">|</span></h1>
            </div>
            <p className=" lg:text-lg xl:text-xl mt-10 lg:mt-5 text-center pl-5 lg:pl-0 lg:text-start">2400+ Peoples are daily search in this portal, 100 user added tender portal!</p>

            <div className='flex justify-center items-center lg:items-start lg:justify-start mt-10 lg:mt-0'>
              <div className="flex flex-col lg:flex-row w-full border rounded-md items-center justify-between bg-white shadow-lg lg:my-10 px-5 py-4 space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="w-full lg:w-1/2 flex space-x-3 items-center rounded-md">
                  <CiFolderOn className="text-2xl text-[#00a7ac]" />
                  <select name="Category" id="" onChange={handleSelectFilter} className="focus:outline-none focus:ring-0 w-full font-light border-none bg-transparent">
                    <option value="keyword">Keyword</option>
                    <option value="tender_id">Tender ID</option>
                    <option value="department">Department</option>
                    <option value="state">State</option>
                  </select>
                </div>
                <div className="w-full lg:w-1/2 flex items-center space-x-3 border-r ">
                  <FiSearch className="text-[22px] text-[#00a7ac]" />
                  <input onChange={handleUserSearch} onBlur={handleUserSearch}
                    type="search" className="focus:outline-none focus:ring-0 w-full border-none bg-transparent" placeholder="Tender Title , Keywords....." />
                </div>
                <div className="flex items-center justify-center lg:items-end lg:justify-end w-full lg:w-1/4 ">
                  <button onClick={handleSearchSubmit}
                    className="relative h-10 lg:h-12 w-40 overflow-hidden border border-[#00a7ac] text-[#00a7ac] rounded-md transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#00a7ac] before:duration-500 before:ease-out hover:text-white hover:shadow-[#00a7ac] hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                    <span className="relative z-10">Search</span>
                  </button>
                </div>
              </div>
            </div>


            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center xl:items-start space-y-3 sm:space-y-0 sm:px-5 sm:space-x-3 lg:space-x-3 mt-10 lg:mt-5 w-full">
              <div className="flex items-center sm:w-40 lg:w-72 xl:w-40">
                <IoBookmark className="text-[#00a7ac] text-lg" />
                <h2>Suggested Tag:</h2>
              </div>
              <div className="flex flex-wrap justify-center items-center sm:justify-start sm:items-start text-gray-500 text-[12px] gap-3">
                <span onClick={() => handleConstruction('Cunstruction')}
                  className="cursor-pointer hover:text-[#00a7ac]">Cunstruction</span>
                <span onClick={() => handleConstruction('Medical')}
                  className="cursor-pointer hover:text-[#00a7ac]">Medical</span>
                <span onClick={() => handleConstruction('Valve')}
                  className="cursor-pointer hover:text-[#00a7ac]">Valve</span>
                <span onClick={() => handleConstruction('Railways')}
                  className="cursor-pointer hover:text-[#00a7ac]">Railways</span>
                <span onClick={() => handleConstruction('Agriculture')}
                  className="cursor-pointer hover:text-[#00a7ac]">Agriculture</span>
                <span onClick={() => handleConstruction('Agriculture')}
                  className="cursor-pointer hover:text-[#00a7ac]">Agriculture</span>
                <span onClick={() => handleConstruction('Agriculture')}
                  className="cursor-pointer hover:text-[#00a7ac]">Agriculture</span>
              </div>
            </div>

            <div className="flex items-center justify-center xl:justify-start lg:items-start my-10 w-full space-x-10">
              <div className="">
                <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                  <h1 className="text-3xl sm:text-4xl text-center lg:text-5xl font-semibold text-[#000000] lg:mb-2">
                    {counterOn &&
                      <CountUp start={0} end={100} duration={2} delay={0} />
                    }
                    +
                  </h1>
                  <p className="text-[#000000] text-sm md:text-base text-center">Tenders Available</p>
                </ScrollTrigger>
              </div>
              <div className="">
                <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                  <h1 className="text-3xl sm:text-4xl text-center lg:text-5xl font-semibold text-[#000000] lg:mb-2">
                    {counterOn &&
                      <CountUp start={0} end={100} duration={2} delay={0} />
                    }
                    +
                  </h1>
                  <p className="text-[#000000] text-sm md:text-base text-center">Daily Post</p>
                </ScrollTrigger>
              </div>
              <div className="">
                <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                  <h1 className="text-3xl sm:text-4xl text-center lg:text-5xl font-semibold text-[#000000] lg:mb-2">
                    {counterOn &&
                      <CountUp start={0} end={100} duration={2} delay={0} />
                    }
                    +
                  </h1>
                  <p className="text-[#000000] text-sm md:text-base text-center">Visitor</p>
                </ScrollTrigger>
              </div>
            </div>

          </div>

          <div className="w-full lg:w-[50%] p-5 h-auto transition-transform duration-500 transform translate-x-0">
            <img src="images/hero/hero3-img-with-vec.png" alt="" />
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;
