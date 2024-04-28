import React, { useState, useEffect } from "react";
import { GoArrowRight } from "react-icons/go";
import TenderCard from "../TenderCard/TenderCard.jsx";
import { useGetLatestTenderQuery } from "@/services/tender";
import { MdSearchOff } from "react-icons/md";
import Link from "next/link";

const RecentTender = () => {
  const [allLatestTenders, setLatestTenders] = useState([]);

  const data = [];
  let isLoading = false;
  let isError = false;

  return (
    <section className=" recenttender py-10 px-2 lg:p-20 mt-10 bg-[#f8f8f8] overflow-hidden" >
    <div className=" flex flex-col px-5 sm:flex-row items-start justify-start sm:justify-between w-full space-y-2">
      <div className="space-y-3">
        <h2 className=" text-3xl lg:text-4xl font-bold font">Recent <span className="text-[#00a7ac]">Tender</span> List</h2>
        <p className='text-sm sm:w-2/3'>To choose your trending job dream & to make future bright.</p>
      </div>
      <div className="flex items-center justify-center">
        <Link href="/tenders" className="flex items-center space-x-2 group">
          <button className="text-primary hover:underline duration-300 text-sm lg:text-base hover:text-[#00a7ac] font-medium">View All Tenders</button>
          <GoArrowRight className="group-hover:translate-x-2  lg:text-lg duration-500 text-primary" />
        </Link>
      </div>
    </div>


    <div className="mt-10 overflow-y-scroll h-[600px] py-10 px-5 xl:px-7 bg-white rounded-md home-recent-tenders-container">
      {
        allLatestTenders.length > 0 ?
          allLatestTenders.map((Details, index) => (
            <TenderCard key={index} Data={Details} />
          ))
          :
          <div className="bg-red-200 px-10 flex justify-center items-center py-5 rounded-md w-full space-x-3">
            <h1 className="text-red-500 font-semibold">Tenders Not Found</h1>
            <MdSearchOff className="text-2xl text-red-500" />
          </div>
      }
    </div>
  </section>
  );
};

export default RecentTender;
