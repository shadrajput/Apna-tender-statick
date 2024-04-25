import { useEffect, useState } from "react";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { useGetAllNotificationQuery, useReadNotificationMutation } from '@/services/notification'
import { MdSearchOff } from "react-icons/md";
import { toast } from "react-toastify";

const AllNotifications = () => {

    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [is_read, setIsRead] = useState(0)
    const [allnotification, setAllNotification] = useState([]);
    const [readNotification, { ...readingNotification }] = useReadNotificationMutation()
    const { data, isLoading, isError } = useGetAllNotificationQuery({
        pageNo: pageNo,
    });


    useEffect(() => {
        if (data) {
            setAllNotification(data.allnotification)
        }
    }, [isLoading, isError, data])

    // Remove BookMark Tender Function4
    const handleIsRead = async (id) => {
        const res = await readNotification({ id })
        if (res.error) {
            toast.error(res.error.data.message);
        }
        else if (res.data.success) {
            toast.success(res.data.message);
        }
    }

    function daysSinceDate(date) {
        // Convert the input date string to a Date object
        const inputDate = new Date(date);

        // Get today's date
        const today = new Date();

        // Calculate the difference in milliseconds
        const diffInMs = Math.abs(today - inputDate);

        // Convert milliseconds to days
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays;
    }

    function countUnreadNotifications(notifications) {
        let unreadCount = 0;
        for (const notification of notifications) {
            if (notification.is_read === false) {
                unreadCount++;
            }
        }
        return unreadCount;
    }

    // Example usage:
    const createdDate = '2024-04-5'; // Assuming the date format is YYYY-MM-DD
    const daysSinceCreation = daysSinceDate(createdDate);

    return (
        <>
            <section
                id="allnotifications"
                className="">
                <div className="bg-white border-t-4 border-t-[#00a7ac] rounded-md w-full px-5 pt-5 pb-10 border border-[#00a7ac1f] ">

                    <div className="">
                        <div className="w-full flex justify-center items-center">
                            <h1 className="text-3xl font-bold text-center">All Notification Tenders</h1>
                        </div>
                    </div>

                    <div className="mt-14 space-y-5 px-5">
                        {
                            countUnreadNotifications(allnotification) == 0 ? (
                                <div className="bg-red-200 px-10 flex justify-center items-center py-3 rounded-md w-full space-x-3">
                                    <h1 className="text-red-500 font-semibold">Notification Not Found</h1>
                                    <MdSearchOff className="text-2xl text-red-500" />
                                </div>

                            ) : (
                                allnotification.map((Details, index) => {
                                    // Check if the notification is unread (is_read === false or 0)
                                    if (!Details.is_read) {
                                        // Render only if the notification is unread
                                        // Calculate days since creation
                                        const daysSinceCreation = daysSinceDate(Details.created_at); // You need to implement this function

                                        return (
                                            <div className="w-full flex items-center justify-between group py-3 border-b" key={index}>
                                                <div className="flex flex-col items-start">
                                                    <h1 className="font-medium text-[#000000]">
                                                        {index + 1} {Details.title}
                                                        <span className="ml-2 text-sm text-gray-500">
                                                            ( {daysSinceCreation} Days before )
                                                        </span>
                                                    </h1>
                                                    <span className="text-sm text-gray-800 ml-3">
                                                        {Details.message}
                                                    </span>
                                                </div>
                                                <div className="p-1">
                                                    <RxCross2
                                                        onClick={() => handleIsRead(Details.id)}
                                                        className="hover:bg-red-500 hover:text-white cursor-pointer duration-300 rounded-full w-4 h-4"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return null; // Skip rendering if the notification is read
                                    }
                                })
                            )
                        }

                    </div>

                </div>

            </section>
        </>
    );
};

export default AllNotifications;
