import { GoTrash } from "react-icons/go";
import type { Photo } from "../types/photo.type";
import { useRemovePhotoMutation } from "../store";

interface Props {
  photo: Photo;
}

function PhotosListItem({ photo }: Props) {
  const [removePhoto] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <button
      type="button"
      onClick={handleRemovePhoto}
      className="relative m-3 cursor-pointer"
    >
      <img className="h-20 w-20" src={photo.url} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrash className="text-3xl" />
      </div>
    </button>
  );
}

export default PhotosListItem;
