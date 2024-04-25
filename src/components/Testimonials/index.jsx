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
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: "linear"
  };

  return (
    <section className="py-20 px-20 tenderlist">
      <div className="container px-4 flex items-start ">

        <div className="w-1/2 space-y-3">
          <h2 className="text-[40px] leading-tight font-bold font">What <span className="text-[#00a7ac]">Business owners</span> <br /> talking about us</h2>
          <img src="images/testimonials/googlereview.jpg" alt="" className="w-[30%]" />
        </div>

        <div className="w-1/2 space-y-10">
          <p>It has been proven by our users that our platform is very helpful for those who have trouble managing tasks.
            It has been proven by our users that our platform is very helpful for those who have trouble managing tasks.</p>
          <div className="flex items-center space-x-5">
            <img  src="images/testimonials/instagram-logo-1494D6FE63-seeklogo.com.png" alt="" className="w-8 cursor-pointer hover:scale-105 duration-300" />
            <img  src="images/testimonials/facebook.jpg" alt="" className="w-8 cursor-pointer hover:scale-105 duration-300" />
            <img  src="images/testimonials/circle-linkedin-512.webp" alt="" className="w-8 cursor-pointer hover:scale-105 duration-300" />
          </div>
        </div>



      </div>
      <div className="mt-20">
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
