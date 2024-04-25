import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout'
import ProtectAdminRoutes from '@/utils/protectedAdminRoutes'

function Report() {
  return (
    <AdminLayout>
      <div>Report</div>
    </AdminLayout>
  )
}

export default ProtectAdminRoutes(Report)
