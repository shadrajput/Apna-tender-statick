import SectionTitle from "../Common/SectionTitle";
import SingleCategory from "./SingleCategory";
import CategoriesData from "./CategoriesData";
import Slider from "react-slick";


const Category = () => {

  var settings = {
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
          slidesToShow: 3,
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
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="sm:pt-5   xl:mx-20 xl:pt-20 pb-10">
      <div className="">
        <div className="flex items-center justify-center xl:justify-start w-full px-5">
          <div className="space-y-3">
            <h2 className="text-3xl xl:text-4xl font-bold font text-center xl:text-start">Popular <span className="text-[#00a7ac]">Category</span> List</h2>
            <p className="text-center text-sm lg:text-base">To choose your trending job dream & to make future bright.</p>
          </div>
        </div>

        <div className="mx-auto overflow-hidden lg:p-5">
          <div className="mt-5 xl:mt-10">
            <Slider {...settings}>
              {CategoriesData.map((feature, index) => (
                <SingleCategory key={index} feature={feature} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;


