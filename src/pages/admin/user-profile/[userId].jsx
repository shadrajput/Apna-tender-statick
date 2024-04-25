import {
  mdiAccount
} from '@mdi/js'
import React from 'react'
import SectionTitleLineWithButton from '../../../components/Admin/Section/TitleLineWithButton'
import AdminLayout from '@/components/Admin/AdminLayout'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import {useGetUserDataUsingIdQuery} from "@/services/user"
import { useRouter } from 'next/router'
import BasicDetailForm from '@/components/Admin/UserProfile/BasicDetailForm'
import UsernamePasswordForm from '@/components/Admin/UserProfile/UsernamePasswordForm'
import UserProfileTable from '@/components/Admin/Table/UserProfile'

const UserProfile = () => {
  const router = useRouter()
  const { userId } = router.query

  const [userFullName, setUserFullName] = React.useState('')
  const [basicDetails, setBasicDetails] = React.useState(null)
  const [tenders, setTenders] = React.useState([])
  const [userKeywords, setUserKeywords] = React.useState([])
  const [username, setUsername] = React.useState(null)
  
  const userData = useGetUserDataUsingIdQuery({user_id: userId}, {skip: userId ? false : true})

   React.useEffect(() => {
    if (userData.data) {
      setBasicDetails({
        name: userData.data.basicDetails.user_detail.name || '',
        email: userData.data.basicDetails.email || '',
        mobile: userData.data.basicDetails.mobile || '',
        gst_no: userData.data.basicDetails.user_detail.gst_number || '',
        address: userData.data.basicDetails.user_detail.address || '',
        company_name: userData.data.basicDetails.user_detail.company_name || '',
      })
      setUserFullName(userData.data.basicDetails.user_detail.name || '')
      setUsername(userData.data.basicDetails.username)
      setTenders(userData.data.userTenders)
      setUserKeywords(userData.data.userKeywords)
    }
  }, [userData.data]);


  return (
    <AdminLayout>
      <div>
        <SectionTitleLineWithButton icon={mdiAccount} title={`${userFullName !== '' ? `${userFullName} - Profile` : 'User Profile'}`} main/>
        <BasicDetailForm basicDetails={basicDetails} userKeywords={userKeywords} userId={userId} refetchUserDetails={userData.refetch}/>
        <UsernamePasswordForm username={username} userId={userId} refetchUserDetails={userData.refetch}/>
        <UserProfileTable data={tenders} />
      </div>
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(UserProfile)
