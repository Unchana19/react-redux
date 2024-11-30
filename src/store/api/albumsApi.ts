import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../types/user.type";
import type { Album } from "../../types/album.type";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  tagTypes: ["Album", "UsersAlbums"],
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, _error, user: User) => {
          const tags = result.map((album: Album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: user.id });
          return tags;
        },
        query: (user: User) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),

      addAlbum: builder.mutation({
        invalidatesTags: (_result, _error, user: User) => {
          return [{ type: "UsersAlbums", id: user.id }];
        },
        query: (user: User) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),

      removeAlbum: builder.mutation({
        invalidatesTags: (_result, _error, album: Album) => {
          return [{ type: "Album", id: album.id }];
        },
        query: (album: Album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
