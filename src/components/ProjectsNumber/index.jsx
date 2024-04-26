import Link from "next/link";
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
const ProjectsNumber = () => {
  const [counterOn, setCounterOn] = useState(false)
  return (
    <section className="py-10 sm:py-14 lg:py-20">
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 items-center justify-between px-5 xl:px-24">

      <div className="flex flex-col items-center space-y-5 lg:space-x-5">
        <div className="relative">
          <img src="images/projectnumber/home4-counter-1.svg" alt="" />
          <div className="w-10 h-10 bg-[#00a7ac26] rounded-full absolute -bottom-3 -right-3">

          </div>
        </div>
        <div className="">
          <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
            <h1 className="text-3xl sm:text-4xl text-center lg:text-5xl font-semibold text-[#000000] lg:mb-2">
              {counterOn &&
                <CountUp start={0} end={100} duration={2} delay={0} />
              }
              +
            </h1>
            <p className="text-[#000000] lg:text-lg">Tenders Available</p>
          </ScrollTrigger>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-5 lg:space-x-5">
        <div className="relative">
          <img src="images/projectnumber/home4-counter-2.svg" alt="" />
          <div className="w-10 h-10 bg-[#00a7ac26] rounded-full absolute -bottom-3 -right-3">

          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl text-center lg:text-5xl font-semibold text-[#000000] lg:mb-2">
            {counterOn &&
              <CountUp start={0} end={100} duration={2} delay={0} />
            }
            +
          </h1>
          <p className="text-[#000000] lg:text-lg ">Daily User Visited</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-5 lg:space-x-5">
        <div className="relative">
          <img src="images/projectnumber/home4-counter-3.svg" alt="" />
          <div className="w-10 h-10 bg-[#00a7ac26] rounded-full absolute -bottom-3 -right-3">

          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl text-center lg:text-5xl font-semibold text-[#000000] lg:mb-2">
            {counterOn &&
              <CountUp start={0} end={100} duration={2} delay={0} />
            }
            +
          </h1>
          <p className="text-[#000000] lg:text-lg ">Daily Tender Posted</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-5 lg:space-x-5">
        <div className="relative">
          <img src="images/projectnumber/home4-counter-4.svg" alt="" />
          <div className="w-10 h-10 bg-[#00a7ac26] rounded-full absolute -bottom-3 -right-3">

          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl text-center lg:text-5xl font-semibold text-[#000000] lg:mb-2">
            {counterOn &&
              <CountUp start={0} end={100} duration={2} delay={0} />
            }
            +
          </h1>
          <p className="text-[#000000] lg:text-lg ">Tenders Available</p>
        </div>
      </div>



    </div>
  </section>
  );
};

export default ProjectsNumber;
