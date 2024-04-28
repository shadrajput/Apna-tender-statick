import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import Slider from "react-slick";
import { RiInstagramLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";

const testimonialData = [
  {
    id: 1,
    name: "Sabo Masties",
    designation: "Founder @ Rolex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/Sales-Letter-Testimonial-1.webp",
    star: 5,
  },
  {
    id: 2,
    name: "Margin Gesmu",
    designation: "Founder @ UI Hunter",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/Sales-Letter-Testimonial-2.webp",
    star: 5,
  },
  {
    id: 1,
    name: "Sabo Masties",
    designation: "Founder @ Rolex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/Sales-Letter-Testimonial-1.webp",
    star: 5,
  },
  {
    id: 2,
    name: "Margin Gesmu",
    designation: "Founder @ UI Hunter",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/Sales-Letter-Testimonial-2.webp",
    star: 5,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="hero py-10 px-5 xl:py-20 xl:px-20 ">

      <div className="flex flex-col md:flex-row items-start px-5 ">

        <div className="w-full xl:w-1/2 space-y-3 flex flex-col items-center justify-center lg:items-start lg:justify-start">
          <h2 className="text-3xl w-full xl:text-[40px] leading-tight font-bold font text-center lg:text-left">What <span className="text-[#00a7ac]">Business owners</span> <br /> talking about us</h2>
          <img src="images/testimonials/googlereview.jpg" alt="" className="w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-[30%]" />
        </div>

        <div className="w-full hidden lg:block xl:w-1/2 space-y-5 xl:space-y-10 mt-3">
          <p className="text-sm">It has been proven by our users that our platform is very helpful for those who have trouble managing tasks.
            It has been proven by our users that our platform is very helpful for those who have trouble managing tasks.</p>
          <div className="flex items-center space-x-5">
            <img src="images/testimonials/instagram-logo-1494D6FE63-seeklogo.com.png" alt="" className="w-7 xl:w-8 cursor-pointer hover:scale-105 duration-300" />
            <img src="images/testimonials/facebook.jpg" alt="" className="w-7 xl:w-8 cursor-pointer hover:scale-105 duration-300" />
            <img src="images/testimonials/circle-linkedin-512.webp" alt="" className="w-7 xl:w-8 cursor-pointer hover:scale-105 duration-300" />
          </div>
        </div>

      </div>

      <div className="mt-10 xl:mt-20">
        <div className="">
          <Slider {...settings}>
            {testimonialData.map((testimonial, index) => (
              <SingleTestimonial key={index} testimonial={testimonial} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
