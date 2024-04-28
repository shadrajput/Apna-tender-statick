import React, { useState } from "react";
import { Modal } from "../Modal";
import { toast } from "react-toastify";
import { FormSchema, initialValues } from "./FormSchema";
import { useFormik } from "formik";
import { useAddInquiryMutation } from '../../services/tender'


function InquiryTenderModel({ showModal, handleShowModal, id }) {

    const [addInquiry, { ...addingInquiry }] = useAddInquiryMutation();

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
                    console.log(Data)

                    const res = await addInquiry({ Data })

                    if (res.error) {
                        toast.error(res.error.data.message);
                    }
                    else if (res.data.success) {
                        handleModalClose();
                        toast.success(res.data.message);
                    }
                }
                catch (err) {
                    toast.error(err.message);
                }
            },
        });

    const handleModalClose = () => {
        handleShowModal(false);
    };

    if (!showModal) {
        return <></>;
    }

    return (
        <Modal open={showModal}
            onClose={handleModalClose}
            size="3xl"
        >
            <Modal.Description className="inline-block w-full bg-white p-8 my-8 text-left align-middle transition-all transform shadow-xl rounded-lg ">
                <Modal.Title
                    as="h3"
                    className="mb-10 text-2xl font-semibold text-center">
                    {
                        "Get a Free Consultation"
                    }
                </Modal.Title>
                <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="match-formation-modal"
                    onClick={handleModalClose}
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>

                <Modal.Description>
                    <div className="px-4 mt-5 ">
                        <form action="" onSubmit={handleSubmit}>
                        <div className=" space-y-5 lg:space-y-7">
                                <div className="flex flex-col space-x-0 space-y-5 items-center lg:space-x-5">
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
                                </div>
                                <div className="flex flex-col space-x-0 space-y-5 items-center lg:space-x-5">
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
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.company_name}
                                            name="company_name"
                                            className="px-5 rounded-md focus:outline-none bg-primary/5 border-none h-12" id="" placeholder="Company Name" />
                                        <span className="text-xs font-semibold text-red-600 px-1">
                                            {errors.company_name && touched.company_name
                                                ? errors.company_name
                                                : null}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-0 space-y-5 items-center lg:space-x-5">
                                    <div className="flex flex-col w-full space-y-3">
                                        <label htmlFor="Message">Message</label>
                                        <input type="textarea"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.message}
                                            name="message"
                                            className="px-5 rounded-md focus:outline-none bg-primary/5 border-none h-12" id="" placeholder="Message" />
                                    </div>
                                </div>
                            </div>

                            {/* Business Details */}
                            <div className="flex justify-center space-x-3 mt-5 ">
                                <button
                                    disabled={addingInquiry.isLoading}
                                    className={`${addingInquiry.isLoading ? 'opacity-60' : ''} relative h-12 mt-6 w-full overflow-hidden border border-[#00a7ac] text-[#00a7ac] rounded-md transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#00a7ac] before:duration-500 before:ease-out hover:text-white hover:shadow-[#00a7ac] hover:before:h-40 hover:before:w-full hover:before:opacity-80`}>
                                    <span className="relative z-10">{addingInquiry.isLoading ? 'Loading...' : 'Submit'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Description>
            </Modal.Description>
        </Modal>
    );
}

export default InquiryTenderModel;