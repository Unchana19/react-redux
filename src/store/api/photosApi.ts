import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Album } from "../../types/album.type";
import type { Photo } from "../../types/photo.type";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  tagTypes: ["Photo", "AlbumPhoto"],
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, _error, album) => {
          const tags = result.map((photo: Photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumPhoto", id: album.id });
          return tags;
        },
        query: (album: Album) => {
          return {
            method: "GET",
            url: "/photos",
            params: {
              albumId: album.id,
            },
          };
        },
      }),

      addPhoto: builder.mutation({
        invalidatesTags: (_result, _error, album: Album) => {
          return [{ type: "AlbumPhoto", id: album.id }];
        },
        query: (album: Album) => {
          return {
            method: "POST",
            url: "/photos",
            body: {
              albumId: album.id,
              url: faker.image.url(),
            },
          };
        },
      }),

      removePhoto: builder.mutation({
        invalidatesTags: (_result, _error, photo: Photo) => {
          return [{ type: "Photo", id: photo.id }];
        },
        query: (photo: Photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;

export { photosApi };
