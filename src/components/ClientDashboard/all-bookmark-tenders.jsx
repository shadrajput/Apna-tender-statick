import React from "react";
import Link from "next/link";
import Card from "./card.jsx";
import { useGetAllMyBookmarkQuery } from '@/services/bookmark.js'
import { MdSearchOff } from "react-icons/md";

const AllBookMarks = () => {
    const [allBookmark, setAllBookmark] = React.useState([]);
    const [pageNo, setPageNo] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(0);
    const [search, setSearch] = React.useState("");
    const [filter, setFilter] = React.useState('all');
    const [bookMark, setBookMark] = React.useState("BookMarked")

    const { data, isLoading, isError } = useGetAllMyBookmarkQuery({
        pageNo: pageNo,
        search,
        filter
    });

    React.useEffect(() => {
        if (data) {
            setAllBookmark(data.allmybookmark)
            setPageCount(data.pageCount)
            setItemsPerPage(data.itemsPerPage)
        }
    }, [isLoading, isError, data])

    return (
        <>
            <section
                id="allbookmarks"
                className="">
                <div className="bg-white border-t-4 border-t-[#00a7ac] rounded-md w-full px-5 pt-5 pb-10 border border-[#00a7ac1f] ">

                    <div className="flex justify-between w-full items-center">
                        <div className="w-full">
                            <h1 className="text-[20px] font-bold text-[#000000]">All Book Marks Tenders</h1>
                        </div>
                    </div>

                        <div className="mt-10">
                            {
                                allBookmark.length > 0 ?
                                    allBookmark?.map((Details, index) => (
                                        <Card key={index} Data={Details} itemsPerPage={itemsPerPage} pagetype={bookMark} setPageNo={setPageNo} pageCount={pageCount} />
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

export default AllBookMarks;
