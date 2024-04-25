import React from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/Admin/AdminLayout'
import CardBoxWidget from '@/components/Admin/CardBox/Widget'
import CardBox from '@/components/Admin/CardBox'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'
import CardBoxComponentEmpty from '@/components/Admin/CardBox/Component/Empty'
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import InterestedUsersTable from '@/components/Admin/Table/InterestedUsers'
import {
  mdiArrowBottomLeft,
  mdiAccountGroup,
  mdiReceiptTextClockOutline,
  mdiReceiptTextOutline,
} from '@mdi/js'
import SmallLoader from '@/components/Common/SmallLoader'
import { useGetAdminDashboardDetailsQuery } from '@/services/admin'
import { useGetUsersWithInterestedTendersQuery } from '@/services/admin'

const DashboardPage = () => {
  const [pageNo, setPageNo] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(0);
  const [interestedUsers, setInterestedUsers] = React.useState([]);

  const cardDetails = useGetAdminDashboardDetailsQuery();
  const tableData = useGetUsersWithInterestedTendersQuery({
    pageNo: pageNo,
    search: "",
    filter: "pending"
  });

  const [cardData, setCardData] = React.useState({
    totalNewInquiries: 0,
    totalUnsubmittedTenders: 0,
    totalSubmittedTendersOfToday: 0
  })

  React.useEffect(()=>{
    if(cardDetails.data){
      setCardData({
        totalNewInquiries: cardDetails.data.totalNewInquiries,
        totalUnsubmittedTenders: cardDetails.data.totalUnsubmittedTenders,
        totalSubmittedTendersOfToday: cardDetails.data.totalSubmittedTendersOfToday
      })
    }
  },[cardDetails.data, cardDetails.isLoading])

   React.useEffect(() => {
    if(tableData.data){
      setInterestedUsers(tableData.data.userInterestedInTenders)
      setPageCount(tableData.data.pageCount)
      setItemsPerPage(tableData.data.itemsPerPage)
      cardDetails.refetch()
    }
  },[tableData.isLoading, tableData.isError, tableData.data])

  return (
     <AdminLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <Link href="/admin/inquiries">
          <CardBoxWidget
            icon={mdiAccountGroup}
            iconColor="text-blue-500"
            number={cardData.totalNewInquiries}
            label="New Inquiries"
          />
        </Link>

        <Link href="/admin/interested-users">
          <CardBoxWidget
            icon={mdiReceiptTextClockOutline}
            iconColor="text-blue-500"
            number={cardData.totalUnsubmittedTenders}
            label="Unsubmitted Tenders"
          />
        </Link>

        <CardBoxWidget
          icon={mdiReceiptTextOutline}
          iconColor="text-blue-500"
          number={cardData.totalSubmittedTendersOfToday}
          label="Submitted Today"
        />
      </div>
      <div>
        <SectionTitleLineWithButton title="Unsubmitted tenders"/>
        <CardBox className="mb-6" hasTable>
        {
          tableData.isLoading
          ?
            <SmallLoader/>
          :
            interestedUsers.length > 0
            ?
              <InterestedUsersTable data={interestedUsers} refetchInterestedUsers={tableData.refetch} itemsPerPage={itemsPerPage} setPageNo={setPageNo} pageCount={pageCount}/>
            :
              <CardBoxComponentEmpty />
        }
        </CardBox>
      </div>
    </AdminLayout>
  )
}


export default ProtectAdminRoutes(DashboardPage)
