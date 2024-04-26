import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "../../redux/actions/User";
import { useSelector, useDispatch } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import menuData from "./menuData";
import { FaUser } from "react-icons/fa6";
import { MdBookmarks } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import InquiryTenderModel from "../InquiryTenderModel";
import { useGetAllNotificationQuery, useReadNotificationMutation } from '@/services/notification'
import { MdSearchOff, MdEmail } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import { useRouter } from 'next/router';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { token, user } = useSelector((state) => state.user);
  const [Dropdown, setDropdown] = useState(false);
  const [notification, setnotification] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const pathUrl = usePathname();
  const [pageNo, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
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


  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const handleIsRead = async (id) => {
    const res = await readNotification({ id })
    if (res.error) {
      toast.error(res.error.data.message);
    }
    else if (res.data.success) {
      toast.success(res.data.message);
    }
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

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/signin')
  }

  // Call the function to get the unread number
  const unreadNumber = countUnreadNotifications(allnotification);

  const date = allnotification.created_at
  function daysSinceDate() {
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

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [menu, setmenu] = useState(false);

  return (
    <>

      <div className="h-10 bg-[#00a7ac] flex justify-between items-center w-full px-3 lg:px-20 py-6 ">
        <div className="md:space-x-5 flex justify-between w-full">
          <span className="flex items-center gap-1 text-sm font-medium text-white"><MdEmail className="text-base" /> care@apnatender.com</span>
          <span className="flex items-center gap-1 text-sm font-medium text-white"><IoCallSharp className="text-base" /> +91 97237 47443</span>
        </div>
      </div>


      <header
        className={` z-40  top-0 flex w-full items-center lg:px-10 relative ${sticky
          ? "shadow-nav sticky top z-[9999] border-b border-stroke bg-white/80 backdrop-blur-[5px] transition dark:border-dark-3/20 dark:bg-dark/10"
          : "bg-transparent"
          }`}>
        <div className="relative w-full flex items-center justify-between">

          <div className="w-36 sm:w-40 max-w-full">
            <Link
              href="/"
              className={`navbar-logo block w-full ${sticky ? "py-3 pl-3" : "py-4 pl-3"
                } `}
            >
              {pathUrl !== "/" ? (
                <>
                  <Image
                    src={`/images/logo/Tplogo.png`}
                    alt="logo"
                    width={140}
                    height={30}
                    className="header-logo w-full dark:hidden"
                  />
                  <Image
                    src={`/images/logo/Tplogo.png`}
                    alt="logo"
                    width={140}
                    height={30}
                    className="header-logo hidden w-full dark:block"
                  />
                </>
              ) : (
                <>
                  <Image
                    src={`${sticky
                      ? "/images/logo/Tplogo.png"
                      : "/images/logo/Tplogo.png"
                      }`}
                    alt="logo"
                    width={140}
                    height={30}
                    className="header-logo w-full dark:hidden"
                  />
                  <Image
                    src={"/images/logo/Tplogo.png"}
                    alt="logo"
                    width={140}
                    height={30}
                    className="header-logo hidden w-full dark:block"
                  />
                </>
              )}
            </Link>
          </div>

          <div className="">
            <button
              onClick={navbarToggleHandler}
              className="absolute right-4 top-1/2 block  -translate-y-1/2 rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
            >
              <span
                className={`relative my-1.5 block h-0.5 w-[25px] transition-all duration-300 ${navbarOpen ? " top-[7px] rotate-45" : " "
                  } ${pathUrl !== "/" && "bg-[#000000]"} ${pathUrl === "/" && sticky
                    ? "bg-[#000000]"
                    : "bg-[#000000]"
                  }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[25px] transition-all duration-300 ${navbarOpen ? "opacity-0 " : " "
                  } ${pathUrl !== "/" && "bg-[#000000]"} ${pathUrl === "/" && sticky
                    ? "bg-[#000000]"
                    : "bg-[#000000]"
                  }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[25px] transition-all duration-300 ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                  } ${pathUrl !== "/" && "bg-[#000000]"} ${pathUrl === "/" && sticky
                    ? "bg-[#000000]"
                    : "bg-[#000000]"
                  }`}
              />
            </button>
            <nav
              id="navbarCollapse"
              className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark-2 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:dark:bg-transparent ${navbarOpen
                ? "visibility top-full opacity-100"
                : "invisible top-[120%] opacity-0"
                }`}
            >
              <ul className="block lg:ml-8 lg:flex lg:gap-x-8 xl:ml-14 xl:gap-x-12">
                {menuData.map((menuItem, index) =>
                  menuItem.path ? (
                    <li key={index} className="group relative">
                      <Link
                        scroll={false}
                        href={menuItem.path}
                        className={`ud-menu-scroll flex py-2 text-base font-medium hover:text-[#00a7ac] lg:inline-flex lg:px-0 lg:py-0 ${pathUrl === menuItem?.path && "text-[#00a7ac] border-b-[3px] border-[#00a7ac]  font-semibold"
                          }`}
                      >
                        {menuItem.title}
                      </Link>
                    </li>
                  ) : (
                    <li
                      className="submenu-item group relative"
                      key={index}
                    >
                      {pathUrl !== "/" ? (
                        <button
                          onClick={() => handleSubmenu(index)}
                          className={`ud-menu-scroll flex items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:group-hover:text-primary lg:inline-flex lg:px-0 lg:py-6`}
                        >
                          {menuItem.title}

                          <span className="pl-1">
                            <svg
                              className={`duration-300 lg:group-hover:rotate-180`}
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.00039 11.9C7.85039 11.9 7.72539 11.85 7.60039 11.75L1.85039 6.10005C1.62539 5.87505 1.62539 5.52505 1.85039 5.30005C2.07539 5.07505 2.42539 5.07505 2.65039 5.30005L8.00039 10.525L13.3504 5.25005C13.5754 5.02505 13.9254 5.02505 14.1504 5.25005C14.3754 5.47505 14.3754 5.82505 14.1504 6.05005L8.40039 11.7C8.27539 11.825 8.15039 11.9 8.00039 11.9Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSubmenu(index)}
                          className={`ud-menu-scroll flex items-center justify-between py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${sticky
                            ? "text-dark group-hover:text-primary dark:group-hover:text-primary"
                            : "text-white"
                            }`}
                        >
                          {menuItem.title}

                          <span className="pl-1">
                            <svg
                              className={`duration-300 lg:group-hover:rotate-180`}
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.00039 11.9C7.85039 11.9 7.72539 11.85 7.60039 11.75L1.85039 6.10005C1.62539 5.87505 1.62539 5.52505 1.85039 5.30005C2.07539 5.07505 2.42539 5.07505 2.65039 5.30005L8.00039 10.525L13.3504 5.25005C13.5754 5.02505 13.9254 5.02505 14.1504 5.25005C14.3754 5.47505 14.3754 5.82505 14.1504 6.05005L8.40039 11.7C8.27539 11.825 8.15039 11.9 8.00039 11.9Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </button>
                      )}

                      <div
                        className={`submenu relative left-0 top-full w-[250px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark-2 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? "!-left-[25px]" : "hidden"
                          }`}
                      >
                        {menuItem.submenu.map((submenuItem, index) => (
                          <Link
                            href={submenuItem.path}
                            key={index}
                            className={`block rounded px-4 py-[10px] text-sm ${pathUrl === submenuItem.path
                              ? "text-primary"
                              : "text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"
                              }`}
                          >
                            {submenuItem.title}
                          </Link>
                        ))}
                      </div>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>

          <div className="hidden items-center justify-end pr-1 sm:flex lg:pr-0">
            {token ? (
              <>
                <div>
                  <div onClick={() => setnotification((prev) => !prev)}
                    className="ml-7 relative rounded-full w-9 h-9 flex items-center justify-center bg-[#eff1f0] cursor-pointer border hover:opacity-70">
                    <MdOutlineNotificationsActive
                      className="text-[22px] cursor-pointer text-[#00a7ac] duration-300" />
                    <div className="bg-[#00a7ac] rounded-full absolute top-0 -right-[5px] w-[15px] h-[15px] text-[10px]  text-white cursor-pointer flex text-center justify-center items-center">
                      {unreadNumber}
                    </div>
                  </div>

                  <div className={`${notification === false ? "hidden" : "block"} bg-white transition-all duration-300 ease-in-out shadow-lg shadow-black/35 absolute flex-col items-center w-1/4 justify-start right-20 py-7 px-4 z-50 rounded-md`}>

                    {
                      countUnreadNotifications(allnotification) == 0 ? (
                        <div className="flex justify-center items-center rounded-md w-full space-x-3">
                          <h1 className="text-red-500 text-xs font-semibold">Notification Not Found</h1>
                          <MdSearchOff className="text-lg text-red-500" />
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

                    {
                      countUnreadNotifications(allnotification) == 0 ?
                        ""
                        :
                        <Link href='/profile?value=4' className="">
                          <div className="flex justify-center items-center py-3">
                            <span className="text-sm text-gray-500 cursor-pointer hover:text-primary">View All</span>
                          </div>
                        </Link>
                    }

                  </div>
                </div>
                <div className="">
                  <div className="ml-7 flex items-center cursor-pointer group ">
                    <div onClick={() => setDropdown((prev) => !prev)} className=" flex justify-center items-center space-x-3  cursor-pointer hover:opacity-70 ">
                      <span>{user && user.username}</span>
                      <span className="w-10 h-10 rounded-full bg-[#00a7ac] flex justify-center items-center">
                        <FaUser className="text-xl text-white " />
                      </span>
                    </div>
                  </div>

                  <div className={`${Dropdown === false ? "hidden" : "block"} bg-white  transition-all duration-300 ease-in-out shadow-lg shadow-black/35 absolute  flex-col items-center justify-start right-0  py-3 px-3 z-50 rounded-md`}>
                    <Link href='/profile?value=1' className="">
                      <div className="flex group items-center space-x-5 hover:bg-[#00a6ac23] w-48 px-4 py-3 rounded-md cursor-pointer ">
                        <FaUserTie className="text-[#00a7ac] text-[19px]" />
                        <h1 className="group-hover:text-[#00a7ac] text-[14.5px] text-[#000000]">My Account</h1>
                      </div>
                    </Link>
                    <Link href='/profile?value=2' className="">
                      <div className="flex group items-center space-x-5 hover:bg-[#00a6ac23] w-48 px-4 py-3 rounded-md cursor-pointer ">
                        <MdBookmarks className="text-[#00a7ac] text-[19px]" />
                        <h1 className="group-hover:text-[#00a7ac] text-[14.5px] text-[#000000]">All Bookmarks</h1>
                      </div>
                    </Link>
                    <Link href='/profile?value=3' className="">
                      <div className="flex group items-center space-x-5 hover:bg-[#00a6ac23] w-48 px-4 py-3 rounded-md cursor-pointer ">
                        <GiNotebook className="text-[#00a7ac] text-[19px]" />
                        <h1 className="group-hover:text-[#00a7ac] text-[14.5px] text-[#000000]">My Tenders</h1>
                      </div>
                    </Link>
                    <Link href='/profile?value=4' className="">
                      <div className="flex group items-center space-x-5 hover:bg-[#00a6ac23] w-48 px-4 py-3 rounded-md cursor-pointer ">
                        <IoMdNotifications className="text-[#00a7ac] text-[19px]" />
                        <h1 className="group-hover:text-[#00a7ac] text-[14.5px] text-[#000000]">All Notification</h1>
                      </div>
                    </Link>
                    <div onClick={handleLogout}
                      className="flex group items-center space-x-5 hover:bg-[#00a6ac23] w-48 px-4 py-3 rounded-md cursor-pointer ">
                      <TbLogout2 className="text-[#00a7ac] text-[19px]" />
                      <h1 className="group-hover:text-[#00a7ac] text-[14.5px] text-[#000000]">Logout</h1>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <button onClick={() => setInquiry(true)}
                  className="rounded-md px-6 hidden lg:block text-white font-semibold border-[#00a7ac] py-[10px] bg-[#00a7ac] border-2 hover:bg-transparent hover:border-[#00a7ac] hover:text-[#00a7ac] duration-500">
                  Get a Free Consultation
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      <InquiryTenderModel
        showModal={inquiry}
        handleShowModal={setInquiry}
      // PhoneDetails={PhoneDetails}
      // is_Edit={is_Edit}

      />
    </>
  );
};

export default Header;
