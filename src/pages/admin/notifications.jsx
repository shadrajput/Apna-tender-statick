import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout'
import NotificationBar from '../../components/Admin/NotificationBar'
import {
  mdiAlertCircle,
  mdiCheckCircle,
} from '@mdi/js'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import Button from '@/components/Admin/Button'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import SmallLoader from '@/components/Common/SmallLoader'
import CardBox from '@/components/Admin/CardBox'
import CardBoxComponentEmpty from '@/components/Admin/CardBox/Component/Empty'
import { useGetAdminNotificationsQuery, useMarkAdminNotificationAsReadMutation } from '@/services/admin'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "@/redux/slices/UserSlice";

function Notifications() {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.user)

  const {data, isLoading, refetch} = useGetAdminNotificationsQuery()
  const [markAdminNotificationAsRead, {...markingAsRead}] = useMarkAdminNotificationAsReadMutation();

  const [allNotifications, setAllNotifications] = React.useState([])

  React.useEffect(()=>{
    if(data){
      setAllNotifications(data.allNotifications)
    }
  },[data, isLoading])

  const handleMarkAsReadBtnClick = async (notification_id)=>{
     Swal.fire({
      title: "Are you sure to mark notification as read?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await markAdminNotificationAsRead(notification_id)
        try{
          if(!markingAsRead.isError && res.data){
            toast.success(res.data.message)
            refetch();
            dispatch(setUser({...user, admin_notification_count: res.data.admin_notification_count}))
          }
          else if(markingAsRead.isError){
            toast.error(res.error.data.message)
          }
        }
        catch(err){
          toast.error(err.message)
        }
      }
    });
  }

  return (
    <AdminLayout>
      <SectionTitleLineWithButton title="Notifications"/>
      {
        isLoading
        ?
         <SmallLoader/>
        :
          allNotifications.length > 0
          ?
            allNotifications.map((item, index)=>{
              
              return(
                <div key={index}>
                  <div className='mb-3 mt-10'>
                    <p className='text-gray-700 text-sm'>{item.date}</p>
                  </div>
                  {
                    item.data.map((notification)=>{
                      return <NotificationBar
                        key={notification.id}
                        iconColor={`${!notification.is_read ? 'text-red-600' : 'text-gray-500'}`}
                        icon={!notification.is_read ? mdiAlertCircle : mdiCheckCircle}
                        button={
                          !notification.is_read
                          ?
                            <Button
                              className='border-0 bg-slate-700 text-white hover:opacity-70'
                              label="Mark as read"
                              small
                              onClick={()=> handleMarkAsReadBtnClick(notification.id)}
                            />
                          : null
                        }
                        outline={false}
                      > 
                        <span className={`${!notification.is_read ? 'text-red-500' : 'text-gray-500'}`}>{notification.message}</span>
                      </NotificationBar>
                    })
                  }
                </div>
              )
            })
          :
            <CardBox className="mb-6">
              <CardBoxComponentEmpty />
            </CardBox>
      }
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(Notifications)
