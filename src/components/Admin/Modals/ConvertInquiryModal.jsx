import React from 'react'
import {Modal} from '../../Modal';
import FormField from '../Form/Field';
import FormCheckRadio from '../Form/CheckRadio';
import FormCheckRadioGroup from '../Form/CheckRadioGroup';
import { useFormik } from "formik"; 
import * as Yup from "yup";
import { toast } from 'react-toastify';
import {useConvertInquiryToUserMutation} from '../../../services/admin'

const signUpSchema = Yup.object({
  username: Yup.string().required("Please enter username") 
    .min(4, "Username must be at least 4 characters")
    .max(32, "Username must be at most 32 characters"),
  password: Yup.string().required("Please enter password")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirm_password: Yup.string().required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password not matched"),
});

const initialValues = {
  username: "",
  password: "",
  confirm_password: "",
};

function ConvertInquiryModal({showModal, handleShowModal, refetchInquiries, inquiryIdToConvert, setInquiryIdToConvert}) {

  const [convertInquiryToUser, {...convertingInquiry}] = useConvertInquiryToUserMutation();


  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      async onSubmit(data) {
        try{
          const res = await convertInquiryToUser({inquiry_id: inquiryIdToConvert, data})

          refetchInquiries();
          
          if (res.error) {
            toast.error(res.error.data.message);
          }
          else if (res.data.success) {
            handleModalClose();
            setInquiryIdToConvert(null)
            toast.success(res.data.message);
          }
        }
        catch(err){
          toast.error(err.message);
        }
      },
    });

  const handleModalClose = () => {
    handleShowModal(false);
    resetForm();
  };

  return (
    <Modal open={showModal} onClose={handleModalClose}>
      <Modal.Description className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg ">
         <Modal.Title
          as="h3"
          className="mb-4 text-xl font-medium text-gray-900 "
        > Add Details</Modal.Title>
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
          <div className="px-4 py-4">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormField
                label="Username*"
                labelFor="username"
                help={
                  touched.username && errors.username
                  ?
                    <span className="text-red-600">{errors.username}</span>
                  :
                    null
                }
              >
                <input type="text" name="username" placeholder="Username" id="username" 
                value={values.username}
                onBlur={handleBlur} 
                onChange={handleChange}
                />
                
              </FormField>
              <FormField
                label="Password*"
                labelFor="password"
                help={
                  touched.password && errors.password
                  ?
                    <span className="text-red-600">{errors.password}</span>
                  :
                    null
                }
              >
                <input type="password" name="password" placeholder="Password" id="password" 
                  value={values.password}
                  onBlur={handleBlur} 
                  onChange={handleChange}
                />
              </FormField>
              <FormField
                label="Confirm Password*"
                labelFor="confirmPassword"
                help={
                  touched.confirm_password && errors.confirm_password
                  ?
                    <span className="text-red-600">{errors.confirm_password}</span>
                  :
                    null
                }
              >
                <input type="password" name="confirm_password" placeholder="Confirm Password" id="confirmPassword"
                    value={values.confirm_password}
                  onBlur={handleBlur} 
                  onChange={handleChange}
                
                />
              </FormField>
              <div className="mt-5 text-right">
                <button
                  type="submit"
                  disabled={convertingInquiry.isLoading}
                  className={`${convertingInquiry.isLoading ? 'opacity-60' : ''} w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  {convertingInquiry.isLoading ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </Modal.Description>
      </Modal.Description>
    </Modal>
  )
}

export default ConvertInquiryModal