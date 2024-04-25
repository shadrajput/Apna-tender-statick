import { api } from "./api";

export const BookmarkList = api.injectEndpoints({
  endpoints: (build) => ({
    addBookmark: build.mutation({
      query: (data) => {
        return {
          url: "bookmark/add",
          method: "POST",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'BookMark' }],
    }),

    getAllMyBookmark: build.query({
      query: ({ pageNo, search, filter }) => `bookmark/mybookmarktender/?pageNo=${pageNo}&search=${search}&filter=${filter}`,
      providesTags: [{ type: 'BookMark' }]
    }),

    deleteBookmark: build.mutation({
      query: (data) => {
        return {
          url: "bookmark/delete-bookmark-tender",
          method: "DELETE",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: 'BookMark' }],
    }),


  }),
});

export const {
  useAddBookmarkMutation,
  useGetAllMyBookmarkQuery,
  useDeleteBookmarkMutation,
} = BookmarkList;