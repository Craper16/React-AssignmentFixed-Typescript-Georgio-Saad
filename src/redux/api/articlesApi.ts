import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_KEY,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    fetchArticles: builder.query({
      query: (page: number) => {
        return {
          url: `/articles?page=${page}`,
          method: 'get',
        };
      },
    }),
  }),
});

export const { useFetchArticlesQuery } = articlesApi;
