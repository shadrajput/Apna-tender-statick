import { React, useState, useEffect } from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import Dashboard from '../../components/ClientDashboard/dashboard'
import MyProfile from '@/components/ClientDashboard/my-profile'
import AllBookMarks from '@/components/ClientDashboard/all-bookmark-tenders'
import AllNotifications from '@/components/ClientDashboard/all-notifications'
import AllAppliedTenders from '@/components/ClientDashboard/all-applied-tenders'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/actions/User';
import ProtectUserRoutes from '@/utils/protectedUserRoutes';

const ClientDashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { value } = router.query
    const [currentTab, setCurrentTab] = useState(0);
    const tabs = [
        { key: 'dashboard', component: <Dashboard /> },
        { key: 'myProfile', component: <MyProfile /> },
        { key: 'allBookmarks', component: <AllBookMarks /> },
        { key: 'allAppliedTenders', component: <AllAppliedTenders /> },
        { key: 'allNotifications', component: <AllNotifications /> }
    ];

    const handleLogout = ()=>{
        dispatch(logout());
        router.push('/auth/signin')
    }

    useEffect(()=>{
        setCurrentTab(value)
    },[])

    return (
        <>
            <div className='flex px-20 py-10 space-x-10'>
                <div className='w-[20%]'>
                    <div className="border w-full h-full rounded-md border-[#00a6ac3f] bg-white">
                        <div 
                            onClick={() => setCurrentTab(0)}
                            className={` ${currentTab == 0 ? "bg-[#00a7ac] text-white hover:bg-[#00a7ac]" : ""} flex group items-center space-x-3 hover:bg-[#00a6ac23] duration-300 rounded-md w-full px-7 py-4 cursor-pointer `}>
                            <LuLayoutDashboard className={`${currentTab == 0 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[#595959] text-xl`} />
                            <h1 className={` ${currentTab == 0 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[16px] font-semibold text-[#595959]`}>Dashboard</h1>
                        </div>
                        <div
                            onClick={() => setCurrentTab(1)} 
                            className={` ${currentTab == 1 ? "bg-[#00a7ac] text-white hover:bg-[#00a7ac]" : ""} flex group items-center space-x-3 hover:bg-[#00a6ac23] duration-300 rounded-md w-full px-7 py-4 cursor-pointer `}>
                            <FaRegUser className={`${currentTab == 1 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[#595959] text-xl`} />
                            <h1 className={` ${currentTab == 1 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[16px] font-semibold text-[#595959]`}>My Account</h1>
                        </div>
                        <div 
                            onClick={() => setCurrentTab(2)}
                            className={` ${currentTab == 2 ? "bg-[#00a7ac] text-white hover:bg-[#00a7ac]" : ""} flex group items-center space-x-3 hover:bg-[#00a6ac23] duration-300 rounded-md w-full px-7 py-4 cursor-pointer `}>
                            <IoBookmarkOutline className={`${currentTab == 2 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[#595959] text-xl`} />
                            <h1 className={` ${currentTab == 2 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[16px] font-semibold text-[#595959]`}>All Bookmarks</h1>
                        </div>
                        <div 
                            onClick={() => setCurrentTab(3)}
                            className={` ${currentTab == 3 ? "bg-[#00a7ac] text-white hover:bg-[#00a7ac]" : ""} flex group items-center space-x-3 hover:bg-[#00a6ac23] duration-300 rounded-md w-full px-7 py-4 cursor-pointer `}>
                            <CgNotes className={`${currentTab == 3 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[#595959] text-xl`} />
                            <h1 className={` ${currentTab == 3 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[16px] font-semibold text-[#595959]`}>My Tenders</h1>
                        </div>
                        <div 
                            onClick={() => setCurrentTab(4)}
                            className={` ${currentTab == 4 ? "bg-[#00a7ac] text-white hover:bg-[#00a7ac]" : ""} flex group items-center space-x-3 hover:bg-[#00a6ac23] duration-300 rounded-md w-full px-7 py-4 cursor-pointer `}>
                            <IoMdNotificationsOutline className={`${currentTab == 4 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[#595959] text-2xl`} />
                            <h1 className={` ${currentTab == 4 ? "text-white hover:text-white" : "group-hover:text-[#000000]"} text-[16px] font-semibold text-[#595959]`}>All Notification</h1>
                        </div>
                        <div 
                            onClick={handleLogout}
                            className="flex group items-center space-x-3 hover:bg-[#00a6ac23] duration-300 rounded-md w-full px-7 py-4 cursor-pointer">
                            <TbLogout2 className="text-[#595959] group-hover:text-[#000000] text-xl" />
                            <h1 className="group-hover:text-[#000000] text-[16px] font-semibold text-[#595959]">Logout</h1>
                        </div>
                    </div>
                </div>
                <div className='w-[80%]'>
                    {tabs[currentTab].component}
                </div>
            </div>
        </>
    )
}

export default ProtectUserRoutes(ClientDashboard)
