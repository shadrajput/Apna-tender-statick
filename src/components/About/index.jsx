import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";


const About = () => {
  return (
    <section
      id="about"
      className="about px-5 xl:py-20 xl:px-32 mt-5 lg:py-10"
    >
      <div className="flex flex-col lg:flex-row items-center w-full space-x-0 lg:space-x-10">

        <div className="w-full lg:w-[55%] grid grid-rows-2 gap-5 justify-end items-end">
          <div className="grid grid-cols-2 gap-5 ">
            <div>
              <img src="images/about/medical.jpg" alt="" className="rounded-md" />
            </div>
            <div>
              <img src="images/about/aerial-view-shanghai-overpass-night_1359-39.jpg" alt="" className="rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 ">
            <div>
              <img src="images/about/cunstruction.jpg" alt="" className="rounded-md" />
            </div>
            <div>
              <img src="images/about/solar.jpg" alt="" className="rounded-md" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[45%] flex items-center justify-center mt-5 lg:mt-0">
          <div className="max-w-full ">
            <span className="font-semibold text-sm md:text-base text-[#00a7ac]">GET TO KNOW US</span>
            <h2 className=" text-3xl xl:text-[45px] mt-2 mb-5 xl:mb-10 font-bold leading-tight text-dark dark:text-white sm:text-[45px] sm:leading-[1.2]">
              Providing Renewable Energy Solutions
            </h2>
            <p className="w-[90%] text-base leading-relaxed text-body-color dark:text-dark-6">
              The essence of Apna Tender lies in its commitment to businesses. While we embrace the sophistication of AI, our foundation.
            </p>

            <div className="py-10 space-x-10 flex items-center">
              <div className="flex flex-col items-center space-x-0 space-y-2 lg:space-x-3">
                <div className="w-14 h-14 text-2xl bg-[#00a7ac26]  text-[#00a7ac] flex justify-center items-center rounded-full">
                  <AiOutlineSolution />
                </div>
                <span className="font-semibold text-center">Residential Service</span>
              </div>
              <div className="flex flex-col items-center space-x-0 space-y-2 lg:space-x-3">
                <div className="w-14 h-14 text-2xl bg-[#00a7ac26]  text-[#00a7ac] flex justify-center items-center rounded-full">
                  <AiOutlineSolution />
                </div>
                <span className="font-semibold text-center">Residential Service</span>
              </div>
            </div>

            <div className="space-y-3 pb-10">
              <div className="flex items-center space-x-3">
                <FaCheckCircle className="text-lg text-[#00a6ac]" />
                <span className="font-medium">Solutions can help reduce the risk of oil spills</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaCheckCircle className="text-lg text-[#00a6ac]" />
                <span className="font-medium">Help reduce the impact of climate change</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaCheckCircle className="text-lg text-[#00a6ac]" />
                <span className="font-medium">Help reduce the impact of climate change</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;