import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout'
import CardBox from '@/components/Admin/CardBox'
import CardBoxWidget from '@/components/Admin/CardBox/Widget'
import CardBoxComponentEmpty from '@/components/Admin/CardBox/Component/Empty'
import InterestedUsersTable from '@/components/Admin/Table/InterestedUsers'
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import { useGetUsersWithInterestedTendersQuery } from '@/services/admin'
import SmallLoader from '@/components/Common/SmallLoader'
import Icon from '@/components/Admin/Icon'
import {
  mdiAccountGroup,
  mdiAccountMultipleCheck,
  mdiAccountClock,
  mdiCloseOctagon,
  mdiMagnify
} from '@mdi/js'

function InterestedUsers() {
  const [interestedUsers, setInterestedUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [pageNo, setPageNo] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(0);
  const [filter, setFilter] = React.useState('pending');
  const [cardData, setCardData] = React.useState({totalUsers: 0, pending: 0, applied: 0, cancelled: 0});

  const {data, isLoading, isError, refetch} = useGetUsersWithInterestedTendersQuery({
    pageNo: pageNo,
    search,
    filter
  });

  const handleUserSearch = (e) =>{
    setSearch(e.target.value)   
  }

  const handleUserTypeDropdownChange = (e) =>{
    setFilter(e.target.value)
    refetch();
  }

  React.useEffect(() => {
    if(data){
      setInterestedUsers(data.userInterestedInTenders)
      setPageCount(data.pageCount)
      setItemsPerPage(data.itemsPerPage)
      setCardData({totalUsers: data.totalUsers, pending: data.totalPending, applied: data.totalApplied, cancelled: data.totalCancelled})
    }
  },[isLoading, isError, data])
  
  
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          icon={mdiAccountGroup}
          iconColor="text-blue-500"
          number={cardData.totalUsers}
          label="Total Users"
        />
        <CardBoxWidget
          icon={mdiAccountMultipleCheck}
          iconColor="text-emerald-500"
          number={cardData.applied}
          label="Applied"
        />
        <CardBoxWidget
          icon={mdiAccountClock}
          iconColor="text-gray-500"
          number={cardData.pending}
          label="Pending"
        />
        <CardBoxWidget
          icon={mdiCloseOctagon}
          iconColor="text-red-500"
          number={cardData.cancelled}
          label="Cancelled"
        />
      </div>
      <SectionTitleLineWithButton title="Interested Users"/>
      <div className="w-full flex">
        <div className='w-full flex justify-between items-center shadow-1 mb-4 mr-2 px-4 py-1 bg-slate-700 rounded-lg'>
          <input 
            type="search" 
            className="w-full h-full border-none focus:ring-0 bg-transparent text-white placeholder:text-gray-400" 
            placeholder="Search user by username, email & mobile" 
            onChange={handleUserSearch}
          />
          <Icon path={mdiMagnify} size={32} className='text-gray-200'/>
        </div>
        <select name="user_type" id="user_type" value={filter} className='h-full bg-slate-700 text-white rounded-lg' onChange={handleUserTypeDropdownChange}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="applied">Applied</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <CardBox className="mb-6" hasTable>
        {
          isLoading
          ?
            <SmallLoader/>
          :
            interestedUsers.length > 0
            ?
              <InterestedUsersTable data={interestedUsers} refetchInterestedUsers={refetch} itemsPerPage={itemsPerPage} setPageNo={setPageNo} pageCount={pageCount}/>
            :
              <CardBoxComponentEmpty />
        }
      </CardBox>
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(InterestedUsers)
