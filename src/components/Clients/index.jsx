import Slider from "react-slick";


const Clients = () => {

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: ""
  };

  return (
    <section className="pt-20">
      <h1 className="text-center text-slate-400">Collaborating with 3200+internationally renowned companies.</h1>
      <div className="relative">
        <div className="blur-lg absolute top-0 bg-white left-0 z-50  h-full w-40"></div>
        <div className="py-10 overflow-hidden mx-20 ">
          <Slider {...settings}>
            <div>
              <img src="/images/brands/New folder/1.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/2.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/3.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/4.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/5.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/6.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/7.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/8.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/9.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/10.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/11.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/12.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/13.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/14.png" alt="" className="w-[160px]" />
            </div>
            <div>
              <img src="/images/brands/New folder/15.png" alt="" className="w-[160px]" />
            </div>
          </Slider>
        </div>
        <div className="blur-lg absolute top-0 bg-white right-0 z-50 r h-full w-40"></div>
      </div>
    </section>
  );
};

export default Clients;
