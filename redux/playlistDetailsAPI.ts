import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const playlistAPI =
  process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND || "http://localhost:4002";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU2NmVjN2Y5ZDU4MDNhNDAxOWVkNTciLCJ1c2VybmFtZSI6IlZpY3RvciIsImlhdCI6MTY2NjY4NDk0MSwiZXhwIjoxNjY3MTE2OTQxfQ.pWj9iehT_syyoNjAzOpZ4oSN3opBC11UYG-0Ptreaqk";

export const playlistDetailsAPI = createApi({
  reducerPath: "playlistDetailsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: playlistAPI }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPlaylistDetails: builder.query({
      query: (playlistID) => ({
        url: `/playlist/${playlistID}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }),
    }),
  }),
});


export const { useGetPlaylistDetailsQuery } = playlistDetailsAPI;
