import { api } from "./api";

export const authenticationApi = api.injectEndpoints({
  endpoints: (build) => ({

    signin: build.mutation({
      query: (data) => {
        return {
          url: "user/signin",
          method: "POST",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: (result, error) => [{ type: 'User' }],
    }),

    signup: build.mutation({
      query: (data) => {
        return {
          url: "user/",
          method: "POST",
          body: data,
          headers: { 'Content-Type': 'application/json' }
        };
      },
      invalidatesTags: [{ type: "User" }],
    }),

    verifyAccount: build.query({
      query: ({ user_id, token }) => {
        return {
          url: `user/verify-account/${user_id}/${token}`,
          method: 'GET'
        }
      }
    }),

    resendVerificationLink: build.mutation({
      query: () => 'user/resend-verification-link'
    }),

    sendResetPasswordLink: build.mutation({
      query: (email) => {
        return {
          url: 'user/send-reset-password-link',
          method: "POST",
          body: {
            email
          },
          headers: { 'Content-Type': 'application/json' }
        };
      }
    }),

    resetPassword: build.mutation({
      query: ({ token, password }) => {
        return {
          url: 'user/reset-password',
          method: "POST",
          body: {
            token,
            newPassword: password
          },
          headers: { 'Content-Type': 'application/json' }
        };
      }
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useVerifyAccountQuery,
  useResendVerificationLinkMutation,
  useSendResetPasswordLinkMutation,
  useResetPasswordMutation,
} = authenticationApi;
