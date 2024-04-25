import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout'
import CardBox from '@/components/Admin/CardBox'
import CardBoxWidget from '@/components/Admin/CardBox/Widget'
import AllUsersTable from '@/components/Admin/Table/AllUsers'
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import CardBoxComponentEmpty from '@/components/Admin/CardBox/Component/Empty'
import Icon from '@/components/Admin/Icon'
import FormField from '@/components/Admin/Form/Field'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import {useGetAllUsersQuery} from '@/services/user'
import SmallLoader from '@/components/Common/SmallLoader'
import {
  mdiAccountGroup,
  mdiAccountMultipleCheck,
  mdiAccountMultipleMinus,
  mdiMagnify
} from '@mdi/js'

function AllUsers() {

  const [allUsers, setAllUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [pageNo, setPageNo] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(0);
  const [filter, setFilter] = React.useState('all');
  const [cardData, setCardData] = React.useState({totalUsers: 0, activeUsers: 0, inactiveUsers: 0});

  const {data, isLoading, isError, refetch} = useGetAllUsersQuery({
    pageNo: pageNo,
    search,
    filter
  });

  const handleUserSearch = (e) =>{
    setSearch(e.target.value)   
  }

  const handleUserTypeDropdownChange = (e) =>{
    setFilter(e.target.value);
    refetch();
  }

  React.useEffect(() => {
    if(data){
      setAllUsers(data.allUsers)
      setPageCount(data.pageCount)
      setItemsPerPage(data.itemsPerPage)
      setCardData({totalUsers: data.totalUsers, activeUsers: data.activeUsers, inactiveUsers: data.inactiveUsers})
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
          number={cardData.activeUsers}
          label="Active"
        />
        <CardBoxWidget
          icon={mdiAccountMultipleMinus}
          iconColor="text-red-500"
          number={cardData.inactiveUsers}
          label="Inactive"
        />
      </div>
      <SectionTitleLineWithButton title="All Users"/>
      <div className="w-full flex">
        <div className='w-full flex justify-between items-center shadow-1 mb-4 mr-2 px-4 py-1 bg-slate-700 rounded-lg'>
          <input 
            type="search" 
            className="w-full h-full border-none focus:ring-0 bg-transparent text-white placeholder:text-gray-400" 
            placeholder="Search users by name, email & mobile" 
            onChange={handleUserSearch}
          />
          <Icon path={mdiMagnify} size={32} className='text-gray-200'/>
        </div>
        <select name="user_type" id="user_type" className='h-full bg-slate-700 text-white rounded-lg' value={filter} onChange={handleUserTypeDropdownChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <CardBox className="mb-6" hasTable>
        {
          isLoading
          ?
            <SmallLoader/>
          :
            allUsers.length > 0
            ?
              <AllUsersTable data={allUsers} itemsPerPage={itemsPerPage} setPageNo={setPageNo} pageCount={pageCount}/>
            :
              <CardBoxComponentEmpty />
        }
      </CardBox>
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(AllUsers)
