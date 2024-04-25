import { mdiPencil, mdiTrashCan, mdiCloseCircle, mdiCheckCircle } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import Icon from '../Icon'
import { useDeleteAdminMutation, useMakeSuperAdminMutation, useRemoveSuperAdminMutation } from '@/services/admin'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const AllAdminsTable = ({setEditAdminModal, allAdmins, setUpdateAdminDetails, refetchAdminData}) => {
  const {user} = useSelector((state)=>state.user)

  const [deleteAdmin, {...deletingAdmin}] = useDeleteAdminMutation()
  const [makeSuperAdmin, {...makingSuperAdmin}] = useMakeSuperAdminMutation()
  const [removeSuperAdmin, {...removingSuperAdmin}] = useRemoveSuperAdminMutation()

  const handleDeleteAdmin = async (admin_id) =>{
    const res = await deleteAdmin(admin_id)

    try{
      if(!deletingAdmin.isError && res.data){
        toast.success(res.data.message);
        refetchAdminData();
      }
      else if(deletingAdmin.isError){
        toast.error(res.error.data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }

  const handleUpdateAdmin = (adminDetails) => {
    setEditAdminModal(true); 
    setUpdateAdminDetails(adminDetails)
  }

  const handleMakeSuperAdmin = async (admin_id) => {
     const res = await makeSuperAdmin(admin_id)

    try{
      if(!makingSuperAdmin.isError && res.data){
        toast.success(res.data.message);
        refetchAdminData();
      }
      else if(makingSuperAdmin.isError){
        toast.error(res.error.data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }
  
  const handleRemoveSuperAdmin = async (admin_id) => {
     const res = await removeSuperAdmin(admin_id)

    try{
      if(!removingSuperAdmin.isError && res.data){
        toast.success(res.data.message);
        refetchAdminData();
      }
      else if(removingSuperAdmin.isError){
        toast.error(res.error.data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Email</th>
            <th>Username</th>
            <th>Super Admin</th>
            {
              user.is_super_admin
              ?
                <th/>
              :
                null
            }
          </tr>
        </thead>
        <tbody>
          {allAdmins.map((admin, index) => {
            return(<>
              <tr key={index}>
                <td className="border-b-0 lg:w-6 before:hidden">
                  {index + 1}
                </td>
                <td data-label="Email">{admin.user.email}</td>
                <td data-label="Username">{admin.user.username}</td>
                <td data-label="Super Admin" className={`${admin.is_super_admin ? 'text-emerald-600' : 'text-red-600'}`}>{
                  admin.is_super_admin
                  ?
                    <Icon path={mdiCheckCircle} size={20} />
                  :
                    <Icon path={mdiCloseCircle} size={20} /> 
                }</td>
                {
                  user.is_super_admin
                ?
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end" noWrap>
                      {
                        admin.is_super_admin
                        ?
                          <Button
                            className='bg-emerald-600 text-white'
                            small
                            label='Remove super admin'
                            onClick={()=> {handleRemoveSuperAdmin(admin.id)}}
                          />
                        :
                          <Button
                            className='bg-red-600 text-white'
                            small
                            label='Make super admin'
                            onClick={()=> {handleMakeSuperAdmin(admin.id)}}
                          />

                      }
                      <Button
                        className='bg-blue-600 text-white'
                        icon={mdiPencil}
                        onClick={() => {handleUpdateAdmin(admin)}}
                        small
                      />
                      <Button
                        className='bg-red-600 text-white'
                        icon={mdiTrashCan}
                        onClick={() => {handleDeleteAdmin(admin.id)}}
                        small
                        disabled={deletingAdmin.isLoading}
                      />
                    </Buttons>
                  </td>
                :
                  null
                }
              </tr>
            </>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default AllAdminsTable
