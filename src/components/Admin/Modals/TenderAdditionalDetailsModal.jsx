import React, { useEffect } from 'react'
import {Modal} from '../../Modal';
import FormField from '../Form/Field';
import Select from 'react-select'

function TenderAdditionalDetailsModal({showModal, handleShowModal, viewSelectedTender, setViewSelectedTender}) {

  const [tenderDetails, setTenderDetails] = React.useState({})

   const handleModalClose = () => {
    handleShowModal(false);
    setViewSelectedTender({})
  };

  React.useEffect(() => {
    setTenderDetails(viewSelectedTender)
  },[viewSelectedTender])

  return (
    <Modal open={showModal} onClose={handleModalClose} size="4xl">
      <Modal.Description className="inline-block w-full  p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg ">
         <Modal.Title
          as="h3"
          className="mb-4 text-xl font-medium text-gray-900 "
        >Tender Additional Details</Modal.Title>
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
            <form>
              <div className="w-full flex gap-6">
                <FormField
                  label="Department"
                  labelFor="department"
                >
                  <textarea name="department" id="" disabled defaultValue={tenderDetails.department}/> 
                </FormField>
                <FormField
                  label="Category"
                  labelFor="category"
                >
                  <input type="text" name="category" placeholder="Category" disabled id="category" 
                  defaultValue={tenderDetails.category}
                  />
                </FormField>
              </div>
              <div className="w-full flex gap-6 mb-6 last:mb-0">
                <FormField
                  label="Description"
                  labelFor="description"
                >
                  <textarea name="description" id=""  disabled defaultValue={tenderDetails.description}/> 
                </FormField>
              </div>
              <div className="w-full flex gap-6">
                <FormField
                  label="State"
                  labelFor="state"
                >
                  <input type="text" name="state" placeholder="State" disabled id="state" 
                  defaultValue={tenderDetails.state}
                  />
                </FormField>
                <FormField
                  label="Location"
                  labelFor="location"
                >
                  <textarea  name="location"  disabled id="location" 
                  defaultValue={tenderDetails.location}
                  />
                </FormField>
              </div>
              <div className="w-full flex gap-6">
                <FormField
                  label="Period of work"
                  labelFor="period_of_work"
                >
                  <input type="text" name="period_of_work" placeholder="Period of work" disabled id="period_of_work" 
                  defaultValue={tenderDetails.period_of_work}
                  />
                </FormField>
                <FormField
                  label="Validity"
                  labelFor="validity"
                >
                  <input type="text" name="validity" placeholder="Validity" disabled id="validity" 
                  defaultValue={tenderDetails.validity}
                  />
                </FormField>
              </div>
              <div className="w-full flex gap-6">
                <FormField
                  label="Type"
                  labelFor="type"
                >
                  <input type="text" name="type" placeholder="Type" disabled id="type" 
                  defaultValue={tenderDetails.type}
                  />
                </FormField>
                <FormField
                  label="EMD Amount"
                  labelFor="emd_amount"
                >
                  <input type="text" name="emd_amount" placeholder="Emd Amount" disabled id="emd_amount" 
                  defaultValue={tenderDetails.emd_amount}
                  />
                </FormField>
              </div>
              <div className="w-full flex gap-6">
                <FormField
                  label="Searching Keywords"
                  labelFor="searching_keywords"
                >
                  <Select
                    isMulti
                    name="searching_keywords"
                    isDisabled={true}
                    defaultValue={
                      tenderDetails.searching_keywords?.split(', ').map((item)=>{
                         return {label: item, value: item}
                      })
                    }
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        background: 'transparent', 
                        borderColor: 'transparent',
                      }),
                    }}
                    components={{ MultiValueRemove: () => {
                        return <span>&nbsp;</span>; // Return anything to replace the 'x' button
                      } 
                    }}
                  />
                </FormField>
              </div>
            </form>
          </div>
        </Modal.Description>
      </Modal.Description>
    </Modal>
  )
}

export default TenderAdditionalDetailsModal