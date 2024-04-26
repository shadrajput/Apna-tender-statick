import Link from "next/link";

const SingleCategory = ({ feature }) => {
  const { icon, title, img, btn, btnLink } = feature;
  return (
    <div className="relative my-2 mx-2 group overflow-hidden">
    <img src={img} alt="" className="rounded-md group-hover:scale-110 duration-500" />
    <div className="w-full h-full bg-[#00000079] absolute top-0 rounded-md"></div>
    <div className="absolute left-0 top-0 p-5 sm:p-7 xl:p-10 space-y-2 sm:space-y-3">
      <div className="flex items-center space-x-3 ">
        <h1 className=" text-2xl sm:text-5xl md:text-4xl xl:text-5xl text-white duration-300">{icon}</h1>
        <h1 className="text-white sm:text-2xl md:text-lg xl:text-xl font-semibold hover:text-[#00a7ac] cursor-pointer duration-300">{title}</h1>
      </div>
      <div>
        <span className="text-white sm:text-2xl xl:text-2xl font-semibold">223</span>
      </div>
    </div>
  </div>
  );
};

export default SingleCategory;
