import Image from "next/image";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md"
import { FiPhoneCall } from "react-icons/fi"
import { CgMail } from "react-icons/cg"
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";


const Footer = () => {
  return (
    <footer
      className="tenderlist
        bg-[#00a6ac59] pt-20 lg:pt-[100px] px-20 z-[999] "
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className=" grid grid-cols-3 justify-between items-start">

          <div className="w-full">
            <Link href="/" className="mb-6 inline-block">
              <img
                src="/images/logo/Tplogo.png"
                alt="logo"
                className="max-w-full"
              />
            </Link>
            <p className="mb-8 text-base font-medium text-black w-3/4">
              Apnatender.com is a trusted Tender bidding services provider who provide various services like Tender submission, Result, & more . Apna tender is #1 in Government, Public, and Private Tenders - we help you win them for you.
            </p>
            <div className="flex items-center space-x-5">
              {/* <Link> */}
              <FaInstagram className="text-2xl hover:text-[#00a7ac] cursor-pointer duration-300" />
              {/* </Link> */}
              {/* <Link> */}
              <FaLinkedinIn className="text-2xl hover:text-[#00a7ac] cursor-pointer duration-300" />
              {/* </Link> */}
              {/* <Link> */}
              <FaFacebookSquare className="text-2xl hover:text-[#00a7ac] cursor-pointer duration-300" />
              {/* </Link> */}
            </div>
          </div>

          <div className="w-full pl-24">
            <div className="mb-10 w-full">
              <h1 className="text-[#00a7ac] font-bold text-2xl">Useful Links</h1>
              <ul className="pt-10">
                <li>
                  <Link
                    href="/#"
                    className="mb-3 inline-block text-base text-[#000000ab] hover:text-[#000000]"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#"
                    className="mb-3 inline-block text-base text-[#000000ab] hover:text-[#000000]"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#"
                    className="mb-3 inline-block text-base text-[#000000ab] hover:text-[#000000]"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#"
                    className="mb-3 inline-block text-base text-[#000000ab] hover:text-[#000000]"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full pl-12">
            <div className="flex items-center space-x-5">
              <h1 className="text-[#00a7ac] font-bold text-2xl ">Contact Information</h1>
            </div>
            <nav className="pt-10 space-y-5 ">
              <li className="flex items-center space-x-5">
                <div className="flex justify-center items-center rounded-md">
                  <FiPhoneCall className="text-2xl text-[#00a7ac]" />
                </div>
                <div className=" flex flex-col  items-start justify-center">
                  <h1 className="text-gray-500 text-sm">
                    Call
                  </h1>
                  <p className="text-[#000000ab] font-medium">+91 9723747443</p>
                </div>
              </li>
              <li className="flex items-center space-x-5">
                <div className="flex justify-center items-center rounded-md">
                  <CgMail className="text-[30px] text-[#00a7ac]" />
                </div>
                <div className=" flex flex-col  items-start justify-center">
                  <h1 className="text-gray-500 text-sm">
                    Email
                  </h1>
                  <p className="text-[#000000ab] font-medium">care@apnatender.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex justify-center items-center rounded-md">
                  <MdLocationOn className="text-[30px] text-[#00a7ac]" />
                </div>
                <div className=" flex flex-col  items-start justify-center ml-5">
                  <h1 className="text-gray-500 text-sm">
                    Address
                  </h1>
                  <p className="text-[#000000ab] font-medium">B-133 and 135, 1st Floor, Safal Sumel 8 Business Park, Nr Ajit Mill Cross Rd, Opp City Point Hotel, Rakhiyal, Ahmedabad, Gujarat 380023.</p>
                </div>
              </li>
            </nav>
          </div>


        </div>
      </div>

      <div className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2">
              <div className="my-1">
                <div className="-mx-3 flex items-center justify-center md:justify-start">
                  <Link
                    href="/#"
                    className="px-3 text-base text-[#000000ab] hover:text-white hover:underline"
                  >
                    Privacy policy
                  </Link>
                  <Link
                    href="/#"
                    className="px-3 text-base text-[#000000ab] hover:text-white hover:underline"
                  >
                    Legal notice
                  </Link>
                  <Link
                    href="/#"
                    className="px-3 text-base text-[#000000ab] hover:text-white hover:underline"
                  >
                    Terms of service
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2">
              <div className="my-1 flex justify-center md:justify-end">
                <p className="text-base text-black ">
                  Designed and Developed by{" "}
                  <Link
                    href="https://wellbenix.com"
                    rel="nofollow noopner noreferrer"
                    target="_blank"
                    className="text-[#00a7ac] hover:underline"
                  >
                    Wellbenix
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
