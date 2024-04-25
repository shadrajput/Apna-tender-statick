import React, { useState, useEffect } from 'react'
import { CgNotes } from "react-icons/cg";
import TenderCard from "../TenderCard/TenderCard.jsx";
import { useGetLatestTenderQuery } from '@/services/tender'
import { MdSearchOff } from "react-icons/md";

const Dashboard = () => {
    const [allLatestTenders, setLatestTenders] = useState([]);

    const { data, isLoading, isError } = useGetLatestTenderQuery({});

    React.useEffect(() => {
        if (data) {
            setLatestTenders(data.latestTenders)
        }
    }, [isLoading, isError, data])


    return (
        <>
            <section
                id="Dashboard"
                className="w-full">
                <div className="grid grid-cols-4 gap-10">
                    <div className="flex items-center space-x-2 border-b-[3px] rounded-md border-b-[#00a7ac] px-3 py-6 border border-border-[#00a7ac1f] bg-white">
                        <div className="w-14 h-14 rounded-full bg-[#00a7ac14] flex items-center justify-center">
                            <CgNotes className="text-[#00a7ac] text-3xl" />
                        </div>
                        <div>
                            <span className="text-[#595959] font-medium text-lg">Total Applied</span>
                            <h1 className="font-semibold text-2xl text-[#000000]">250+</h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 border-b-[3px] rounded-md border-b-[#045caf] px-3 py-6 border border-border-[#00a7ac1f] bg-white">
                        <div className="w-14 h-14 rounded-full bg-[#045daf14] flex items-center justify-center">
                            <CgNotes className="text-[#045caf] text-3xl" />
                        </div>
                        <div>
                            <span className="text-[#595959] font-medium text-lg">Total Applied</span>
                            <h1 className="font-semibold text-2xl text-[#000000]">250+</h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 border-b-[3px] rounded-md border-b-amber-500 px-3 py-6 border border-border-[#00a7ac1f] bg-white">
                        <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                            <CgNotes className="text-amber-500 text-3xl" />
                        </div>
                        <div>
                            <span className="text-[#595959] font-medium text-lg">Total Applied</span>
                            <h1 className="font-semibold text-2xl text-[#000000]">250+</h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 border-b-[3px] rounded-md border-b-[#00a7ac] px-3 py-6 border border-border-[#00a7ac1f] bg-white">
                        <div className="w-14 h-14 rounded-full bg-[#00a7ac14] flex items-center justify-center">
                            <CgNotes className="text-[#00a7ac] text-3xl" />
                        </div>
                        <div>
                            <span className="text-[#595959] font-medium text-lg">Total Applied</span>
                            <h1 className="font-semibold text-2xl text-[#000000]">250+</h1>
                        </div>
                    </div>

                </div>

                <div className="mt-14 bg-white rounded-md">
                    <span className="text-[20px] font-medium text-[#000000]">Recent Tenders : </span>

                    <div className="overflow-y-auto h-[500px] mt-7 px-3 user-profile-recent-tenders-container">
                        {/* <div className="pt-5 pb-5 px-7 flex flex-col bg-white justify-between mb-8 cursor-pointer border rounded-3xl 
            shadow-md shadow-[#00a6ac0f] hover:shadow-none hover:border-[#00a7ac] duration-300 relative overflow-hidden">

                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#00a7ac]">ATI : 15362864</p>
                                <div className="flex items-center">
                                    <div className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-8 h-8 flex justify-center items-center">
                                        <IoMdShare />
                                    </div>
                                    <div className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-8 h-8 flex justify-center items-center">
                                        <RxDownload />
                                    </div>
                                    <div className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center">
                                        <IoFolderOpenOutline />
                                    </div>
                                    <div className="hover:bg-[#00a7ac] hover:text-white duration-300 rounded-full w-7 h-7 flex justify-center items-center">
                                        <GoBookmark />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div className="w-[80%] flex">
                                    <div className="w-[70%]" >
                                        <h3 className="font-semibold text-xl text-[#000000] hover:text-[#00a7ac] hover:opacity-80 mb-4">
                                            Cunstruction Works
                                        </h3>
                                        <p className="text-sm text-gray-600 ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores exercitationem totam ad reprehenderit animi debitis itaque cumque et! Quo, nesciunt? Quas at maxime expedita distinctio deleniti vitae possimus explicabo odio!</p>
                                        <div className="flex items-center space-x-3 mt-4 bg-[#f3e8c1] p-2 w-2/3 justify-center rounded-md">
                                            <FaRegCalendar className="text-[#00a7ac]" />
                                            <span className="font-medium text-sm">Opening Date : </span>
                                            <h1 className="text-[#000000] text-sm font-medium">25/12/2024</h1>
                                        </div>
                                    </div>

                                    <div className="bg-[#00a7ac] w-[1px] mx-7">

                                    </div>

                                    <div className="flex flex-col items-center justify-center space-y-5 w-[30%]">
                                        <div className="flex items-center w-full space-x-3">
                                            <FiMapPin className="text-lg text-[#00a7ac]" />
                                            <span className="text-sm">Location : </span>
                                            <h1 className="text-[#000000] text-sm font-medium">Ahmedabad</h1>
                                        </div>

                                        <div className="flex items-center w-full space-x-3">
                                            <GiMoneyStack className="text-xl text-[#00a7ac]" />
                                            <span className="text-sm">Estimated : </span>
                                            <h1 className="text-[#000000] text-sm font-medium">20 Laks</h1>
                                        </div>
                                        <div className="flex items-center w-full space-x-3">
                                            <BsFillBriefcaseFill className="text-lg text-[#00a7ac]" />
                                            <span className="text-sm">Department : </span>
                                            <h1 className="text-[#000000] text-sm font-medium">Railway</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[20%] items-end space-y-2 hidden">
                                    <div className="flex justify-end">
                                        <button onClick={() => setApplied(true)}
                                            className="bg-[#00a7ac] text-white rounded-md py-3 px-8 text-sm">Apply Now</button>
                                    </div>
                                    <h1 className="text-xs text-red-500 text-end">7 Days Ago for Expire</h1>
                                </div>

                                <div className=" flex justify-end items-end space-x-3 flex-col">
                                    <span className="text-sm bg-primary text-white px-2 rounded-md py-2">Req Sended</span>
                                    <span className="text-sm bg-blue-500 text-white px-2 rounded-md py-2">Req Accepted</span>
                                    <span className="text-sm bg-green-500 text-white px-2 rounded-md py-2">Form Submitted</span>
                                    <span className="text-sm bg-amber-500 text-white px-2 rounded-md py-2">Result Declared</span>
                                </div>

                            </div>

                        </div> */}
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
                </div>
            </section>
        </>
    );
};

export default Dashboard;
