import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Artist } from '../interfaces/ServerResponse';

const API =
  process.env.REACT_APP_API_URL ||
  'http://localhost:4002';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ5NjY1M2IzMmJiYmU2NTIxYmVjMjkiLCJ1c2VybmFtZSI6IlJvZ2VyIiwiaWF0IjoxNjY1NzU0NzA3LCJleHAiOjE2NjYxODY3MDd9.72ZanxJI8Z6QAvrIsFVibK-hIS-cfu-BRLi1t2i1jhE'

interface Response<T>{
  ok: boolean
  data: T
}

export const artistAPI = createApi({
  reducerPath: 'artistAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getArtists: builder.query<Response<Artist[]>, unknown>({
      query: () => '/artist',
    }),
    getArtistDetails: builder.query<Response<Artist>, string>({
      query: (artistID) => `/artist/${artistID}`,
    })
  }),
});

export const { useGetArtistsQuery, useGetArtistDetailsQuery } = artistAPI;
