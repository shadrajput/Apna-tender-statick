import React, { useState, useEffect, useRef } from 'react'
import { FiMapPin } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useGetTenderDetailsQuery, useAddInterestMutation } from "@/services/tender"
import { useAddBookmarkMutation } from '@/services/bookmark'
import { useRouter } from 'next/router';
import { GoBookmark } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa6";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import InquiryTenderModel from "../InquiryTenderModel";
import moment from 'moment'
import ReactToPrint from "react-to-print";
import { SiGmail } from "react-icons/si";
import { toast } from "react-toastify";

const TenderDetails = () => {
  const router = useRouter();
  // console.log(router.query.data)
  const id = router.query.tenderId
  const [tenderdetails, setTenderDetails] = useState({});
  const [inquiry, setInquiry] = useState(false);
  const printRef = useRef();
  const [print, setPrint] = useState(false);

  const { data, isLoading, isError } = useGetTenderDetailsQuery({ id });
  const [addInterest, { ...addingInterest }] = useAddInterestMutation()
  const [addBookMark, { ...addingbookmark }] = useAddBookmarkMutation()
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    // Parse the data object from the query parameter
    const dataString = router.query.data;
    if (dataString) {
      const dataObject = JSON.parse(dataString);
      // Use the data object as needed
      setTenderDetails(dataObject)
    }
  }, [router.query]);

  useEffect(() => {
    if (data) {
      setTenderDetails(data.tenderWithDocuments)
    }
  }, [isLoading, isError, data])
  let tender_id = id

  const city = 'hjhjjh';
  // if (!city) {
  //   return null; // Handle case where city is undefined or empty
  // }
  const firstPart = city.slice(0, Math.ceil(city.length / 2) - 3);
  const lastPart = city.slice(Math.ceil(city.length / 2) + 2);

  const hiddenCity = `${firstPart}****${lastPart}`;

  function subtractDates(closing_date) {
    // Convert the date strings to Date objects
    const d1 = new Date();
    const d2 = new Date(closing_date);

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

  console.log(tenderdetails)




  return (
    <section ref={printRef} id="" className="py-5 lg:pb-20 px-5 xl:px-14 bg-[#00a6ac11]">
      <div className='p-5 lg:p-7 xl:px-10 rounded-md shadow-xl bg-white'>

        <div className="flex flex-col bg-white justify-between">

          <div className="flex items-center justify-between w-full">
            <p className="text-[#00a7ac] font-medium">#ATI : {tenderdetails.apna_tender_id}</p>
            <div className="flex items-center">
              <div
                onClick={() => {
                  token?.length > 2 ? BookMarkTender(tender_id) : RequestTender()
                }}

                className={`${tenderdetails.isBookmarked == true ? "bg-[#00a7ac] text-white" : "bg-transparent"} hover:bg-[#00a7ac] hover:text-white duration-300 cursor-pointer rounded-full w-7 h-7 flex justify-center items-center`}>
                <GoBookmark className='text-lg' />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between py-3">
            <div className="lg:w-[80%] flex flex-col lg:flex-row">
              <div className="lg:w-[70%]" >
                <h3 className="font-semibold text-2xl w-fit text-[#000000] hover:text-[#00a7ac] duration-300 mb-4">
                  {tenderdetails.productCategory}
                </h3>
                <p className="text-gray-600 text-sm md:text-base ">{tenderdetails.title}</p>
                <div className="flex items-center space-x-3 mt-4 bg-red-100 p-2 xl:w-[45%] justify-center rounded-md">
                  <div className='flex flex-col items-center sm:flex-row sm:space-x-3 lg:items-start'>
                    <FaRegCalendar className="text-red-500" />
                    <span className="font-medium text-sm text-red-500">Closing Date : </span>
                  </div>
                  <h1 className="text-sm font-medium text-red-500">{moment.utc(tenderdetails.bidClosingDate).format("DD-MM-YYYY hh:mm A")}</h1>
                </div>
              </div>

              <div className="bg-[#00a7ac] hidden lg:block w-[1px] mx-7">
              </div>

              <div className="flex flex-col items-center justify-center space-y-5 lg:w-[30%] py-5">
                <div className="flex items-center w-full space-x-3">
                  <FaRegCalendar className="text-xl text-[#00a7ac]" />
                  <span className="text-sm">Opening Date : </span>
                  <h1 className="text-[#000000] text-sm font-medium">{moment.utc(tenderdetails.tenderOpeningDate).format("DD-MM-YYYY hh:mm A")}</h1>
                </div>
                <div className="flex items-center w-full space-x-3">
                  <FiMapPin className="text-lg text-[#00a7ac]" />
                  <span className="text-sm">Location : </span>
                  <h1 className="text-[#000000] text-sm font-medium">{tenderdetails.address}</h1>
                </div>
                <div className="flex items-center w-full space-x-3">
                  <FaIndianRupeeSign className="text-xl text-[#00a7ac]" />
                  <span className="text-sm">Contract Value : </span>
                  <h1 className="text-[#000000] text-sm font-medium">{tenderdetails.tenderValue}</h1>
                </div>
                <div className="flex items-center w-full space-x-3">
                  <BsFillBriefcaseFill className="text-lg text-[#00a7ac]" />
                  <span className="text-sm">Department : </span>
                  <h1 className="text-[#000000] text-sm font-medium">{tenderdetails.organigationChain}</h1>
                </div>
              </div>
            </div>

            <div className="lg:w-[20%] flex lg:flex-col space-x-5 space-y-0 items-center justify-center lg:items-end lg:justify-between h-full lg:space-y-2 pr-5 lg:mt-10 ">
              <div className="flex justify-center lg:justify-end">
                {
                  tenderdetails.status === "pending" ?
                    <span className=" bg-green-500 text-white px-2 rounded-md h-10 xl:h-[60px] xl:w-52 flex items-center justify-center">Allready Applied</span>
                    :
                    <button
                      onClick={() => {
                        token?.length > 2 ? AppliedTender(tender_id) : RequestTender()
                      }}
                      disabled={addingInterest.isLoading}
                      class={`${addingInterest.isLoading ? 'opacity-60' : ''} hover:before:bg-redborder-red-500 rounded-md relative h-[60px] w-52 overflow-hidden border border-[#00a7ac] bg-white px-3 text-[#00a7ac] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#00a7ac] before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full`}>
                      <span class="relative z-10">{addingInterest.isLoading ? 'Loading...' : 'Apply this tender'}</span>
                    </button>
                }

              </div>
              {
                (new Date() >= new Date(tenderdetails.opening_date)) && (new Date() <= new Date(tenderdetails.closing_date))
                  ?
                  <h1 className=" font-medium text-red-500 text-[16px] lg:text-sm text-center lg:text-end">
                    {subtractDates(tenderdetails.closing_date)}
                    {subtractDates(tenderdetails.closing_date) > 1 ? ` Days Left` : ' Day Left'}
                  </h1>
                  :
                  new Date() < new Date(tenderdetails.opening_date)
                    ?
                    <h1 className=" font-medium text-yellow-500 text-end ">
                      Coming soon
                    </h1>
                    :
                    new Date() > new Date(tenderdetails.closing_date)
                      ?
                      <h1 className=" font-medium text-red-500 text-end ">
                        Expired
                      </h1>
                      :
                      null
              }
            </div>

            <div className="hidden justify-end items-end space-x-3 flex-col">
              <span className="text-sm bg-primary text-white px-2 rounded-md py-2">Req Sended</span>
              <span className="text-sm bg-blue-500 text-white px-2 rounded-md py-2">Req Accepted</span>
              <span className="text-sm bg-green-500 text-white px-2 rounded-md py-2">Form Submitted</span>
              <span className="text-sm bg-amber-500 text-white px-2 rounded-md py-2">Result Declared</span>
            </div>

          </div>

        </div>

        <div className="w-full flex items-start space-x-0 lg:justify-between lg:space-x-20 mt-5 xl:mt-10">
          <div className="w-full space-y-5 sm:space-y-8 lg:space-y-10 xl:space-y-16">
            <div className='grid grid-cols-3 gap-3 xl:gap-10 w-full'>
              <div className=''>
                {/* <a href={tenderdetails.dataValues.document_url} className="bg-red-500 w-full"> */}
                  <button
                    className="relative h-16 w-full overflow-hidden border border-[#00a7ac] bg-[#00a7ac] text-white rounded-md transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-white before:duration-500 before:ease-out hover:text-[#00a7ac] hover:shadow-[#00a7ac] hover:before:h-40 hover:before:w-full hover:before:opacity-100">
                    <span className="relative text-sm z-10 md:text-base">Download Document</span>
                  </button>
                {/* </a> */}
              </div>
              <div>
                <ReactToPrint
                  trigger={() => (
                    <button
                      className="relative h-16 w-full overflow-hidden border border-[#00a7ac] bg-[#00a7ac] text-white rounded-md transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-white before:duration-500 before:ease-out hover:text-[#00a7ac] hover:shadow-[#00a7ac] hover:before:h-40 hover:before:w-full hover:before:opacity-100">
                      <span className="relative z-10 text-sm md:text-base">Short Summary</span>
                    </button>
                  )}
                  content={() => printRef.current}
                  onBeforeGetContent={() => {
                    return new Promise((resolve) => {
                      setPrint(true);
                      resolve();
                    });
                  }}
                  onAfterPrint={() => setPrint(false)}
                />
              </div>
              <div className='flex items-center justify-center w-full'>
                <button
                  onClick={() =>
                    RequestTender()
                  }
                  className="relative h-16 w-full overflow-hidden border border-[#00a7ac] bg-[#00a7ac] text-white rounded-md transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-white before:duration-500 before:ease-out hover:text-[#00a7ac] hover:shadow-[#00a7ac] hover:before:h-40 hover:before:w-full hover:before:opacity-100">
                  <span className="relative z-10 text-sm md:text-base">Technical Support</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row space-x-0 space-y-5 items-center lg:justify-between lg:space-x-10">
              <div className="space-y-5 w-full">
                <h1 className="text-xl text-[#00a7ac] font-semibold">Key Dates</h1>
                <div className="flex items-center space-x-10 border-b w-full pb-2">
                  <h2 className="font-medium">Post Date : </h2>
                  <span className="text-[#3e3e3e]">{moment.utc(tenderdetails.opening_date).format("DD-MM-YYYY hh:mm A")}</span>
                </div>
                <div className="flex items-center space-x-10 border-b w-full pb-2">
                  <h2 className="font-medium">Closing Date : </h2>
                  <span className="text-[#3e3e3e]">{moment.utc(tenderdetails.closeDate).format("DD-MM-YYYY hh:mm A")}</span>
                </div>
              </div>

              <div className="space-y-5 w-full">
                <h1 className="text-xl text-[#00a7ac] font-semibold">Key Value</h1>
                <div className="flex items-center space-x-10 border-b w-full pb-2">
                  <h2 className="font-medium">EMD : </h2>
                  <span className="text-[#3e3e3e]">INR {tenderdetails.EDMdetails?.amount} /-</span>
                </div>
                <div className="flex items-center space-x-10 border-b w-full pb-2">
                  <h2 className="font-medium">Value : </h2>
                  <span className="text-[#3e3e3e]">{tenderdetails.tenderValue ? "INR" : ""} {tenderdetails.tenderValue}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row space-x-0 space-y-5 items-center lg:justify-between lg:space-x-10">
              <div className="space-y-5 w-full">
                <h1 className="text-xl text-[#00a7ac] font-semibold">Key Location</h1>
                <div className="flex items-center space-x-10 border-b w-full pb-2">
                  <h2 className="font-medium">State : </h2>
                  <span className="text-[#3e3e3e]">{tenderdetails.address}</span>
                </div>
                <div className="flex items-center space-x-10 border-b w-full pb-2">
                  <h2 className="font-medium">City : </h2>
                  <span className="text-[#3e3e3e]">{tenderdetails.address}</span>
                </div>
              </div>
              <div className="space-y-5 w-full">
                <h1 className="text-xl text-[#00a7ac] font-semibold">Industry</h1>
                <div className="flex items-center space-x-10 border-b w-full pb-2">
                  <h2 className="font-medium">Sector : </h2>
                  <span className="text-[#3e3e3e]">{tenderdetails.subCategory}</span>
                </div>
                <div className="flex items-center space-x-10 border-b w-full pb-2">
                  <h2 className="font-medium">Department : </h2>
                  <span className="text-[#3e3e3e]">{tenderdetails.organigationChain}</span>
                </div>
              </div>
            </div>

            <div className="flex  items-center justify-start space-x-5">
              <p>Share this tender </p>
              <a href="mailto:">
                <div className="bg-[#c71610] cursor-pointer hover:scale-105 duration-300 rounded-full px-[6px] py-[6px]">
                  <SiGmail className=" text-white" />
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>


      <InquiryTenderModel
        showModal={inquiry}
        handleShowModal={setInquiry}
        id={tenderdetails.id}
      />

    </section>
  );
};

export default TenderDetails;
