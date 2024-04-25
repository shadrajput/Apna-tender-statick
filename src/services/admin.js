import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    
    /* Admin related API calls */

    addAdmin: build.mutation({
      query: (data) => {
        return {
          url: "admin/add",
          method: "POST",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'AllAdmins' }],
    }),

    updateAdmin: build.mutation({
      query: ({data, admin_id}) => {
        return {
          url: `admin/update-other-admin/${admin_id}`,
          method: "PUT",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'AllAdmins' }],
    }),

    getAllAdmin: build.query({
      query: () => 'admin/',
      providesTags: [{ type: 'AllAdmins' }]
    }),

    deleteAdmin: build.mutation({
      query: (admin_id) => {
        return {
          url: `admin/${admin_id}`,
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'AllAdmins' }],
    }),

    makeSuperAdmin: build.mutation({
      query: (admin_id) => {
        return {
          url: `admin/make-super-admin/${admin_id}`,
          method: "PUT",
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'AllAdmins' }],
    }),

    removeSuperAdmin: build.mutation({
      query: (admin_id) => {
        return {
          url: `admin/remove-super-admin/${admin_id}`,
          method: "PUT",
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'AllAdmins' }],
    }),

    updateAdminProfileDetails: build.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: 'admin/udpate-profile-details',
          method: "PUT",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
    }),

    updateAdminPassword: build.mutation({
      query: (data) => {
        return {
          url: 'admin/update-password',
          method: "PUT",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
    }),

    
    /* User related API calls */

    blockUnblockUser: build.mutation({
      query: (user_id) => {
        return {
          url: `admin/user/block-unblock-user/${user_id}`,
          method: "PUT",
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'AllUsers' }],
    }),
    
    getUsersWithInterestedTenders: build.query({
      query: ({ pageNo, search, filter }) => `admin/user/all/interested-in-tenders/?pageNo=${pageNo}&search=${search}&filter=${filter}`,
      providesTags: [{ type: 'AllUsersWithInterestedTenders' }]
    }),

    getAllInquiries: build.query({
      query: ({ pageNo, search }) => `admin/user/inquiries/?pageNo=${pageNo}&search=${search}`,
      providesTags: [{ type: 'Inquiries' }]
    }),
    
    cancelInquiry: build.mutation({
      query: (inquiry_id) => {
        return {
          url: `admin/user/cancel-inquiry/${inquiry_id}`,
          method: "PUT",
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'Inquiries' }],
    }),

    convertInquiryToUser: build.mutation({
      query: ({inquiry_id, data}) => {
        return {
          url: `admin/user/convert-inquiry/${inquiry_id}`,
          method: "PUT",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'Inquiries' }],
    }),

    changeUserTenderReqStatus: build.mutation({
      query: ({status, user_id, tender_id}) => {
        return {
          url: `admin/user/change-tender-req-status/${user_id}`,
          method: "PUT",
          body: { status, tender_id },
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'AllUsersWithInterestedTenders' }],
    }),

    updateUserBasicDetails: build.mutation({
      query: ({data, user_id}) => {
        return {
          url: `admin/user/update-basic-details/${user_id}`,
          method: "PUT",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
    }),

    updateUserCredentials: build.mutation({
      query: ({data, user_id}) => {
        return {
          url: `admin/user/update-username-password/${user_id}`,
          method: "PUT",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
    }),
    
    addNewUser: build.mutation({
      query: (data) => {
        return {
          url: `admin/user/add-new`,
          method: "POST",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
    }),


    /* Tender related API calls */
    
    getAllAdminTenders: build.query({
      query: ({ pageNo, search,filter }) => `admin/tenders/?pageNo=${pageNo}&search=${search}&filter=${filter}`,
      providesTags: [{ type: 'AllAdminTenders' }]
    }),

    getAllTenderCategories: build.query({
      query: () => 'admin/tenders/categories',
      providesTags: [{ type: 'Categories' }]
    }),

    
    /* Other API calls */
    getAdminDashboardDetails: build.query({
      query: () => 'admin/dashboard-details',
      providesTags: [{ type: 'AdminDashboard' }]
    }),
    
    getAdminNotifications: build.query({
      query: () => 'admin/notifications',
      providesTags: [{ type: 'AdminNotifications' }]
    }),
    
    markAdminNotificationAsRead: build.mutation({
      query: (notification_id) => {
        return {
          url: `admin/notifications/mark-as-read/${notification_id}`,
          method: "PUT",
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'AdminNotifications' }],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useUpdateAdminMutation,
  useGetAllAdminQuery,
  useDeleteAdminMutation,
  useMakeSuperAdminMutation,
  useRemoveSuperAdminMutation,
  useUpdateAdminProfileDetailsMutation,
  useUpdateAdminPasswordMutation,
  
  useBlockUnblockUserMutation,
  useGetUsersWithInterestedTendersQuery,
  useGetAllInquiriesQuery,
  useCancelInquiryMutation,
  useConvertInquiryToUserMutation,
  useChangeUserTenderReqStatusMutation,
  useUpdateUserBasicDetailsMutation,
  useUpdateUserCredentialsMutation,
  useAddNewUserMutation,

  useGetAllAdminTendersQuery,
  useGetAllTenderCategoriesQuery,

  useGetAdminDashboardDetailsQuery,
  useGetAdminNotificationsQuery,
  useMarkAdminNotificationAsReadMutation
} = userApi;
