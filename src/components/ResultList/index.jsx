import React, { useState, useEffect } from 'react'
import { FiSearch } from "react-icons/fi";
import { CiFolderOn } from "react-icons/ci";
import { useGetallresultsQuery } from '@/services/tender'
import { useGetAllResultsQuery } from '@/services/result'
import TenderCard from "../TenderCard/TenderCard.jsx";
import { MdSearchOff } from "react-icons/md";
import Button from '../Admin/Button.jsx'
import Buttons from '../Admin/Buttons.jsx'
import _ from 'lodash';
import { useRouter } from 'next/router';

const ResultList = () => {
  const router = useRouter();
  const [allresults, setAllResults] = React.useState([]);
  const [search, setSearch] = React.useState(router.query.search ? router.query.search : "");
  const [pageNo, setPageNo] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0)
  const [filter, setFilter] = React.useState(router.query.filter ? router.query.filter : 'keyword');
  const [finalsearch, setFinalSearch] = React.useState("");
  const [finalfilter, setFinalFilter] = React.useState("");

  const { data, isLoading, isError } = useGetAllResultsQuery({
    pageNo: pageNo,
    search: finalsearch,
    filter: finalfilter
  });

  const handleUserSearch = (e) => {
    setSearch(() => e.target.value)
  }

  React.useEffect(() => {
    if (router.query.search) {
      setFinalSearch(router.query.search)
      setFinalFilter(router.query.filter)
    }
  }, [])

  const handleSearchSubmit = (e) => {
    setFinalSearch(search)
    setFinalFilter(filter)
  }

  const handleSelectFilter = (e) => {
    setFilter(e.target.value)
  }

  React.useEffect(() => {
    if (data) {
      setAllResults(data.allResults)
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

        <div className="flex tenderlist  flex-col items-center w-full space-y-7 bg-[#00a6ac5a] py-20 px-20">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-center">
              Find Tenders Results
            </h1>
            <p className="text-slate-900 text-center">Search your business opportunity through {allresults?.length} tenders</p>
          </div>

          <div className="flex border rounded-md items-center  justify-between w-full bg-white shadow-lg my-10 px-5 py-6 space-x-4">
            <div className="w-1/2 flex items-center space-x-3 border-r  rounded-md ">
              <FiSearch
                className="text-[22px] text-[#00a7ac]" />
              <input onChange={handleUserSearch} onBlur={handleUserSearch}
                type="search" value={search} className="focus:outline-none w-full border-none bg-transparent" placeholder="Tender Title , Keywords....." />
            </div>
            <div className="w-1/2 flex space-x-3 items-center rounded-md  px-3">
              <CiFolderOn className="text-2xl text-[#00a7ac]" />
              <select name="Category" value={filter} id="" onChange={handleSelectFilter} className="focus:outline-none w-full font-light border-none bg-transparent">
                <option value="keyword">Keyword</option>
                <option value="all">All</option>
                <option value="tender_id">Tender ID</option>
                <option value="department">Department</option>
                <option value="state">State</option>
              </select>
            </div>
            <div className="flex items-end justify-end w-1/4 ">
              <button onClick={handleSearchSubmit}
                className="relative h-12 w-52 overflow-hidden border border-[#00a7ac] text-[#00a7ac] rounded-md transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#00a7ac] before:duration-500 before:ease-out hover:text-white hover:shadow-[#00a7ac] hover:before:h-40 hover:before:w-52 hover:before:opacity-80">
                <span className="relative z-10">Search</span>
              </button>

            </div>
          </div>

        </div>

        <div className="bg-[#ddf2f22e] tenderlist py-20 px-20">
          <div className="flex w-full justify-end items-center">
            <select name="" id="" className="focus:outline-none text-sm text-gray-600 cursor-pointer bg-[#f0f5f7] flex items-center justify-center w-40 h-12 px-5 rounded-md">
              <option value="">Sort by (Default)</option>
              <option value="Newest">Bid Start Date : Latest First</option>
              <option value="Oldest">Bid Start Date : Oldest First</option>
              <option value="Oldest">Bid End Date   : Latest First</option>
              <option value="Oldest">Bid End Date   : Oldest First</option>
            </select>
          </div>
          <div className="mt-12 lg:mt-8">
            {
              allresults?.length > 0 ?
                allresults.map((Details, index) => (
                  <TenderCard key={index} Data={Details.tender} resultId ={Details.id}  itemsPerPage={itemsPerPage} setPageNo={setPageNo} pageCount={pageCount} />
                ))

                :
                <div className="bg-red-200 px-10 flex justify-center items-center py-5 rounded-md w-full space-x-3">
                  <h1 className="text-red-500 font-semibold">Tenders Not Found</h1>
                  <MdSearchOff className="text-2xl text-red-500" />
                </div>
            }
          </div>

          <div className="bg-transparent mt-5">
            <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
              <Buttons>
                {_.times(pageCount).map((page, index) => (

                  <Button
                    key={index}
                    active={index === currentPage}
                    label={index + 1}
                    className={index === currentPage ? 'bg-[#00a7ac] text-white' : 'whiteDark'}
                    small
                    onClick={() => setCurrentPage(index)}
                  />
                ))}
              </Buttons>
              <small className="mt-6 md:mt-0">
                Page {currentPage + 1} of {pageCount}
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultList;
