import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { IoDocumentLockOutline } from "react-icons/io5";
import { AiOutlineSolution } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";
import { PiUsersThreeLight } from "react-icons/pi";
import { VscDebugDisconnect } from "react-icons/vsc";

const WhyChooseUs = () => {
  return (
    <>
       <section className="whychooseus h-full xl:h-[400px]">
        <div className="bg-[#000000b7] w-full h-full relative">

          <div className="xl:mx-20 flex flex-col justify-center items-center h-full px-5 py-10">
            <h1 className="text-white mb-3 text-3xl xl:text-[45px] font-bold">Why Choose Us</h1>
            <p className="text-white text-center text-sm lg:text-base md:w-2/3 xl:w-1/2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis commodi nam aspernatur provident amet.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mt-14 gap-5 xl:gap-10 xl:mx-20">
              <div className="flex items-center justify-center flex-col space-y-3">
                <IoDocumentLockOutline className="text-4xl xl:text-5xl text-white" />
                <h1 className="text-white xl:text-lg text-center font-semibold">Data Security Ensured</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <AiOutlineSolution className="text-4xl xl:text-5xl text-white" />
                <h1 className="text-white xl:text-lg text-center font-semibold">End to End Tender Solution</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <FaRegHandshake className="text-4xl xl:text-5xl text-white" />
                <h1 className="text-white xl:text-lg text-center font-semibold">Data Security Ensured</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <PiUsersThreeLight className="text-4xl xl:text-5xl text-white" />
                <h1 className="text-white xl:text-lg text-center font-semibold">Experianced Team Memders</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <VscDebugDisconnect className="text-4xl xl:text-5xl text-white" />
                <h1 className="text-white xl:text-lg text-center font-semibold">Connect With GOVT</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <IoDocumentLockOutline className="text-4xl xl:text-5xl text-white" />
                <h1 className="text-white xl:text-lg text-center font-semibold">Data Security Ensured</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
