import type { ReactNode } from "react";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import type { Album } from "../types/album.type";
import Button from "./Button";
import Skeleton from "./Skeleton";
import type { Photo } from "../types/photo.type";
import PhotosListItem from "./PhotosListItem";

interface Props {
  album: Album;
}

function PhotosList({ album }: Props) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content: ReactNode;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else {
    content = data.map((photo: Photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>

      <div className="mx-8 flex flex-wrap justify-center">{content}</div>
    </div>
  );
}

export default PhotosList;
