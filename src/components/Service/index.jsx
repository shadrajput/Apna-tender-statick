import Link from "next/link";
import { TbNotes } from "react-icons/tb";
import { GoArrowRight } from "react-icons/go";
import { AiOutlineNotification } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import { RiFileUserLine } from "react-icons/ri";
import { FaAward } from "react-icons/fa";

const Service = () => {
  return (
    <section
    id="services"
    className="tenderlist xl:px-20 bg-[#ddf2f257] flex flex-col justify-center items-center py-10 xl:py-20">
    <div className="space-y-3 px-5">
      <h2 className="text-3xl xl:text-[45px] font-bold font text-center">Explore the our <span className="text-[#00a7ac] ">Servicess</span></h2>
      <p className="text-sm text-center">To choose your trending job dream & to make future bright.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 px-5 xl:mt-20 items-center w-full gap-10 lg:gap-5">
     
      <div className="space-y-6 bg-white w-full shadow-sm p-10 hover:bg-[#00a7ac] hover:shadow-lg hover:shadow-[#00a6ac62] hover:border-[#00a7ac] rounded-md duration-700 group border relative">
        <h1 className="absolute text-8xl font-bold right-5 top-5 text-[#00a7ac] opacity-20 group-hover:text-white duration-500">01</h1>
        <AiOutlineNotification className="text-6xl group-hover:text-white duration-500" />
        <h1 className="font-bold group-hover:text-white duration-500">Tender Alert</h1>
        <p className="text-sm group-hover:text-white duration-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="flex items-center group-hover:text-white duration-500 space-x-2">
          <span className="text-sm font-semibold">Read More</span>
          <GoArrowRight />
        </div>
      </div>

      <div className="space-y-6 w-full shadow-sm p-10 bg-[#00a7ac] hover:shadow-lg hover:shadow-[#00a6ac62] hover:border-[#00a7ac]  rounded-md duration-700 group border relative">
        <h1 className="absolute text-8xl font-bold right-5 top-5 opacity-20 text-white duration-500">02</h1>
        <FaAward className="text-6xl text-white duration-500" />
        <h1 className="font-bold text-white duration-500">Tender Award Results</h1>
        <p className="text-sm text-white duration-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="flex items-center text-white duration-500 space-x-2">
          <span className="text-sm font-semibold">Read More</span>
          <GoArrowRight />
        </div>
      </div>

      <div className="space-y-6 bg-white w-full shadow-sm p-10 hover:bg-[#00a7ac] hover:shadow-lg hover:shadow-[#00a6ac62] hover:border-[#00a7ac]  rounded-md duration-700 group border relative">
        <h1 className="absolute text-8xl font-bold right-5 top-5 text-[#00a7ac] opacity-20 group-hover:text-white duration-500">03</h1>
        <RiFileUserLine className="text-6xl group-hover:text-white duration-500" />
        <h1 className="font-bold group-hover:text-white duration-500">Bidder Enrolment</h1>
        <p className="text-sm group-hover:text-white duration-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="flex items-center group-hover:text-white duration-500 space-x-2">
          <span className="text-sm font-semibold">Read More</span>
          <GoArrowRight />
        </div>
      </div>

      <div className="space-y-6 bg-white w-full shadow-sm p-10 hover:bg-[#00a7ac] hover:shadow-lg hover:shadow-[#00a6ac62] hover:border-[#00a7ac]  rounded-md duration-700 group border relative">
        <h1 className="absolute text-8xl font-bold right-5 top-5 text-[#00a7ac] opacity-20 group-hover:text-white duration-500">04</h1>
        <GoChecklist className="text-6xl group-hover:text-white duration-500" />
        <h1 className="font-bold group-hover:text-white duration-500">Product/Service Listing</h1>
        <p className="text-sm group-hover:text-white duration-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="flex items-center group-hover:text-white duration-500 space-x-2">
          <span className="text-sm font-semibold">Read More</span>
          <GoArrowRight />
        </div>
      </div>
    </div>
  </section>
  );
};

export default Service;
