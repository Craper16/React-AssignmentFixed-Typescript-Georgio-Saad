import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  authResponse,
  credentials,
} from '../../interfaces/auth/authInterfaces';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_KEY }),
  endpoints: (builder) => ({
    signInUser: builder.mutation<authResponse, credentials>({
      query: (body) => {
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
