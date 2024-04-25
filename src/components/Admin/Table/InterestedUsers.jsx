import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import _ from 'lodash';
import { useChangeUserTenderReqStatusMutation } from '@/services/admin';
import {toast} from 'react-toastify';
import Swal from 'sweetalert2'

const InterestedUsersTable = ({data, refetchInterestedUsers, itemsPerPage, setPageNo, pageCount}) => {

  const [allUsers, setAllUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const [changeUserTenderReqStatus, {...changingUserTenderReqStatus}] = useChangeUserTenderReqStatusMutation();

  const handleActionButtonClick = async (btn_label, user_id, tender_id) => {
    Swal.fire({
      title: `Are you sure to change status to ${btn_label == 'cancel' ? "'CANCEL'" : "'APPLY'"}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await changeUserTenderReqStatus({status: btn_label == 'apply' ? 'applied' : 'cancelled', user_id, tender_id})
        try{
          if(!changingUserTenderReqStatus.isError && res.data){
            toast.success(res.data.message)
            refetchInterestedUsers()
          }
          else if(changingUserTenderReqStatus.isError){
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
    setAllUsers(data)
  },[data])
  
  useEffect(() =>{
    setPageNo(currentPage+1)
  },[currentPage])  

  return (
    <>
      <table className="text-sm">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Tender Id</th>
            <th>Tender Title</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item, index) => (
            <tr key={index}>
              <td className="border-b-0 lg:w-6 before:hidden">
                {(currentPage * itemsPerPage) + (index+1)}
              </td>
              <td data-label="Name" className=''>{item.user.user_detail.name}</td>
              <td data-label="Email" className=''>{item.user.email}</td>
              <td data-label="Mobile" className=''>{item.user.mobile}</td>
              <td data-label="Tender Id" className=''>{item.tender.apna_tender_id}</td>
              <td data-label="Tender Title" className=''>{item.tender.title}</td>
              <td data-label="Status" className={`whitespace-nowrap ${item.status == 'pending' ? 'text-gray-500' : item.status == 'applied' ? 'text-emerald-600' : 'text-red-600'}`}>
                {item.status == 'pending' ? 'Pending' : item.status == 'applied' ? 'Applied' : 'Cancelled'}
              </td>
              <td className={`before:hidden whitespace-nowrap`}>
                {
                  item.status == 'pending' 
                  ?
                    <Buttons>
                      <Button
                        className='bg-emerald-600 text-white w-18'
                        label="Apply"
                        onClick={() => handleActionButtonClick("apply", item.user.id, item.tender.id)}
                        small
                      />
                      <Button
                        className='bg-red-600 text-white w-18'
                        label="Cancel"
                        onClick={() => handleActionButtonClick("cancel", item.user.id, item.tender.id)}
                        small
                      />
                    </Buttons>
                  :
                    item.status == 'applied'
                    ?
                      <Button
                        className='bg-red-600 text-white w-18'
                        label="Cancel"
                        onClick={() => handleActionButtonClick("cancel", user.id, item.tender.id)}
                        small
                      />
                    :
                      null

                }
              
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
    </>
  )

}

export default InterestedUsersTable
