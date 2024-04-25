import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoBulbOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BsClipboard2Check } from "react-icons/bs";

const Process = () => {
  return (
    <section
      id="process"
      className="process h-screen flex justify-center items-center">
        <div className="items-center w-full ">
          <div className="space-y-3 text-center">
            <h2 className="text-[45px] font-bold font">Our Work <span className="text-[#00a7ac]">Process</span></h2>
            <p>To choose your trending job dream & to make future bright.</p>
          </div>

          {/* Process Steps */}
          <div className="mt-14 px-20 flex items-center w-full justify-between">

            <div className="flex items-center flex-col justify-center w-1/4">
              <div className="relative group flex flex-col justify-center items-center h-48 w-48 border border-[#00a6ac47] rounded-full">
                <div className="w-36 h-36 bg-[#00a6ac32] group-hover:bg-[#00a7ac] group-hover:-translate-y-2 duration-300 rounded-full flex items-center justify-center ">
                  <AiOutlineFileSearch className="text-6xl group-hover:text-white duration-300 text-[#00a7ac]" />
                </div>
                <div className="bg-[#000000] rounded-full h-14 w-14 flex justify-center items-center text-white font-semibold text-lg absolute top-0 right-0">
                  01
                </div>
              </div>
              <h1 className="text-xl font-semibold mt-10">Discovery</h1>
              <p className="text-center text-sm w-2/3">We first understand your business needs and objectives.</p>
            </div>


            <div className="flex items-center flex-col justify-center w-1/4">
              <div className="relative group flex flex-col justify-center items-center h-48 w-48 border border-[#00a6ac47] rounded-full">
                <div className="w-36 h-36 bg-[#00a6ac32] group-hover:bg-[#00a7ac] group-hover:-translate-y-2 duration-300 rounded-full flex items-center justify-center ">
                  <IoBulbOutline className="text-6xl group-hover:text-white duration-300 text-[#00a7ac]" />
                </div>
                <div className="bg-[#000000] rounded-full h-14 w-14 flex justify-center items-center text-white font-semibold text-lg absolute top-0 right-0">
                  02
                </div>
              </div>
              <h1 className="text-xl font-semibold mt-10">Strategy Formulation</h1>
              <p className="text-center text-sm w-2/3">Then craft a customised tender strategy.</p>
            </div>

            <div className="flex items-center flex-col justify-center w-1/4">
              <div className="relative group flex flex-col justify-center items-center h-48 w-48 border border-[#00a6ac47] rounded-full">
                <div className="w-36 h-36 bg-[#00a6ac32] group-hover:bg-[#00a7ac] group-hover:-translate-y-2 duration-300 rounded-full flex items-center justify-center ">
                  <IoSettingsOutline className="text-6xl group-hover:text-white duration-300 text-[#00a7ac]" />
                </div>
                <div className="bg-[#000000] rounded-full h-14 w-14 flex justify-center items-center text-white font-semibold text-lg absolute top-0 right-0">
                  03
                </div>
              </div>
              <h1 className="text-xl font-semibold mt-10">Implementation</h1>
              <p className="text-center text-sm w-2/3">Strive to execute the strategy with precision.</p>
            </div>
            
            <div className="flex items-center flex-col justify-center w-1/4">
              <div className="relative group flex flex-col justify-center items-center h-48 w-48 border border-[#00a6ac47] rounded-full">
                <div className="w-36 h-36 bg-[#00a6ac32] group-hover:bg-[#00a7ac] group-hover:-translate-y-2 duration-300 rounded-full flex items-center justify-center ">
                  <BsClipboard2Check className="text-6xl group-hover:text-white duration-300 text-[#00a7ac]" />
                </div>
                <div className="bg-[#000000] rounded-full h-14 w-14 flex justify-center items-center text-white font-semibold text-lg absolute top-0 right-0">
                  04
                </div>
              </div>
              <h1 className="text-xl font-semibold mt-10">Result Analysis</h1>
              <p className="text-center text-sm w-2/3">Finally, monitor and give feedback for continuous improvement.</p>
            </div>

          </div>
          {/* Process Steps */}
        </div>
    </section>
  );
};

export default Process;
