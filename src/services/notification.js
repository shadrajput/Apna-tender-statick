import { api } from "./api";

export const Notification = api.injectEndpoints({
    endpoints: (build) => ({

        getAllNotification: build.query({
            query: ({ pageNo }) => `notification/?pageNo=${pageNo}`,
            providesTags: [{ type: 'Notification' }]
        }),

        readNotification: build.mutation({
            query: (data) => {
                return {
                    url: "notification/read-notification",
                    method: "PUT",
                    body: data,
                    headers: { 'Content-Type': 'application/json' }
                };
            },
            invalidatesTags: [{ type: 'Notification' }],
        })

    }),
});

export const {
    useGetAllNotificationQuery,
    useReadNotificationMutation
} = Notification;