import React, { useState, useEffect } from 'react'
import { FiSearch } from "react-icons/fi";
import { CiFolderOn } from "react-icons/ci";
import { useGetAllTendersQuery, useGetTenderByKeywordQuery } from '@/services/tender'
import TenderCard from "../TenderCard/TenderCard.jsx";
import { MdSearchOff } from "react-icons/md";
import _ from 'lodash';
import { useRouter } from 'next/router';
import indianStatesObjects from '@/redux/slices/State.js';

const TenderList = () => {
  const router = useRouter();
  const [allTenders, setAllTenders] = React.useState([
    {
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
    },
    {
      "apna_tender_id": "006",
      "category": "Valve",
      "closing_date": "2024-05-30T00:00:00.000Z",
      "created_at": "2024-04-20T08:55:55.000Z",
      "department": "Engineering",
      "description": "Supply and Installation of Safety Valves for a Petrochemical Plant - Quantity: 50 valves",
      "emd_amount": "50000",
      "estimated_value": 500000,
      "id": 6,
      "isApplied": false,
      "isBookmarked": true,
      "isNewRecord": false,
      "is_public": true,
      "location": "Gujarat",
      "opening_date": "2024-04-25T10:00:00.000Z",
      "period_of_work": "4 months",
      "scraped_from": "industry_portal",
      "searching_keywords": "Safety Valve",
      "state": "Gujarat",
      "tender_no": "SV2024-001",
      "tender_reference_no": "",
      "title": "Supply and Installation of Safety Valves",
      "type": "Limited",
      "uniqno": 6,
      "updated_at": "2024-04-20T08:55:55.000Z"
    },
    {
      "apna_tender_id": "007",
      "category": "Valve",
      "closing_date": "2024-06-05T00:00:00.000Z",
      "created_at": "2024-04-25T12:20:40.000Z",
      "department": "Oil and Gas",
      "description": "Maintenance Contract for Valves at Offshore Oil Rig - Duration: 1 year",
      "emd_amount": "100000",
      "estimated_value": 2000000,
      "id": 7,
      "isApplied": false,
      "isBookmarked": false,
      "isNewRecord": false,
      "is_public": true,
      "location": "Offshore",
      "opening_date": "2024-05-01T08:00:00.000Z",
      "period_of_work": "12 months",
      "scraped_from": "industry_portal",
      "searching_keywords": "Valve",
      "state": "International Waters",
      "tender_no": "V2024-001",
      "tender_reference_no": "",
      "title": "Maintenance Contract for Offshore Valves",
      "type": "Open",
      "uniqno": 7,
      "updated_at": "2024-04-25T12:20:40.000Z"
    },
    {
      "apna_tender_id": "008",
      "category": "Solar Panels",
      "closing_date": "2024-06-10T00:00:00.000Z",
      "created_at": "2024-04-30T11:05:15.000Z",
      "department": "Renewable Energy",
      "description": "Installation of Solar Panels for Government Hospital - Quantity: 200 panels",
      "emd_amount": "25000",
      "estimated_value": 1000000,
      "id": 8,
      "isApplied": false,
      "isBookmarked": false,
      "isNewRecord": false,
      "is_public": true,
      "location": "Chennai",
      "opening_date": "2024-05-05T09:00:00.000Z",
      "period_of_work": "3 months",
      "scraped_from": "government_portal",
      "searching_keywords": "Solar Panels",
      "state": "Tamil Nadu",
      "tender_no": "SP2024-002",
      "tender_reference_no": "",
      "title": "Installation of Solar Panels",
      "type": "Limited",
      "uniqno": 8,
      "updated_at": "2024-04-30T11:05:15.000Z"
    },
    {
      "apna_tender_id": "009",
      "category": "Construction",
      "closing_date": "2024-06-15T00:00:00.000Z",
      "created_at": "2024-05-05T13:40:25.000Z",
      "department": "Infrastructure",
      "description": "Renovation of Government Office Building - Including Electrical and Plumbing Work",
      "emd_amount": "50000",
      "estimated_value": 500000,
      "id": 9,
      "isApplied": false,
      "isBookmarked": true,
      "isNewRecord": false,
      "is_public": true,
      "location": "Pune",
      "opening_date": "2024-05-10T10:00:00.000Z",
      "period_of_work": "6 months",
      "scraped_from": "government_portal",
      "searching_keywords": "Construction",
      "state": "Maharashtra",
      "tender_no": "CR2024-001",
      "tender_reference_no": "",
      "title": "Renovation of Government Office Building",
      "type": "Open",
      "uniqno": 9,
      "updated_at": "2024-05-05T13:40:25.000Z"
    },
    {
      "apna_tender_id": "010",
      "category": "Electric Vehicles",
      "closing_date": "2024-06-20T00:00:00.000Z",
      "created_at": "2024-05-10T14:55:35.000Z",
      "department": "Transportation",
      "description": "Procurement of Electric Buses for City Public Transport - Quantity: 20 buses",
      "emd_amount": "200000",
      "estimated_value": 10000000,
      "id": 10,
      "isApplied": false,
      "isBookmarked": false,
      "isNewRecord": false,
      "is_public": true,
      "location": "Bangalore",
      "opening_date": "2024-05-15T08:00:00.000Z",
      "period_of_work": "8 months",
      "scraped_from": "government_portal",
      "searching_keywords": "Electric Vehicles",
      "state": "Karnataka",
      "tender_no": "EB2024-001",
      "tender_reference_no": "",
      "title": "Procurement of Electric Buses",
      "type": "Limited",
      "uniqno": 10,
      "updated_at": "2024-05-10T14:55:35.000Z"
    }
  ]);
  const [AllKeyWods, setAllKeywords] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [pageNo, setPageNo] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0)
  const [filter, setFilter] = React.useState(router.query.filter ? router.query.filter : 'keyword');
  const [finalsearch, setFinalSearch] = React.useState("");
  const [finalfilter, setFinalFilter] = React.useState("");
  const [input , setInput] = React.useState(router.query.search ? router.query.search : "")
 
  const Keywords = useGetTenderByKeywordQuery({
    search: search,
  });

  React.useEffect(() => {
    if (Keywords) {
      setAllKeywords(Keywords.data?.AllKeyWords)
    }
  }, [Keywords])


  const { data, isLoading, isError } = useGetAllTendersQuery({
    pageNo: pageNo,
    search: finalsearch,
    filter: finalfilter,
  });


  const handleUserSearch = (e) => {
    setInput(e.target.value)

    if(e.target.value == ""){
      setFinalSearch("")
    }

    if (filter === "keyword") {
      setSearch(() => e.target.value)
    }

    if (filter === "state") {
      const regex = new RegExp(e.target.value, 'i');

      // Filter the states array based on the regular expression
      const results = indianStatesObjects.filter(state => regex.test(state.title));
      setAllKeywords(results)
      console.log(AllKeyWods)
    }
  }

  React.useEffect(() => {
    if (router.query.search) {
      setFinalSearch(router.query.search)
      setFinalFilter(router.query.filter)
    }
  }, [])

  const handleSearchSubmit = (e) => {
    setFinalSearch(input)
    setFinalFilter(filter)
    setAllKeywords([])
  }

  const handleSelectFilter = (e) => {
    setFilter(e.target.value)
    setAllKeywords([])
  } 

  React.useEffect(() => {
    if (data) {
      setAllTenders(data.allTenders)
      setPageCount(data.pageCount)
      setItemsPerPage(data.itemsPerPage)
    }
  }, [isLoading, isError, data])


  useEffect(() => {
    setPageNo(currentPage + 1)
  }, [currentPage])


  return (
    <section className="">
      <div className="tenderlist w-full">
      <div className="flex tenderlist flex-col  w-full bg-[#00a6ac5a] py-10 xl:py-20 px-5 xl:px-20">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Find Tenders
            </h1>
            <p className="text-slate-900 text-center text-sm lg:text-base">Search your business opportunity through {allTenders.length} tenders</p>
          </div>

          <div className="flex flex-col md:flex-row border rounded-md items-center justify-between w-full bg-white shadow-lg mt-5 lg:mt-10 px-5 space-y-4 space-x-0 md:space-y-0 
           py-6 md:space-x-4">
            <div className="lg:w-1/2 w-full flex items-center space-x-3 border-r  ">
              <FiSearch
                className="text-[22px] text-[#00a7ac]" />
              <input onChange={handleUserSearch} onBlur={handleUserSearch}
                type="search" value={input} className="!ring-0 w-full border-none bg-transparent" placeholder="Tender Title , Keywords....." />
            </div>
            <div className="lg:w-1/2 w-full flex space-x-3 items-center rounded-md lg:px-3">
              <CiFolderOn className="text-2xl text-[#00a7ac]" />
              <select name="Category" value={filter} id="" onChange={handleSelectFilter} className="!ring-0 w-full font-light border-none bg-transparent">
                <option value="keyword">Keyword</option>
                <option value="tender_id">Tender ID</option>
                <option value="department">Department</option>
                <option value="state">State</option>
              </select>
            </div>
            <div className="flex items-end justify-end md:w-1/4 ">
              <button onClick={handleSearchSubmit}
                className="relative h-12 w-52 overflow-hidden border border-[#00a7ac] text-[#00a7ac] rounded-md transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#00a7ac] before:duration-500 before:ease-out hover:text-white hover:shadow-[#00a7ac] hover:before:h-40 hover:before:w-52 hover:before:opacity-80">
                <span className="relative z-10">Search</span>
              </button>
            </div>

            {
              AllKeyWods?.length && input.length > 0 ?
                <div className='absolute z-[9999] -bottom-[300px] bg-white px-5 rounded-md py-5 w-1/3 h-80 overflow-y-scroll shadow-lg'>
                  {
                    AllKeyWods.map((Details, index) => (
                      <div key={index} className='py-2'>
                        <h1 onClick={() => {
                          setInput(Details.title)
                          setAllKeywords([])
                        }}
                        className='border-b cursor-pointer hover:border-b-black duration-300' >{Details.title}</h1>
                      </div>
                    ))
                  }
                </div>
                :
                null
            }
          </div>
        </div>

        <div className="bg-[#ddf2f22e] tenderlist px-5 py-10 xl:py-20 xl:px-20">
          <div className="flex flex-wrap ">
            {
              allTenders.length > 0 ?
                allTenders.map((Details, index) => (
                  <TenderCard key={index} Data={Details} itemsPerPage={itemsPerPage} setPageNo={setPageNo} pageCount={pageCount} />
                ))

                :
                <div className="bg-red-200 px-10 flex justify-center items-center py-5 rounded-md w-full space-x-3">
                  <h1 className="text-red-500 font-semibold">Tenders Not Found</h1>
                  <MdSearchOff className="text-2xl text-red-500" />
                </div>
            }
          </div>

        </div>
      </div>
    </section>
  );
};

export default TenderList;
