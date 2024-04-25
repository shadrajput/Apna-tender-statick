import React, {useState, useEffect} from 'react'
import CardBox from '@/components/Admin/CardBox'
import AllAdminsTable from '@/components/Admin/Table/AllAdmins'
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import AdminLayout from '@/components/Admin/AdminLayout'
import Button from '@/components/Admin/Button'
import AddAdminModal from '@/components/Admin/Modals/AddAdminModal'
import EditAdminModal from '@/components/Admin/Modals/EditAdminModal'
import {
  mdiPlus
} from '@mdi/js'
import { useGetAllAdminQuery } from '@/services/admin'
import { toast } from 'react-toastify'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import { useSelector } from 'react-redux'

function AllAdmins() {  
  const {user} = useSelector((state)=> state.user)
  const [addAdminModal, setAddAdminModal] = React.useState(false);
  const [editAdminModal, setEditAdminModal] = React.useState(false);
  const adminData = useGetAllAdminQuery();
  const [allAdmins, setAllAdmins] = useState([]);
  const [updateAdminDetails, setUpdateAdminDetails] = useState(null);

  useEffect(()=>{
    try{
      if(!adminData.isError && adminData.data){
        
        //Removing the current logged in admin
        const admins = adminData.data.admins.filter((admin)=>{
          return (admin.user_id != user.id);
        })

        setAllAdmins(admins)
      }
      else if(adminData.isError){
        toast.error(adminData.error.data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  },[adminData.isFetching, adminData.data])


  return (
    <AdminLayout>
      <SectionTitleLineWithButton title="All Admins">
        {
          user.is_super_admin
          ?
            <Button
                color="info"
                icon={mdiPlus}
                onClick={() => setAddAdminModal(true)}
                className='bg-slate-800 text-white hover:opacity-70'
                small
                label="Add Admin"
                roundedFull
            />
          : 
            null
        }
      </SectionTitleLineWithButton>
      <CardBox className="mb-6" hasTable>
        <AllAdminsTable setEditAdminModal={setEditAdminModal} allAdmins={allAdmins} setUpdateAdminDetails={setUpdateAdminDetails} refetchAdminData={adminData.refetch}/>
      </CardBox>

      <AddAdminModal showModal={addAdminModal} handleShowModal={setAddAdminModal}  refetchAdminData={adminData.refetch}/>
      <EditAdminModal showModal={editAdminModal} handleShowModal={setEditAdminModal} refetchAdminData={adminData.refetch} updateAdminDetails={updateAdminDetails} setUpdateAdminDetails={setUpdateAdminDetails} />
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(AllAdmins)
