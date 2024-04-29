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
import { useRemoveAppliedTenderMutation, useAddInterestMutation } from '@/services/tender'
import { useAddBookmarkMutation } from '@/services/bookmark'
import { MdArrowRightAlt } from "react-icons/md";
import { TbFileDownload } from "react-icons/tb";
import Link from "next/link";
import { Tooltip } from '@nextui-org/react';
import moment from 'moment';
import { BiLogoGmail } from "react-icons/bi";
import { useRouter } from 'next/router';


const TenderCard = ({ Data, resultId, isRecent, itemsPerPage, setPageNo, pageCount }) => {
    const { tenderId, apna_tender_id, title, tenderValue, address, productCategory, bidClosingDate, tenderOpeningDate, organigationChain, isBookmarked, isApplied, is_recent } = Data;
    // console.log(Data)
    let tender_id = tenderId

    const router = useRouter()
    const [inquiry, setInquiry] = useState(false);
    const { token } = useSelector((state) => state.user);
    const [addBookMark, { ...addingbookmark }] = useAddBookmarkMutation()
    const [addInterest, { ...addingInterest }] = useAddInterestMutation()
    const [removeAppliedTender, { ...removingAppliedTender }] = useRemoveAppliedTenderMutation()
    const isopening = tenderOpeningDate;
    const isclosing = bidClosingDate;
    const Opening = new Date(isopening);
    const Closing = new Date(isclosing);

    // Date Formate Function
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const openingdate = Opening.toLocaleString('en-US', options);
    const closingdate = Closing.toLocaleString('en-US', options);

    function subtractDates(bidClosingDate) {
        // Convert the date strings to Date objects
        const d1 = new Date();
        const d2 = new Date(bidClosingDate);

        // Calculate the difference in milliseconds
        const diffInMs = Math.abs(d1 - d2);

        // Convert milliseconds to days
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays;
    }

    function generateID() {
        // Generate a random 4-digit number
        const randomNum = Math.floor(1000 + Math.random() * 9000);

        // Concatenate the ID components using string interpolation
        const id = `ATI24${randomNum}`;

        return id;
    }


    const extractState = () => {
        const addressParts = address.split(', ');
        return addressParts[addressParts.length - 1];
    };

    const state = extractState();
    const limitedText = organigationChain.substring(0, 15) + '***';

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

    // BookMarkTender Function
    const BookMarkTender = async (tender_id) => {
        const res = await addBookMark({ tender_id })
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

    const handlenavigate = () => {
        router.push({
          pathname: `/tender-details/${tender_id}`,
        //   query: { filter: "department" }
        }).then(() => {
          // console.log('Navigated to other page with value:', value);
        });
      };

    return (
        <>
            <div className="w-full pt-5 relative pb-5 px-5 lg:px-7 flex flex-col bg-white justify-between mb-8 border rounded-3xl shadow-md shadow-[#00a6ac0f] hover:shadow-none hover:border-[#00a7ac] duration-300">

                {
                    isRecent === true ?
                        <div className="absolute">
                            <img src="images/new.png" alt="" className=" w-[90px] xl:w-[100px] -translate-x-9 -translate-y-9 xl:-translate-x-11 xl:-translate-y-10" />
                        </div>
                        :
                        null
                }

                <div className="flex items-center justify-between w-full">
                    <p className="text-[#00a7ac] font-medium">#ATI : {generateID()}</p>
                    {
                        resultId ?
                            <div
                                onClick={() => {
                                    token?.length > 2 ? BookMarkTender(tender_id) : RequestTender()
                                }}
                                className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center">
                                <IoFolderOpenOutline />
                            </div>
                            :
                            <div className="flex items-center mb-1">
                                <Tooltip
                                    content="Share"
                                    delay={1000}
                                    className="bg-black rounded-md text-white px-2 text-sm"
                                >
                                    <a href="mailto:">
                                        <div
                                            className="hover:bg-[#00a7ac] hover:text-white group duration-300 rounded-full w-7 h-7 flex justify-center items-center">
                                            <BiLogoGmail className="text-red-500 group-hover:text-white" />
                                        </div>
                                    </a>
                                </Tooltip>
                                <Tooltip
                                    content="Request"
                                    delay={1000}
                                    className="bg-black rounded-md text-white px-2 text-sm"
                                >
                                    <div
                                        onClick={() => {
                                            token?.length > 2 ? BookMarkTender(tender_id) : RequestTender()
                                        }}
                                        className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center">
                                        <IoFolderOpenOutline />
                                    </div>
                                </Tooltip>
                                <Tooltip
                                    content="Download"
                                    delay={1000}
                                    className="bg-black rounded-md text-white px-2 text-sm"
                                >
                                    <div
                                        onClick={() => {
                                            token?.length > 2 ? BookMarkTender(tender_id) : RequestTender()
                                        }}
                                        className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center">
                                        <TbFileDownload />
                                    </div>
                                </Tooltip>
                                <Tooltip
                                    content="Bookmark"
                                    delay={1000}
                                    className="bg-black rounded-md text-white px-2 text-sm"
                                >
                                    <div
                                        onClick={() => {
                                            token?.length > 2 ? BookMarkTender(tender_id) : RequestTender()
                                        }}

                                        className={`${isBookmarked == true ? "bg-[#00a7ac] text-white" : "bg-transparent"} hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center`}>
                                        <GoBookmark />
                                    </div>
                                </Tooltip>
                            </div>
                    }

                </div>

                <div className="flex flex-col xl:flex-row items-center justify-between w-full lg:space-y-3 ">
                    <div className="w-full xl:w-[80%] flex flex-col lg:flex-row ">
                        <div className="w-full lg:justify-between xl:w-[70%]" >
                            <div>
                                <h3 className="font-semibold text-xl text-[#000000] hover:text-[#00a7ac] duration-300">
                                    {productCategory}
                                </h3>
                                <h3 className="text-gray-600 text-sm lg:text-base mt-1">{title}</h3>
                            </div>
                            <div className="flex justify-start mt">
                                {
                                    resultId ?
                                        <div className="flex mt-3 items-start space-x-3 bg-[#00a6ac1c] px-2 py-2 w-[45%] justify-start rounded-md">
                                            <span className="font-medium text-sm text-[#000000]">Tender Result Bidder : </span>
                                            <h1 className="text-sm font-medium text-[#000000]">Wellbenix</h1>
                                        </div>
                                        :
                                        <div className="flex mt-3 items-start lg:items-center space-x-3 bg-red-100 p-2 w-full xl:w-[45%] justify-center rounded-md">
                                            <div className="flex items-center space-x-1">
                                                <FaRegCalendar className="text-red-500" />
                                                <span className="font-medium text-sm text-red-500">Closing Date : </span>
                                            </div>
                                            <h1 className="text-sm font-medium text-red-500">{moment.utc(bidClosingDate).format("DD-MM-YYYY hh:mm A")}</h1>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="bg-[#00a7ac] w-[1px] mx-7">
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-3 py-4 lg:space-y-5 w-full xl:w-[30%]">
                            <div className="flex items-center w-full space-x-3">
                                <FaRegCalendar className="text-lg text-[#00a7ac]" />
                                <span className="text-sm">Opening Date : </span>
                                <h1 className="text-[#000000] text-sm font-medium">{moment.utc(tenderOpeningDate).format("DD-MM-YYYY hh:mm A")}</h1>
                            </div>
                            <div className="flex items-center w-full space-x-3">
                                <FiMapPin className="text-lg text-[#00a7ac]" />
                                <span className="text-sm">Location : </span>
                                <h1 className="text-[#000000] text-sm font-medium">{state}</h1>
                            </div>
                            <div className="flex items-center w-full space-x-3">
                                <GiMoneyStack className="text-xl text-[#00a7ac]" />
                                <span className="text-sm">Estimated : </span>
                                <h1 className="text-[#000000] text-sm font-medium">{tenderValue}</h1>
                            </div>
                            <div className="flex items-center w-full space-x-3">
                                <BsFillBriefcaseFill className="text-lg text-[#00a7ac]" />
                                <span className="text-sm">Department : </span>
                                <h1 className="text-[#000000] text-sm font-medium">{limitedText}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-full xl:w-[20%] flex xl:flex-col items-start justify-between xl:items-end xl:justify-center h-full space-y-2 xl:pr-5  ">
                        <div className="space-y-2">
                            <div className="flex justify-start xl:justify-end z-[9999]">

                                {
                                    token?.length > 2 ?
                                        (

                                            resultId ?
                                                (
                                                    <Link

                                                        className=""
                                                        href={`/result-details/${resultId}`} >
                                                        <button className='hover:before:bg-redborder-red-500 rounded-md relative h-[40px] w-40 overflow-hidden border border-[#00a7ac] bg-white px-3 text-[#00a7ac] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#00a7ac] before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full'>
                                                            <span className="relative z-10">View Result</span>
                                                        </button>
                                                    </Link>
                                                )
                                                :
                                                (
                                                    isApplied == true ?
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

                                        )
                                        :
                                        (
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

                            <div>
                                {
                                    resultId
                                        ?
                                        null
                                        :
                                        (new Date() >= new Date(tenderOpeningDate)) && (new Date() <= new Date(bidClosingDate))
                                            ?
                                            <h1 className="text-[13px] font-medium text-red-500 xl:text-end pr-3">
                                                {subtractDates(bidClosingDate)}
                                                {subtractDates(bidClosingDate) > 1 ? ` Days Left` : ' Day Left'}
                                            </h1>
                                            :
                                            new Date() < new Date(tenderOpeningDate)
                                                ?
                                                <h1 className="text-[13px] font-medium text-yellow-500 text-end pr-3">
                                                    Coming soon
                                                </h1>
                                                :
                                                new Date() > new Date(bidClosingDate)
                                                    ?
                                                    <h1 className="text-[13px] font-medium text-red-500 text-end pr-3">
                                                        Expired
                                                    </h1>
                                                    :
                                                    null

                                }
                            </div>
                        </div>

                        <div>
                            {/* <Link
                                className=""
                                href={{ pathname: '/tender-details', query: { data: Data } }}> */}
                                <div onClick={() => handlenavigate()}
                                className="flex items-center xl:justify-end xl:mr-5 group xl:pt-5 cursor-pointer text-sm space-x-2">
                                    <span
                                        className="underline group-hover:text-[#00a7ac] group-hover:scale-105 duration-300">View More</span>
                                    <MdArrowRightAlt
                                        className="text-2xl mt-1 group-hover:text-[#00a7ac] group-hover:translate-x-1 duration-300" />
                                </div>
                            {/* </Link> */}
                        </div>

                    </div>

                </div>

            </div>

            <InquiryTenderModel
                showModal={inquiry}
                handleShowModal={setInquiry}
                id={tender_id}
            />
        </>
    );
};

export default TenderCard;
