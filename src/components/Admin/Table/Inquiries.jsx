import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import _ from 'lodash';
import { useCancelInquiryMutation } from '@/services/admin';
import {toast} from 'react-toastify';
import ConvertInquiryModal from '../Modals/ConvertInquiryModal';
import Swal from 'sweetalert2'

const InquiriesTable = ({data, refetchInquiries, itemsPerPage, setPageNo, pageCount}) => {

  const [allInquiries, setAllInquiries] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [showModal, setShowModal] = useState(false);
  const [inquiryIdToConvert, setInquiryIdToConvert] = useState(null)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const [cancelInquiry, {...cancellingInquiry}] = useCancelInquiryMutation();

  const handleMakeUserBtnClick = (inquiry_id) =>{
    setShowModal(true);
    setInquiryIdToConvert(inquiry_id)
  }

  const handleCancelInquiryBtnClick = (inquiry_id) =>{
    Swal.fire({
      title: "Are you sure to cancel?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await cancelInquiry(inquiry_id)
        try{
          if(!cancellingInquiry.isError && res.data){
            toast.success(res.data.message)
          }
          else if(cancellingInquiry.isError){
            toast.error(res.error.data.message)
          }
        }
        catch(err){
          toast.error(err.message)
        }
      }
    });
  }

  useEffect(() =>{
    setAllInquiries(data)
  },[data])
  
  useEffect(() =>{
    setPageNo(currentPage+1)
  },[currentPage])  

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Company</th>
            <th>Tender Id</th>
            <th>Tender Title</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {allInquiries.map((item, index) => (
            <tr key={index}>
              <td className="border-b-0 lg:w-6 before:hidden">
                {(currentPage * itemsPerPage) + (index+1)}
              </td>
              <td data-label="Name" className=''>{item.name}</td>
              <td data-label="Email" className=''>{item.email}</td>
              <td data-label="Mobile" className=''>{item.mobile}</td>
              <td data-label="Company" className=''>{item.company_name}</td>
              <td data-label="Tender Id" className=''>{item.tender && item.tender != {} ? item.tender.apna_tender_id : '--'}</td>
              <td data-label="Tender Title" className=''>{item.tender && item.tender != {} ? item.tender.title : '--'}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <div className="flex gap-2">
                  <Button
                    className='bg-red-600 text-white'
                    label="Cancel"
                    disabled={cancellingInquiry.isLoading}
                    onClick={()=>handleCancelInquiryBtnClick(item.id)}
                    small
                  />

                  <Button
                    className='bg-emerald-600 text-white'
                    label="Approve"
                    onClick={() => handleMakeUserBtnClick(item.id)}
                    small
                  />
                </div>
                  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {_.times(pageCount).map((page, index) => (

              <Button
                key={index}
                active={index === currentPage}
                label={index + 1}
                className={index === currentPage ? 'bg-slate-700 text-white' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {pageCount}
          </small>
        </div>
      </div>
      <ConvertInquiryModal showModal={showModal} handleShowModal={setShowModal} refetchInquiries={refetchInquiries} inquiryIdToConvert={inquiryIdToConvert} setInquiryIdToConvert={setInquiryIdToConvert}/>
    </>
  )
}

export default InquiriesTable
