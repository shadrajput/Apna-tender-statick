import SectionTitle from "../Common/SectionTitle";
import SingleCategory from "./SingleCategory";
import CategoriesData from "./CategoriesData";
import Slider from "react-slick";


const Category = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: ""
  };

  return (
    <section className="mx-20 pt-20 pb-10">
      <div className="container">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold font">Popular <span className="text-[#00a7ac]">Category</span> List</h2>
            <p>To choose your trending job dream & to make future bright.</p>
          </div>
        </div>

        <div className="mx-auto">
          <div className="mt-20">
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


