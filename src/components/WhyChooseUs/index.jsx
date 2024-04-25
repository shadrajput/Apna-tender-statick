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
      <section className="whychooseus h-[400px]">
        <div className="bg-[#000000b7] w-full h-full  relative">

          <div className="mx-20 flex flex-col justify-center items-center h-full">
            <h1 className="text-white text-[45px] font-bold">Why Choose Us</h1>
            <p className="text-white text-center w-2/3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis commodi nam aspernatur provident amet. Voluptatem itaque alias quo et natus, sapiente perferendis voluptatibus odio repudiandae animi repellat at. Eum, illum.</p>

            <div className=" grid grid-cols-6 mt-14 gap-10 mx-20">
              <div className="flex items-center justify-center flex-col space-y-3">
                <IoDocumentLockOutline className="text-5xl text-white" />
                <h1 className="text-white text-lg  text-center font-semibold">Data Security Ensured</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <AiOutlineSolution className="text-5xl text-white" />
                <h1 className="text-white text-lg  text-center font-semibold">End to End Tender Solution</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <FaRegHandshake className="text-5xl text-white" />
                <h1 className="text-white text-lg  text-center font-semibold">Data Security Ensured</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <PiUsersThreeLight className="text-5xl text-white" />
                <h1 className="text-white text-lg  text-center font-semibold">Experianced Team Memders</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <VscDebugDisconnect className="text-5xl text-white" />
                <h1 className="text-white text-lg  text-center font-semibold">Connect With GOVT</h1>
              </div>
              <div className="flex items-center justify-center flex-col space-y-3">
                <IoDocumentLockOutline className="text-5xl text-white" />
                <h1 className="text-white text-lg  text-center font-semibold">Data Security Ensured</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
