import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { useFormik } from "formik";
import { FormSchema, initialValues } from "../InquiryTenderModel/FormSchema";
import { toast } from "react-toastify";
import { useAddInquiryMutation } from '../../services/tender';

const Contact = () => {

  const [addInquiry, { ...addingInquiry }] = useAddInquiryMutation();

  let id = 1

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: FormSchema,
      async onSubmit(data) {
        try {

          const Data = {
            ...data,
            tender_id: id,
          };

          const res = await addInquiry({ Data })

          if (res.error) {
            toast.error(res.error.data.message);
          }
          else if (res.data.success) {
            toast.success(res.data.message);
          }
        }
        catch (err) {
          toast.error(err.message);
        }
      },
    });

  return (
    <section id="contact" className="relative py-10 lg:py-20 md:pt-[80px] md:pb-0 lg:px-20">
      <div className="absolute left-0 top-0 -z-[1] h-full w-full dark:bg-dark"></div>
      <div className="absolute left-0 top-0 -z-[1] h-1/2 w-full bg-[#E9F9FF] dark:bg-dark-700 lg:h-[45%] xl:h-1/2"></div>
      <div className="container px-4 ">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 sm:px-10 lg:w-7/12 xl:w-8/12">
            <div className="ud-contact-content-wrapper">
              <div className="ud-contact-title mb-12 lg:mb-[150px]">
                <h2 className="max-w-[260px] text-5xl lg:text-[75px] font-bold leading-[1.14] text-dark dark:text-white">
                  Have a Question?
                </h2>
                <span className="my-6 block text-base font-medium text-dark dark:text-white">
                  Do you have questions, comments?
                </span>
                <span className="mb-6 block text-base font-medium text-dark dark:text-white">
                  Do not hesitate to contact us and we will answer you quickly.
                </span>
              </div>
              <div className="mb-12 flex flex-col space-y-10 justify-start lg:mb-0 md:space-x-10 lg:space-x-0">
                <div className="">
                  <div className="mb-8 flex w-[300px] max-w-full">
                    <div className="mr-6 text-[32px] text-[#156C83]">
                      <FiPhoneCall className="text-[#00a7ac]" />
                    </div>
                    <div>
                      <h3 className="mb-[18px] text-lg font-semibold text-dark dark:text-white">
                        Call
                      </h3>
                      <p className="text-base text-body-color dark:text-dark-6">
                        +91 9723747443
                      </p>
                    </div>
                  </div>
                  <div className="mb-8 flex w-[300px] max-w-full">
                    <div className="mr-6 text-[32px] text-[#156C83]">
                      <MdMailOutline className="text-[#00a7ac]" />
                    </div>
                    <div>
                      <h3 className="mb-[18px] text-lg font-semibold text-dark dark:text-white">
                        How Can We Help?
                      </h3>
                      <p className="text-base text-body-color dark:text-dark-6">
                        care@apnatender.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-8 flex w-[450px] max-w-full">
                  <div className="mr-6 text-[32px] text-[#156C83]">
                    <FiMapPin className="text-[#00a7ac]" />
                  </div>
                  <div>
                    <h3 className="mb-[18px] text-lg font-semibold text-dark dark:text-white">
                      Our Location
                    </h3>
                    <p className="text-base text-body-color dark:text-dark-6">
                      B-133 and 135, 1st Floor, Safal Sumel 8 Business Park, Nr Ajit Mill Cross Rd, Opp City Point Hotel, Rakhiyal, Ahmedabad, Gujarat 380023.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div
              className="wow fadeInUp rounded-lg bg-white px-0 py-10 shadow-testimonial dark:bg-dark-2 dark:shadow-none sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]"
              data-wow-delay=".2s
              "
            >
              <h3 className="mb-8 text-2xl font-semibold text-[#00a7ac] md:text-[28px] md:leading-[1.42]">
                Send us a Message
              </h3>

              <form action="" onSubmit={handleSubmit}>
                <div className="space-y-7">
                  <div className="flex flex-col w-full space-y-3">
                    <label htmlFor="Mobile Number">Name*</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      name="name"
                      type="text" className="px-5 rounded-md focus:outline-none bg-primary/5 border-none h-12" id="" placeholder="Name" />
                    <span className="text-xs font-semibold text-red-600 px-1">
                      {errors.name && touched.name
                        ? errors.name
                        : null}
                    </span>
                  </div>
                  <div className="flex flex-col w-full space-y-3">
                    <label htmlFor="Mobile Number">Mobile Number*</label>
                    <input type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                      name="mobile"
                      className="px-5 rounded-md focus:outline-none bg-primary/5 border-none h-12" id="" placeholder="Mobile Number" />
                    <span className="text-xs font-semibold text-red-600 px-1">
                      {errors.mobile && touched.mobile
                        ? errors.mobile
                        : null}
                    </span>
                  </div>
                  <div className="flex flex-col w-full space-y-3">
                    <label htmlFor="Mobile Number">Email*</label>
                    <input type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      name="email"
                      className="px-5 rounded-md focus:outline-none peer-invalid:visible bg-primary/5 border-none h-12" id="" placeholder="Email" />
                    <span className="text-xs font-semibold text-red-600 px-1">
                      {errors.email && touched.email
                        ? errors.email
                        : null}
                    </span>
                  </div>
                  <div className="flex flex-col w-full space-y-3">
                    <label htmlFor="Company Name">Company Name</label>
                    <input type="text"
                      name="company_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.company_name}
                      className="px-5 rounded-md focus:outline-none bg-primary/5 border-none h-12" id="" placeholder="Company Name" />
                    <span className="text-xs font-semibold text-red-600 px-1">
                      {errors.company_name && touched.company_name
                        ? errors.company_name
                        : null}
                    </span>
                  </div>
                </div>

                {/* Business Details */}
                <div className="flex justify-center space-x-3 ">
                  <button
                    disabled={addingInquiry.isLoading}
                    className={`${addingInquiry.isLoading ? 'opacity-60' : ''} relative h-12 mt-6 w-full overflow-hidden border border-[#00a7ac] text-[#00a7ac] rounded-md transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#00a7ac] before:duration-500 before:ease-out hover:text-white hover:shadow-[#00a7ac] hover:before:h-40 hover:before:w-full hover:before:opacity-80`}>
                    <span className="relative z-10">{addingInquiry.isLoading ? 'Loading...' : 'Submit'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
