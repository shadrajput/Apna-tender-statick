import Link from "next/link";
import { MdCall } from "react-icons/md";

const CallToAction = () => {
  return (
    <section className="calltoaction bg-[#00a7ac] relative overflow-hidden pt-16 px-44 space-x-20 flex items-start justify-between">

      <div className="w-1/2 space-y-7">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center bg-white rounded-full w-14 h-14">
            <MdCall className="text-[#00a7ac] text-4xl" />
          </div>
          <span className="text-white text-2xl font-bold">Call Us 24/7 Live</span>
        </div>
        <h1 className="text-white text-3xl font-bold uppercase">+91 1234567890</h1>
        <p className="text-white text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus porro dolor, corporis voluptates repudiandae doloremque saepe eius corrupti, iure aperiam quas sapiente consectetur veniam quo vero hic! Ipsa, minima.</p>
        <p className="text-white text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus porro dolor, corporis voluptates repudiandae doloremque saepe eius corrupti.</p>
        <div className="border-2 border-white p-2 flex items-center z-[9999] rounded-md mt-5">
          <input type="input" placeholder="Enter Your Email" className="bg-transparent w-full focus:outline-none placeholder-white" />
          <button className="bg-white px-7 py-3 rounded-md text-sm cursor-pointer hover:opacity-90 duration-300 font-semibold">Submit</button>
        </div>
      </div>

      <div className="w-1/2">
        <img src="images/contact-here.png" alt="" className="w-[80%]" />
      </div>
    </section>
  );
};

export default CallToAction;