import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";

const MyProfile = () => {
    const user = useSelector((state) => state.user);
    return (
        <>
            <section
                id=""
                className="w-full">
                <div className="bg-white border-t-4 border-t-[#00a7ac] rounded-md w-full px-10 pt-5 pb-10 border border-[#00a7ac1f] ">
                    <div className="flex items-center space-x-3">
                        <span className="text-[20px] font-medium text-[#000000]">My Profile</span>
                    </div>
                    <div className="flex items-center justify-center space-x-24 mt-10 ">
                        <div className="w-[25%] bg-gray-100 rounded-full overflow-hidden">
                            <img src="/images/myaccount/avatar.svg" alt="" className="" />
                        </div>
                        <div className="space-y-5">
                            <h1 className="text-2xl">Howdy, <span className="font-bold">John Deo!</span></h1>
                            <p>Your Subscribtion will be end On 15-02-2025</p>
                            <div className="flex items-center space-x-3 ">
                                <div className="bg-blue-500 shadow-md px-5 py-1 rounded-full space-x-2 flex items-center justify-center">
                                    <span className="text-white">20</span>
                                    <span className="text-white">Total tender</span>
                                </div>
                                <div className="bg-green-500 shadow-md px-5 py-1 rounded-full space-x-2 flex items-center justify-center">
                                    <span className="text-white">10</span>
                                    <span className="text-white">Remain Tender</span>
                                </div>
                                <div className="bg-orange-500 shadow-md px-5 py-1 rounded-full space-x-2 flex items-center justify-center">
                                    <span className="text-white">10</span>
                                    <span className="text-white">Used Tender</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <form action="" className="space-y-10 mt-7">
                            <div className="flex items-center justify-between space-x-7">
                                {/* <div className="py-10 w-2/3 space-x-5">
                                    <div
                                        id="FileUpload"
                                        className="relative block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                        />
                                        <div className="flex flex-col items-center justify-center space-x-5 ">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                        fill="#3C50E0"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                        fill="#3C50E0"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                        fill="#3C50E0"
                                                    />
                                                </svg>
                                            </span>
                                            <p>
                                                <span className="text-[#00a7ac] ">Click to upload</span> or
                                                drag and drop your profile
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="flex-col flex space-y-2 w-full ">
                                    <label htmlFor="Name" className="font-semibold text-sm">Username</label>
                                    <div className=" rounded-md border border-[#00a7ac1f] bg-white hover:border-[#00a7ac] duration-700 px-5 py-3">
                                        {user.user.username}
                                    </div>
                                </div>
                                <div className="flex-col flex space-y-2 w-full ">
                                    <label htmlFor="Name" className="font-semibold text-sm">Mobile</label>
                                    <div className=" rounded-md border border-[#00a7ac1f] bg-white hover:border-[#00a7ac] duration-700 px-5 py-3">
                                        {user.user.mobile}
                                    </div>
                                </div>
                                <div className="flex-col flex space-y-2 w-full ">
                                    <label htmlFor="Name" className="font-semibold text-sm">Email</label>
                                    <div className=" rounded-md border border-[#00a7ac1f] bg-white hover:border-[#00a7ac] duration-700 px-5 py-3">
                                        {user.user.email}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyProfile
    ;
