import Link from "next/link";
import { MdCall } from "react-icons/md";

const CallToAction = () => {
  return (
    <section className="calltoaction bg-[#00a7ac] relative overflow-hidden pt-16 lg:pt-10 px-5 md:px-10 xl:px-44 space-y-10 space-x-0 xl:space-x-20 flex flex-col md:flex-row items-end lg:items-center lg:space-y-20 justify-between">

    <div className="md:w-1/2 space-y-3 xl:space-y-7">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center bg-white rounded-full w-10 h-10 xl:w-14 xl:h-14">
          <MdCall className="text-[#00a7ac] text-2xl xl:text-4xl" />
        </div>
        <span className="text-white text-xl xl:text-2xl font-bold">Call Us 24/7 Live</span>
      </div>
      <h1 className="text-white text-2xl xl:text-3xl font-bold uppercase">+91 9723747443</h1>
      <p className="text-white text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus porro dolor, corporis voluptates repudiandae doloremque saepe eius corrupti, iure aperiam quas sapiente consectetur veniam quo vero hic! Ipsa, minima.</p>
      <p className="text-white text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus porro dolor, corporis voluptates repudiandae doloremque saepe eius corrupti.</p>
      <div className="border-2 border-white p-2 flex items-center z-[9999] rounded-md mt-5">
        <input type="input" placeholder="Enter Your Email" className="bg-transparent w-full focus:outline-none placeholder-white" />
        <button className="bg-white px-7 py-3 rounded-md text-sm cursor-pointer hover:opacity-90 duration-300 font-semibold">Submit</button>
      </div>
    </div>

    <div className=" md:w-1/2 flex justify-center items-center md:items-end">
      <img src="images/contact-here.png" alt="" className="w-[70%] sm:w-[50%] md:w-[80%]" />
    </div>


  </section>
  );
};

export default CallToAction;