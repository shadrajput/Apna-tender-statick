import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const SingleTeam = ({ team }) => {
  const { image, name, designation, facebookLink, twitterLink, instagramLink } =
    team;
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4 ">
      <div className="flex flex-col px-5 group space-y-5">
        <div className="">
          <Image
            src={image}
            alt={name}
            className="w-full rounded-tl-[50px] rounded-br-[50px]"
            width={300}
            height={300}
          />
        </div>

        <div className="w-full flex items-center justify-center space-x-5" >
          <FaLinkedinIn className="text-black-0 text-xl cursor-pointer hover:text-primary duration-300" />
          <FaInstagram className="text-black-0 text-xl cursor-pointer hover:text-primary duration-300" />
          <FaFacebookF className="text-black-0 text-xl cursor-pointer hover:text-primary duration-300" />
        </div>
      </div>

    </div>
  );
};

export default SingleTeam;