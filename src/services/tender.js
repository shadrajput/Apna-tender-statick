import { api } from "./api";

export const tenderapi = api.injectEndpoints({
    endpoints: (build) => ({
        addInquiry: build.mutation({
            query: (data) => {
                return {
                    url: "tender/add-inquiry",
                    method: "POST",
                    body: data,
                    headers: { 'Content-Type': 'application/json' }
                };
            },
            invalidatesTags: [{ type: 'TenderList' }],
        }),

        addInterest: build.mutation({
            query: (data) => {
                return {
                    url: "tender/add-interest",
                    method: "POST",
                    body: {data},
                    headers: { 'Content-Type': 'application/json' }
                };
            },
            invalidatesTags: [{ type: 'AllTenders' }],
        }),

        getAllMyTender: build.query({
            query: ({ pageNo, search, filter }) => `tender/myappliedtender/?pageNo=${pageNo}&search=${search}&filter=${filter}`,
            providesTags: [{ type: 'TenderList' }]
        }),

        getAllTenders: build.query({
            query: ({ pageNo, search, filter }) => `tender/?pageNo=${pageNo}&search=${search}&filter=${filter}`,
            providesTags: [{ type: 'TenderList' }]
        }),

        removeAppliedTender: build.mutation({
            query: (data) => {
                return {
                    url: "tender/remove-applied-tender",
                    method: "DELETE",
                    body: data,
                    headers: { 'Content-Type': 'application/json' }
                };
            },
            invalidatesTags: [{ type: 'TenderList' }],
        }),

        getLatestTender: build.query({
            query: () => 'tender/latest',
            providesTags: [{ type: 'TenderList' }]
        }),

        getTenderDetails: build.query({
            query: ({id}) => `tender/tender-details/${id}`,
            providesTags: [{ type: 'TenderList' }]
        }),

        getTenderByKeyword: build.query({
            query: ({ search, filter }) => `tender/tender-keyword/?search=${search}&filter=${filter}`,
            providesTags: [{ type: 'TenderList' }]
        }),

    }),
});

export const {
    useAddInquiryMutation,
    useAddInterestMutation,
    useGetAllMyTenderQuery,
    useGetAllTendersQuery,
    useRemoveAppliedTenderMutation,
    useGetLatestTenderQuery,
    useGetTenderDetailsQuery,
    useGetTenderByKeywordQuery,

} = tenderapi;