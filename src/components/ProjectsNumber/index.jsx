import Link from "next/link";
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
const ProjectsNumber = () => {
  const [counterOn, setCounterOn] = useState(false)
  return (
    <section className="py-20">
      <div className="w-full flex items-center justify-between px-24">

        <div className="flex items-center space-x-5">
          <div className="relative">
            <img src="images/projectnumber/home4-counter-1.svg" alt="" />
            <div className="w-10 h-10 bg-[#00a7ac26] rounded-full absolute -bottom-3 -right-3">

            </div>
          </div>
          <div>
            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
              <h1 className="text-5xl font-semibold text-[#000000] mb-2">
                {counterOn &&
                  <CountUp start={0} end={100} duration={2} delay={0} />
                }
                +
              </h1>
              <p className="text-[#000000] text-lg ">Tenders Available</p>
            </ScrollTrigger>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative">
            <img src="images/projectnumber/home4-counter-2.svg" alt="" />
            <div className="w-10 h-10 bg-[#00a7ac26] rounded-full absolute -bottom-3 -right-3">

            </div>
          </div>
          <div>
            <h1 className="text-5xl font-semibold text-[#000000] mb-2">
              {counterOn &&
                <CountUp start={0} end={100} duration={2} delay={0} />
              }
              +
            </h1>
            <p className="text-[#000000] text-lg ">Daily User Visited</p>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative">
            <img src="images/projectnumber/home4-counter-3.svg" alt="" />
            <div className="w-10 h-10 bg-[#00a7ac26] rounded-full absolute -bottom-3 -right-3">

            </div>
          </div>
          <div>
            <h1 className="text-5xl font-semibold text-[#000000] mb-2">
              {counterOn &&
                <CountUp start={0} end={100} duration={2} delay={0} />
              }
              +
            </h1>
            <p className="text-[#000000] text-lg ">Daily Tender Posted</p>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative">
            <img src="images/projectnumber/home4-counter-4.svg" alt="" />
            <div className="w-10 h-10 bg-[#00a7ac26] rounded-full absolute -bottom-3 -right-3">

            </div>
          </div>
          <div>
            <h1 className="text-5xl font-semibold text-[#000000] mb-2">
              {counterOn &&
                <CountUp start={0} end={100} duration={2} delay={0} />
              }
              +
            </h1>
            <p className="text-[#000000] text-lg ">Tenders Available</p>
          </div>
        </div>



      </div>
    </section>
  );
};

export default ProjectsNumber;
