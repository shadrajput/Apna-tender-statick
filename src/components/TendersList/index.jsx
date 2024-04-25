import React, { useState, useEffect } from 'react'
import { FiSearch } from "react-icons/fi";
import { CiFolderOn } from "react-icons/ci";
import { useGetAllTendersQuery, useGetTenderByKeywordQuery } from '@/services/tender'
import TenderCard from "../TenderCard/TenderCard.jsx";
import { MdSearchOff } from "react-icons/md";
import Button from '../Admin/Button.jsx'
import Buttons from '../Admin/Buttons.jsx'
import _ from 'lodash';
import { useRouter } from 'next/router';
import indianStatesObjects from '@/redux/slices/State.js';

const TenderList = () => {
  const router = useRouter();
  const [allTenders, setAllTenders] = React.useState([]);
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
  console.log(allTenders)
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

console.log(data)

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
        <div className="flex tenderlist flex-col  w-full bg-[#00a6ac5a] py-20 px-20">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-center">
              Find Tenders
            </h1>
            <p className="text-slate-900 text-center">Search your business opportunity through {allTenders.length} tenders</p>
          </div>

          <div className="flex border relative rounded-md items-center justify-between w-full bg-white shadow-lg mt-10 px-5 py-6 space-x-4">
            <div className="w-1/2 flex items-center space-x-3 border-r  ">
              <FiSearch
                className="text-[22px] text-[#00a7ac]" />
              <input onChange={handleUserSearch} onBlur={handleUserSearch}
                type="search" value={input} className="!ring-0 w-full border-none bg-transparent" placeholder="Tender Title , Keywords....." />
            </div>
            <div className="w-1/2 flex space-x-3 items-center rounded-md  px-3">
              <CiFolderOn className="text-2xl text-[#00a7ac]" />
              <select name="Category" value={filter} id="" onChange={handleSelectFilter} className="!ring-0 w-full font-light border-none bg-transparent">
                <option value="keyword">Keyword</option>
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

        <div className="bg-[#ddf2f22e] tenderlist py-20 px-20">
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

export default TenderList;
