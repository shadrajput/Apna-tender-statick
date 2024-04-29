import { mdiEye } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import _ from 'lodash';
import { useBlockUnblockUserMutation } from '@/services/admin';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';

const AllUsersTable = ({data, itemsPerPage, setPageNo, pageCount}) => {
  const router = useRouter();

  const [allUsers, setAllUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const [blockUnblockUser, {...blockingUnblockingUser}] = useBlockUnblockUserMutation();

  const handleBlockUnblockUser = async (user_id) => {
    const res = await blockUnblockUser(user_id)
    try{
      if(!blockingUnblockingUser.isError && res.data){
        toast.success(res.data.message)
      }
      else if(blockingUnblockingUser.isError){
        toast.error(res.error.data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }

  useEffect(() =>{
    setAllUsers(data)
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
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td className="border-b-0 lg:w-6 before:hidden">
                {(currentPage * itemsPerPage) + (index+1)}
              </td>
              <td data-label="Name" className=''>{user.user_detail?.name}</td>
              <td data-label="Email" className=''>{user.email}</td>
              <td data-label="Mobile" className=''>{user.mobile}</td>
              <td data-label="Status" className={`whitespace-nowrap ${user.is_active ? 'text-emerald-600' : 'text-red-600'}`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </td>
              <td className="before:hidden lg:w-40 whitespace-nowrap">
                <Buttons>
                  <Button
                      className='bg-blue-600 text-white'
                      icon={mdiEye}
                      onClick={() => router.push(`/admin/user-profile/${user.id}`)}
                      small
                  />
                  {
                    user.is_active
                    ?
                      <Button
                        className='bg-red-600 text-white w-20'
                        label="Block"
                        onClick={() => handleBlockUnblockUser(user.id)}
                        small
                      />
                    :
                      <Button
                        className='bg-emerald-600 text-white w-20'
                        label="Unblock"
                        onClick={() => handleBlockUnblockUser(user.id)}
                        small
                      />

                  }
                </Buttons>
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

export default AllUsersTable
