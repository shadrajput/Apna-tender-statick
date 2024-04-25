import { useEffect, useState } from "react";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { IoMdShare } from "react-icons/io";
import { GoBookmark } from "react-icons/go";
import { GiMoneyStack } from "react-icons/gi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa6";
import InquiryTenderModel from "../InquiryTenderModel";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '@/services/bookmark'
import { useRemoveAppliedTenderMutation, useAddInterestMutation } from '@/services/tender'
import { MdArrowRightAlt } from "react-icons/md";
import { TbFileDownload } from "react-icons/tb";
import Link from "next/link";


const Card = ({ Data, pagetype, itemsPerPage, setPageNo, pageCount }) => {
    const tender_id = Data?.tender?.id
    const [inquiry, setInquiry] = useState(false);
    const { token } = useSelector((state) => state.user);
    const [addBookMark, { ...addingbookmark }] = useAddBookmarkMutation()
    const [addInterest, { ...addingInterest }] = useAddInterestMutation()
    const [deleteBookMark, { ...deletinggBookmark }] = useDeleteBookmarkMutation()
    const [removeAppliedTender, { ...removingAppliedTender }] = useRemoveAppliedTenderMutation()
    const isBookmarked = true
    const isopening = Data.tender?.opening_date;
    const isclosing = Data.tender?.closing_date;
    const Opening = new Date(isopening);
    const Closing = new Date(isclosing);

    // Date Formate Function
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const openingdate = Opening.toLocaleString('en-US', options);
    const closingdate = Closing.toLocaleString('en-US', options);

    function subtractDates(date1, date2) {
        // Convert the date strings to Date objects
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        // Calculate the difference in milliseconds
        const diffInMs = Math.abs(d1 - d2);

        // Convert milliseconds to days
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays;
    }

    // AppliedTender Function
    const AppliedTender = async (tender_id) => {
        const res = await addInterest({ tender_id })
        if (res.error) {
            toast.error(res.error.data.message);
        }
        else if (res.data.success) {
            toast.success(res.data.message);
        }
    }

    // BookMark Tender Function
    const BookMarkTender = async (tender_id) => {
        const res = await addBookMark({ tender_id })
        if (res.error) {
            toast.error(res.error.data.message);
        }
        else if (res.data.success) {
            toast.success(res.data.message);
        }
    }

    // Remove BookMark Tender Function
    const DeleteBookMarkTender = async (tender_id) => {
        const res = await deleteBookMark({ tender_id })
        if (res.error) {
            toast.error(res.error.data.message);
        }
        else if (res.data.success) {
            toast.success(res.data.message);
        }
    }

    // Remove Applied Tender Function
    const RemoveAppliedTender = async (tender_id) => {
        const res = await removeAppliedTender({ tender_id })
        if (res.error) {
            toast.error(res.error.data.message);
        }
        else if (res.data.success) {
            toast.success(res.data.message);
        }
    }



    function RequestTender() {
        setInquiry(true)
    }
    console.log(Data)
    return (
        <>

            <div className="pt-5 pb-3 px-7 flex flex-col bg-white justify-between mb-8  border rounded-3xl 
            shadow-md shadow-[#00a6ac0f] hover:shadow-none hover:border-[#00a7ac] duration-300 relative overflow-hidden">

                <div className="flex items-center justify-between w-full">
                    <p className="text-[#00a7ac] font-medium">#ATI : {Data.tender?.id}</p>
                    <div className="flex items-center space-x-1">
                        <div className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-8 h-8 flex justify-center items-center">
                            <IoMdShare />
                        </div>
                        <div className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center">
                            <IoFolderOpenOutline />
                        </div>
                        <div className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center">
                            <TbFileDownload className="text-lg" />
                        </div>
                        <div
                            onClick={() => {
                                Data.isBookmarked == true || pagetype == "BookMarked" ? DeleteBookMarkTender(Data.tender?.id) : null
                            }}

                            className={`${Data.isBookmarked == true || pagetype == "BookMarked" ? "bg-[#00a7ac] text-white" : "bg-transparent"} hover:bg-[#00a7ac] cursor-pointer hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center`}>
                            <GoBookmark />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between py-3">
                    <div className="w-[80%] flex">
                        <div className="w-[70%]" >
                            <h3 className="font-semibold text-xl text-[#000000] hover:text-[#00a7ac] duration-300 mb-4">
                                {Data.tender?.title}
                            </h3>
                            <p className="text-sm text-gray-600 ">{Data.tender?.description}</p>
                            <div className="flex items-center space-x-3 mt-4 bg-red-100 p-2 w-[50%] justify-center rounded-md">
                                <FaRegCalendar className="text-red-500" />
                                <span className="font-medium text-sm text-red-500">Closing Date : </span>
                                <h1 className="text-sm font-medium text-red-500">{closingdate}</h1>
                            </div>
                        </div>

                        <div className="bg-[#00a7ac] w-[1px] mx-7">
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-5 w-[30%]">
                            <div className="flex items-center w-full space-x-3">
                                <FaRegCalendar className="text-lg text-[#00a7ac]" />
                                <span className="text-sm">Opening Date : </span>
                                <h1 className="text-[#000000] text-sm font-medium">{openingdate}</h1>
                            </div>
                            <div className="flex items-center w-full space-x-3">
                                <FiMapPin className="text-lg text-[#00a7ac]" />
                                <span className="text-sm">Location : </span>
                                <h1 className="text-[#000000] text-sm font-medium">{Data.tender?.location}</h1>
                            </div>
                            <div className="flex items-center w-full space-x-3">
                                <GiMoneyStack className="text-xl text-[#00a7ac]" />
                                <span className="text-sm">Estimated : </span>
                                <h1 className="text-[#000000] text-sm font-medium">{Data.tender?.estimated_value}</h1>
                            </div>
                            <div className="flex items-center w-full space-x-3">
                                <BsFillBriefcaseFill className="text-lg text-[#00a7ac]" />
                                <span className="text-sm">Department : </span>
                                <h1 className="text-[#000000] text-sm font-medium">{Data.tender?.department}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-[20%] items-end justify-between h-full space-y-2 ">
                        <div className="flex justify-end">

                            {
                                Data.status ?
                                    (
                                        <button className={`${Data.status == "pending" ? "bg-amber-500 text-white" : "bg-[#00a7ac] text-white"} px-3 py-1 rounded-md`}>
                                            {Data.status}
                                        </button>
                                    )
                                    :
                                    (

                                        Data.isApplied == true ?
                                            <button className="bg-green-500 text-white rounded-md px-3 py-2">
                                                Allready Applied
                                            </button>
                                            :
                                            <button
                                                onClick={() => {
                                                    token?.length > 2 ? AppliedTender(tender_id) : RequestTender()
                                                }}
                                                disabled={addingInterest.isLoading}
                                                className={`${addingInterest.isLoading ? 'opacity-60' : ''} hover:before:bg-redborder-red-500 rounded-md relative h-[50px] w-40 overflow-hidden border border-[#00a7ac] bg-white px-3 text-[#00a7ac] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#00a7ac] before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full`}>
                                                <span className="relative z-10">{addingInterest.isLoading ? 'Loading...' : 'Apply this tender'}</span>
                                            </button>

                                    )
                            }
                        </div>
                        <h1 className="text-[13px] font-medium text-red-500 text-end pr-3">( {subtractDates(Data.tender?.opening_date, Data.tender?.closing_date)}  Days left )</h1>

                        <Link
                            className=""
                            href={`/tender-details/${tender_id}`}>
                            <div className="flex items-center justify-end mr-5 group pt-5 text-sm space-x-2">
                                <span
                                    // onClick={() => {
                                    //     token?.length > 2 ? "" : RequestTender()
                                    // }}
                                    className="underline group-hover:text-[#00a7ac] group-hover:scale-105 duration-300">View More</span>
                                <MdArrowRightAlt
                                    // onClick={() => {
                                    //     token?.length > 2 ? "" : RequestTender()
                                    // }}
                                    className="text-2xl mt-1 group-hover:text-[#00a7ac] group-hover:translate-x-1 duration-300" />
                            </div>
                        </Link>

                    </div>

                    <div className="hidden justify-end items-end space-x-3 flex-col">
                        <span className="text-sm bg-primary text-white px-2 rounded-md py-2">Req Sended</span>
                        <span className="text-sm bg-blue-500 text-white px-2 rounded-md py-2">Req Accepted</span>
                        <span className="text-sm bg-green-500 text-white px-2 rounded-md py-2">Form Submitted</span>
                        <span className="text-sm bg-amber-500 text-white px-2 rounded-md py-2">Result Declared</span>
                    </div>

                </div>

            </div>

            <InquiryTenderModel
                showModal={inquiry}
                handleShowModal={setInquiry}
                id={Data.tender?.id}
            />
        </>
    );
};

export default Card;
