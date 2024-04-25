import Image from "next/image";
const starIcon = (
  <svg width="23" height="23" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  let ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-[#fbb040]">
        {starIcon}
      </span>,
    );
  }

  return (
    <div className="mx-3">
      <div className="w-full shadow-testimonial rounded-xl p-10 border bg-white">

        <div className="flex flex-col items-start gap-4 ">
          <div className="h-[70px] w-[70px] overflow-hidden rounded-full">
            <img src={image} alt="" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-dark dark:text-white">
              {name}
            </h3>
            <p className="text-gray-500 text-xs">{designation}</p>
          </div>
        </div>


        <div
          className="mt-10 space-y-3">
          <div className="flex items-center gap-[2px] text-lg">
            {ratingIcons}
          </div>

          <p className="mb-6 text-base text-body-color dark:text-dark-6 leading-relaxed">
            {content}
          </p>


        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
