import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation({
      query: (data) => {
        return {
          url: "user/update-profile",
          method: "PUT",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'User' }],
    }),

    getUserDataUsingId: build.query({
      query: ({ user_id }) => `user/${user_id}`,
      providesTags: [{ type: 'UserAdminSide' }]
    }),

    getUserDataUsingToken: build.query({
      query: () => 'user/get-data-using-token',
      providesTags: [{ type: 'User' }]
    }),
    
    getAllUsers: build.query({
      query: ({ pageNo, search, filter }) => `user/?pageNo=${pageNo}&search=${search}&filter=${filter}`,
      providesTags: [{ type: 'AllUsers' }]
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetUserDataUsingTokenQuery,
  useGetAllUsersQuery,
  useGetUserDataUsingIdQuery,
} = userApi;
