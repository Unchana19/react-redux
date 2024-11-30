import { GoTrash } from "react-icons/go";
import type { Album } from "../types/album.type";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

interface Props {
  album: Album;
}

function AlbumsListItem({ album }: Props) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const header = (
    <div className="flex items-center gap-3">
      <Button loading={results.isLoading} onClick={handleRemoveAlbum}>
        <GoTrash />
      </Button>
      {album.title}
    </div>
  );

  return (
    <ExpandablePanel header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
