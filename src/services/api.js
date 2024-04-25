import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from '../../constant.js'

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authentication', `${token}`)
    }
    return headers
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "User", "TenderList", "UsersList", "AllUsers", "AllAdmins", "AllUsersWithInterestedTenders", "Inquiries", "BookMark", "Notification", "AllAdminTenders", "Results", "UserAdminSide", "Categories", "AdminDashboard", "AdminNotifications"
  ],
  endpoints: () => ({}),
});
