import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout'
import CardBox from '@/components/Admin/CardBox'
import CardBoxWidget from '@/components/Admin/CardBox/Widget'
import AllTendersTable from '@/components/Admin/Table/AllTenders'
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import CardBoxComponentEmpty from '@/components/Admin/CardBox/Component/Empty'
import Icon from '@/components/Admin/Icon'
import FormField from '@/components/Admin/Form/Field'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import {useGetAllAdminTendersQuery} from '@/services/admin'
import SmallLoader from '@/components/Common/SmallLoader'

import {
  mdiInvoiceTextClock,
  mdiMagnify,
  mdiInvoiceTextMultiple,
  mdiInvoiceTextRemove,
  mdiInvoiceTextCheck
} from '@mdi/js'

function AllTenders() {

  const [allTenders, setAllTenders] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [pageNo, setPageNo] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(0);
  const [filter, setFilter] = React.useState('active');
  const [cardData, setCardData] = React.useState({totalTenders: 0, activeTenders: 0, oldTenders: 0, upcomingTenders: 0});

  const {data, isLoading, isError, refetch} = useGetAllAdminTendersQuery({
    pageNo: pageNo,
    search,
    filter
  });

  const handleTenderSearch = (e) =>{
    setSearch(e.target.value)   
  }

  const handleTenderTypeDropdownChange = (e) =>{
    setFilter(e.target.value);
    refetch();
  }

  React.useEffect(() => {
    if(data){
      setAllTenders(data.allTenders)
      setPageCount(data.pageCount)
      setItemsPerPage(data.itemsPerPage)
      setCardData({totalTenders: data.totalTenders, activeTenders: data.activeTenders, oldTenders: data.oldTenders, upcomingTenders: data.upcomingTenders})
    }
  },[isLoading, isError, data])

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          icon={mdiInvoiceTextMultiple}
          iconColor="text-blue-500"
          number={cardData.totalTenders}
          label="Total Tenders"
        />
        <CardBoxWidget
          icon={mdiInvoiceTextCheck}
          iconColor="text-emerald-500"
          number={cardData.activeTenders}
          label="Active"
        />
        <CardBoxWidget
          icon={mdiInvoiceTextClock}
          iconColor="text-gray-500"
          number={cardData.upcomingTenders}
          label="Upcoming"
        />
        <CardBoxWidget
          icon={mdiInvoiceTextRemove}
          iconColor="text-red-500"
          number={cardData.oldTenders}
          label="Old"
        />
      </div>
      <SectionTitleLineWithButton title="All Tenders"/>
      <div className="w-full flex">
        <div className='w-full flex justify-between items-center shadow-1 mb-4 mr-2 px-4 py-1 bg-slate-700 rounded-lg'>
          <input 
            type="search" 
            className="w-full h-full border-none focus:ring-0 bg-transparent text-white placeholder:text-gray-400" 
            placeholder="Search tender by id or title" 
            onChange={handleTenderSearch}
          />
          <Icon path={mdiMagnify} size={32} className='text-gray-200'/>
        </div>
        <select name="user_type" id="user_type" value={filter} className='h-full bg-slate-700 text-white rounded-lg' onChange={handleTenderTypeDropdownChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="upcoming">Upcoming</option>
          <option value="old">Old</option>
        </select>
      </div>
      <CardBox className="mb-6" hasTable>
        {
          isLoading
          ?
            <SmallLoader/>
          :
            allTenders.length > 0
            ?
              <AllTendersTable data={allTenders} isLoading={isLoading} itemsPerPage={itemsPerPage} setPageNo={setPageNo} pageCount={pageCount}/>
            :
              <CardBoxComponentEmpty />
        }
      </CardBox>
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(AllTenders)
