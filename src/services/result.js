import { api } from "./api";

export const resultapi = api.injectEndpoints({
    endpoints: (build) => ({

        getAllResults: build.query({
            query: ({ pageNo, search, filter }) => `result/?pageNo=${pageNo}&search=${search}&filter=${filter}`,
            providesTags: [{ type: 'Results' }]
        }),

        getResultDetails: build.query({
            query: ({id}) => `result/result-details/${id}`,
            providesTags: [{ type: 'Results' }]
        }),

    }),
});

export const {
    useGetAllResultsQuery,
    useGetResultDetailsQuery,

} = resultapi;