import { useParams } from "react-router"
import { searchAlbumById, Song } from "../lib/data";
import { useEffect, useState } from "react";
import AlbumMusic from "../components/AlbumMusic";
import { useCurrentMusic } from "../storage/currentMusic";

function Album() {
    type AlbumParams = {
        albumId: string;
    };

    const {setSong} = useCurrentMusic()
    const { albumId } = useParams<AlbumParams>();
    const [songs, setSongs] = useState<Song[]>([])


    function handleSelectMusic(song: Song) {
        setSong(song, songs)
    }
    useEffect(() => {
        const res = searchAlbumById(albumId!);
        setSongs(res)
    },[albumId])

    return (
    <div className="p-6">
        <div className="flex justify-between">
            <div className="flex gap-3">
                <span>#</span>
                <span>Título</span>
            </div>
            <span>Album</span>
            <span>Duration</span>
        </div>
        {songs.map((s, i) => (
            <AlbumMusic
                onSelect={() => handleSelectMusic(s)}
                album={s.album}
                artists={s.artists}
                duration={s.duration}
                img={s.img}
                index={i}
                music={s.music}
                title={s.title}
                key={s.id}
            />
        ))}
    </div>
  )
}

export default Album