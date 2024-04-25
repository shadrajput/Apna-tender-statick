import React, { useState, useEffect } from 'react'
import { FiMapPin } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { useAddInterestMutation } from "@/services/tender"
import { useGetResultDetailsQuery } from "@/services/result"
import { useAddBookmarkMutation } from '@/services/bookmark'
import { useRouter } from 'next/router';
import { GoBookmark } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa6";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import InquiryTenderModel from "../InquiryTenderModel";
import { toast } from "react-toastify";

const ResultDetails = () => {
  const router = useRouter();
  const id = router.query.resultId

  const [resultdetails, setResultDetails] = useState({});
  const [inquiry, setInquiry] = useState(false);

  const { data, isLoading, isError } = useGetResultDetailsQuery({ id });
  const [addInterest, { ...addingInterest }] = useAddInterestMutation()
  const [addBookMark, { ...addingbookmark }] = useAddBookmarkMutation()
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      setResultDetails(data.data.tender)
    }
  }, [isLoading, isError, data])
  let tender_id = id
  console.log(resultdetails)
  const isopening = resultdetails.opening_date;
  const isclosing = resultdetails.closing_date;
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


  return (
    <section id="" className="py-5 pb-20 px-14 bg-[#00a6ac11]">

      <div className='p-7 px-10 rounded-md shadow-xl bg-white'>
        <div>
          <div className="flex flex-col bg-white justify-between cursor-pointer">

            <div className="flex items-center justify-between w-full">
              <p className="text-[#00a7ac] font-medium">#ATI : {resultdetails.apna_tender_id}</p>
              {/* <div className="flex items-center">
                <div
                  onClick={() => {
                    token?.length > 2 ? BookMarkTender(tender_id) : RequestTender()
                  }}

                  className="bg-[#00a7ac] text-white duration-300 rounded-full w-8 h-8 flex justify-center items-center">
                  <GoBookmark className='text-lg' />
                </div>
              </div> */}
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="w-[80%] flex">
                <div className="w-[70%]" >
                  <h3 className="font-semibold text-xl text-[#000000] hover:text-[#00a7ac] duration-300 mb-4">
                    {resultdetails.title}
                  </h3>
                  <p className="text-sm text-gray-600 ">{resultdetails.description}</p>
                  <div className="flex items-center space-x-3 mt-4 bg-red-100 p-2 w-[35%] justify-center rounded-md">
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
                    <h1 className="text-[#000000] text-sm font-medium">{resultdetails.location}</h1>
                  </div>
                  <div className="flex items-center w-full space-x-3">
                    <GiMoneyStack className="text-xl text-[#00a7ac]" />
                    <span className="text-sm">Estimated : </span>
                    <h1 className="text-[#000000] text-sm font-medium">{resultdetails.estimated_value}</h1>
                  </div>
                  <div className="flex items-center w-full space-x-3">
                    <BsFillBriefcaseFill className="text-lg text-[#00a7ac]" />
                    <span className="text-sm">Department : </span>
                    <h1 className="text-[#000000] text-sm font-medium">{resultdetails.department}</h1>
                  </div>
                </div>
              </div>

              {/* <div className="w-[20%] items-end justify-between h-full space-y-2 pr-5 mt-10 ">
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      token?.length > 2 ? AppliedTender(tender_id) : RequestTender()
                    }}
                    disabled={addingInterest.isLoading}
                    className={`${addingInterest.isLoading ? 'opacity-60' : ''} hover:before:bg-redborder-red-500 rounded-md relative h-[60px] w-52 overflow-hidden border border-[#00a7ac] bg-white px-3 text-[#00a7ac] transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#00a7ac] before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full`}>
                    <span className="relative z-10">{addingInterest.isLoading ? 'Loading...' : 'Apply this tender'}</span>
                  </button>
                </div>
                <h1 className="text-[13px] font-medium text-red-500 text-end pr-3">( {subtractDates(resultdetails.opening_date, resultdetails.closing_date)}
                  Days left )</h1>
              </div> */}

              <div className="hidden justify-end items-end space-x-3 flex-col">
                <span className="text-sm bg-primary text-white px-2 rounded-md py-2">Req Sended</span>
                <span className="text-sm bg-blue-500 text-white px-2 rounded-md py-2">Req Accepted</span>
                <span className="text-sm bg-green-500 text-white px-2 rounded-md py-2">Form Submitted</span>
                <span className="text-sm bg-amber-500 text-white px-2 rounded-md py-2">Result Declared</span>
              </div>

            </div>

          </div>
        </div>
      </div>


      <InquiryTenderModel
        showModal={inquiry}
        handleShowModal={setInquiry}
        id={resultdetails.id}
      />

    </section>
  );
};

export default ResultDetails;
