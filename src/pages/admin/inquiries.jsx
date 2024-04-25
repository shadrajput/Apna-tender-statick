import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout'
import CardBox from '@/components/Admin/CardBox'
import CardBoxWidget from '@/components/Admin/CardBox/Widget'
import InquiriesTable from '@/components/Admin/Table/Inquiries'
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import CardBoxComponentEmpty from '@/components/Admin/CardBox/Component/Empty'
import Icon from '@/components/Admin/Icon'
import {useGetAllInquiriesQuery} from '@/services/admin'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import {
  mdiAccountGroup,
  mdiMagnify
} from '@mdi/js'
import SmallLoader from '@/components/Common/SmallLoader'

function Inquiries() {

  const [inquiries, setInquiries] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [pageNo, setPageNo] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(0);
  const [cardData, setCardData] = React.useState({totalInquiries: 0});

  const {data, isLoading, isError, refetch} = useGetAllInquiriesQuery({
    pageNo: pageNo,
    search,
  });

  const handleUserSearch = (e) =>{
    setSearch(e.target.value)   
  }

  React.useEffect(() => {
    if(data){
      setInquiries(data.allInquiries)
      setPageCount(data.pageCount)
      setItemsPerPage(data.itemsPerPage)
      setCardData({totalInquiries: data.totalInquiries})
    }
  },[isLoading, isError, data])

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          icon={mdiAccountGroup}
          iconColor="text-blue-500"
          number={cardData.totalInquiries}
          label="Inquiries"
        />
      </div>
      <SectionTitleLineWithButton title="All Inquiries"/>
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
      </div>
      <CardBox className="mb-6" hasTable>
        {
          isLoading
          ?
            <SmallLoader/>
          :
            inquiries.length > 0
            ?
              <InquiriesTable data={inquiries} refetchInquiries={refetch} itemsPerPage={itemsPerPage} setPageNo={setPageNo} pageCount={pageCount}/>
            :
              <CardBoxComponentEmpty />
        }
      </CardBox>
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(Inquiries)
