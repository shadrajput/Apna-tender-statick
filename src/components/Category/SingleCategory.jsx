import Link from "next/link";

const SingleCategory = ({ feature }) => {
  const { icon, title, img, btn, btnLink } = feature;
  return (
    <div className="relative my-2 mx-2 group overflow-hidden">
      <img src={img} alt="" className="rounded-md group-hover:scale-110 duration-500" />
      <div className="w-full h-full bg-[#00000079] absolute top-0 rounded-md">.</div>
      <div className="absolute top-0 p-10">
        <h1 className="text-4xl mb-5 text-white duration-300">{icon}</h1>
        <h1 className="text-white text-lg font-semibold hover:text-[#00a7ac] cursor-pointer duration-300">{title}</h1>
        <span className="text-white text-lg font-semibold">223</span>
      </div>
    </div>
  );
};

export default SingleCategory;
