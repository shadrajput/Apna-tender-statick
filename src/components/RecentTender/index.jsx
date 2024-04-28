import React, { useState, useEffect } from "react";
import { GoArrowRight } from "react-icons/go";
import TenderCard from "../TenderCard/TenderCard.jsx";
import { useGetLatestTenderQuery } from "@/services/tender";
import { MdSearchOff } from "react-icons/md";
import Link from "next/link";

const RecentTender = () => {
  const [allLatestTenders, setLatestTenders] = useState([    {
    "apna_tender_id": "001",
    "category": "Valve",
    "closing_date": "2024-04-30T00:00:00.000Z",
    "created_at": "2024-03-28T10:58:15.000Z",
    "department": "Valve",
    "description": "Handling, Transport Other Mining Services - Percentage Quote Based - Handling Transport Service, Ob Removal, Coal Extraction, Ob Removal Coal Extraction and Evacuation of Coal at Niljay Ocm of Wani Area Qty 1",
    "emd_amount": "",
    "estimated_value": 2000000,
    "id": 1,
    "isApplied": true,
    "isBookmarked": true,
    "isNewRecord": false,
    "is_public": false,
    "location": "Ahmedabad",
    "opening_date": "2024-04-02T14:40:07.000Z",
    "period_of_work": "",
    "scraped_from": "cppp",
    "searching_keywords": "Air Safety Valve",
    "state": "Delhi",
    "tender_no": "111",
    "tender_reference_no": "",
    "title": "Air Safety Valve",
    "type": "Single",
    "uniqno": 1,
    "updated_at": "2024-03-28T10:58:15.000Z"
  },
  {
    "apna_tender_id": "002",
    "category": "Solar Panels",
    "closing_date": "2024-05-10T00:00:00.000Z",
    "created_at": "2024-04-01T09:12:30.000Z",
    "department": "Renewable Energy",
    "description": "Supply and Installation of Solar Panels for a Government Building - Quantity: 500 panels",
    "emd_amount": "50000",
    "estimated_value": 1500000,
    "id": 2,
    "isApplied": false,
    "isBookmarked": false,
    "isNewRecord": false,
    "is_public": true,
    "location": "Mumbai",
    "opening_date": "2024-04-05T09:30:00.000Z",
    "period_of_work": "3 months",
    "scraped_from": "government_portal",
    "searching_keywords": "Solar Panels",
    "state": "Maharashtra",
    "tender_no": "002",
    "tender_reference_no": "SP2024-001",
    "title": "Supply and Installation of Solar Panels",
    "type": "Open",
    "uniqno": 2,
    "updated_at": "2024-04-01T09:12:30.000Z"
  },
  {
    "apna_tender_id": "003",
    "category": "Electric Vehicles",
    "closing_date": "2024-05-15T00:00:00.000Z",
    "created_at": "2024-04-05T14:22:45.000Z",
    "department": "Transportation",
    "description": "Procurement of Electric Vehicles for Government Use - Quantity: 100 vehicles",
    "emd_amount": "100000",
    "estimated_value": 5000000,
    "id": 3,
    "isApplied": false,
    "isBookmarked": true,
    "isNewRecord": false,
    "is_public": true,
    "location": "New Delhi",
    "opening_date": "2024-04-10T10:00:00.000Z",
    "period_of_work": "6 months",
    "scraped_from": "government_portal",
    "searching_keywords": "Electric Vehicles",
    "state": "Delhi",
    "tender_no": "EV2024-001",
    "tender_reference_no": "",
    "title": "Procurement of Electric Vehicles",
    "type": "Limited",
    "uniqno": 3,
    "updated_at": "2024-04-05T14:22:45.000Z"
  },
  {
    "apna_tender_id": "004",
    "category": "Construction",
    "closing_date": "2024-05-20T00:00:00.000Z",
    "created_at": "2024-04-10T11:45:20.000Z",
    "department": "Infrastructure",
    "description": "Construction of a Bridge over River XYZ in ABC District - Length: 200 meters",
    "emd_amount": "200000",
    "estimated_value": 10000000,
    "id": 4,
    "isApplied": false,
    "isBookmarked": false,
    "isNewRecord": false,
    "is_public": true,
    "location": "ABC District",
    "opening_date": "2024-04-15T08:00:00.000Z",
    "period_of_work": "12 months",
    "scraped_from": "government_portal",
    "searching_keywords": "Construction",
    "state": "XYZ",
    "tender_no": "C2024-001",
    "tender_reference_no": "",
    "title": "Construction of Bridge over River XYZ",
    "type": "Open",
    "uniqno": 4,
    "updated_at": "2024-04-10T11:45:20.000Z"
  },
  {
    "apna_tender_id": "005",
    "category": "Food Oil",
    "closing_date": "2024-05-25T00:00:00.000Z",
    "created_at": "2024-04-15T15:30:10.000Z",
    "department": "Food and Agriculture",
    "description": "Supply of Edible Oil for Government School Midday Meal Program - Quantity: 5000 liters",
    "emd_amount": "10000",
    "estimated_value": 250000,
    "id": 5,
    "isApplied": false,
    "isBookmarked": false,
    "isNewRecord": false,
    "is_public": true,
    "location": "Various Locations",
    "opening_date": "2024-04-20T09:00:00.000Z",
    "period_of_work": "2 months",
    "scraped_from": "government_portal",
    "searching_keywords": "Food Oil",
    "state": "Various States",
    "tender_no": "FO2024-001",
    "tender_reference_no": "",
    "title": "Supply of Edible Oil",
    "type": "Limited",
    "uniqno": 5,
    "updated_at": "2024-04-15T15:30:10.000Z"
  },]);
  const [is_recent , setRecent] = useState(true)

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
            <TenderCard key={index} Data={Details} isRecent={is_recent}  />
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
