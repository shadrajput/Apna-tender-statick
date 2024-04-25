import { MdOutlineHealthAndSafety } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { MdFrontLoader } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa";
import { MdOutlineEngineering } from "react-icons/md";
import { FaLeaf } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiDish } from "react-icons/bi";


const CategoriesData = [
  {
    id: 1,
    icon: (
      <MdOutlineHealthAndSafety />
    ),
    title: "Pharma",
    btnLink: "/#",
    img : "images/category/category-1.png"
  },
  {
    id: 2,
    icon: (
      <FaTruck />
    ),
    title: "Transport",
    btnLink: "/#",
    img : "images/category/category-2.png"
  },
  {
    id: 3,
    icon: (
      <PiBooks />
    ),
    title: "Education",
    btnLink: "/#",
    img : "images/category/category-3.jpg"
  },
  {
    id: 4,
    icon: (
      <FaHandHoldingMedical />
    ),
    title: "Health",
    btnLink: "/#",
    img : "images/category/category-4.jpg"
  },
  {
    id: 5,
    icon: (
      <MdOutlineEngineering />
    ),
    title: "Engineering",
    btnLink: "/#",
    img : "images/category/category-5.jpg"
  },
  {
    id: 6,
    icon: (
      <FaLeaf />
    ),
    title: "Agree culture",
    btnLink: "/#",
    img : "images/category/category-6.jpg"
  },
  {
    id: 7,
    icon: (
      <MdFrontLoader />
    ),
    title: "Construction",
    btnLink: "/#",
    img : "images/category/category-7.jpg"
  },
  {
    id: 8,
    icon: (
      <HiOutlineSpeakerphone />
    ),
    title: "Advertising marketing",
    btnLink: "/#",
    img : "images/category/category-8.jpg"
  },
  {
    id: 9,
    icon: (
      <BiDish />
    ),
    title: "Hospitality",
    btnLink: "/#",
    img : "images/category/category-9.jpg"
  },
];
export default CategoriesData;
