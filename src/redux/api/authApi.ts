import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_KEY }),
  endpoints: (builder) => ({
    signInUser: builder.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: '/auth/signin',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const { useSignInUserMutation } = authApi;
