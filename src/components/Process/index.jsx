import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoBulbOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BsClipboard2Check } from "react-icons/bs";

const Process = () => {
  return (
    <section
    id="process"
    className="process xl:h-screen flex justify-center items-center py-10 xl:py-0">
      <div className="items-center w-full ">
        <div className="space-y-3 text-center px-5">
          <h2 className="text-3xl xl:text-[45px] font-bold font">Our Work <span className="text-[#00a7ac]">Process</span></h2>
          <p className="text-sm">To choose your trending job dream & to make future bright.</p>
        </div>

        {/* Process Steps */}
        <div className=" mt-14 xl:mt-20 xl:px-20 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-10 items-center w-full justify-center px-5">

          <div className="flex items-center flex-col justify-center">
            <div className="relative group flex flex-col justify-center items-center h-32 w-32 xl:h-48 xl:w-48 border border-[#00a6ac47] rounded-full">
              <div className="w-24 h-24 xl:w-36 xl:h-36 bg-[#00a6ac32] group-hover:bg-[#00a7ac] group-hover:-translate-y-2 duration-300 rounded-full flex items-center justify-center ">
                <AiOutlineFileSearch className="text-4xl xl:text-6xl group-hover:text-white duration-300 text-[#00a7ac]" />
              </div>
              <div className="bg-[#000000] rounded-full h-10 w-10 xl:h-14 xl:w-14 flex justify-center items-center text-white font-semibold text-lg absolute top-0 right-0">
                01
              </div>
            </div>
            <h1 className="text-lg xl:text-xl font-semibold mt-3 xl:mt-10">Discovery</h1>
            <p className="text-center text-xs sm:text-sm xl:w-2/3">We first understand your business needs and objectives.</p>
          </div>

          <div className="flex items-center flex-col justify-center">
            <div className="relative group flex flex-col justify-center items-center h-32 w-32 xl:h-48 xl:w-48 border border-[#00a6ac47] rounded-full">
              <div className="w-24 h-24 xl:w-36 xl:h-36 bg-[#00a6ac32] group-hover:bg-[#00a7ac] group-hover:-translate-y-2 duration-300 rounded-full flex items-center justify-center ">
                <AiOutlineFileSearch className="text-4xl xl:text-6xl group-hover:text-white duration-300 text-[#00a7ac]" />
              </div>
              <div className="bg-[#000000] rounded-full h-10 w-10 xl:h-14 xl:w-14 flex justify-center items-center text-white font-semibold text-lg absolute top-0 right-0">
                01
              </div>
            </div>
            <h1 className="text-lg xl:text-xl font-semibold mt-3 xl:mt-10">Discovery</h1>
            <p className="text-center text-xs sm:text-sm xl:w-2/3">We first understand your business needs and objectives.</p>
          </div>

          <div className="flex items-center flex-col justify-center">
            <div className="relative group flex flex-col justify-center items-center h-32 w-32 xl:h-48 xl:w-48 border border-[#00a6ac47] rounded-full">
              <div className="w-24 h-24 xl:w-36 xl:h-36 bg-[#00a6ac32] group-hover:bg-[#00a7ac] group-hover:-translate-y-2 duration-300 rounded-full flex items-center justify-center ">
                <AiOutlineFileSearch className="text-4xl xl:text-6xl group-hover:text-white duration-300 text-[#00a7ac]" />
              </div>
              <div className="bg-[#000000] rounded-full h-10 w-10 xl:h-14 xl:w-14 flex justify-center items-center text-white font-semibold text-lg absolute top-0 right-0">
                01
              </div>
            </div>
            <h1 className="text-lg xl:text-xl font-semibold mt-3 xl:mt-10">Discovery</h1>
            <p className="text-center text-xs sm:text-sm xl:w-2/3">We first understand your business needs and objectives.</p>
          </div>
          
          <div className="flex items-center flex-col justify-center">
            <div className="relative group flex flex-col justify-center items-center h-32 w-32 xl:h-48 xl:w-48 border border-[#00a6ac47] rounded-full">
              <div className="w-24 h-24 xl:w-36 xl:h-36 bg-[#00a6ac32] group-hover:bg-[#00a7ac] group-hover:-translate-y-2 duration-300 rounded-full flex items-center justify-center ">
                <AiOutlineFileSearch className="text-4xl xl:text-6xl group-hover:text-white duration-300 text-[#00a7ac]" />
              </div>
              <div className="bg-[#000000] rounded-full h-10 w-10 xl:h-14 xl:w-14 flex justify-center items-center text-white font-semibold text-lg absolute top-0 right-0">
                01
              </div>
            </div>
            <h1 className="text-lg xl:text-xl font-semibold mt-3 xl:mt-10">Discovery</h1>
            <p className="text-center text-xs sm:text-sm xl:w-2/3">We first understand your business needs and objectives.</p>
          </div>

        </div>
        {/* Process Steps */}
      </div>
  </section>
  );
};

export default Process;
