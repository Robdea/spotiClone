import { useParams } from "react-router"
import { searchAlbumById, Song } from "../lib/data";
import { useEffect, useState } from "react";
import AlbumMusic from "../components/AlbumMusic";
import { useCurrentMusic } from "../storage/currentMusic";

function Album() {
    type AlbumParams = {
        albumId: string;
    };

    const {setSong, stringOfSongs, current} = useCurrentMusic()
    const { albumId } = useParams<AlbumParams>();
    const [songs, setSongs] = useState<Song[]>([])
    
    useEffect(() => {
        const res = searchAlbumById(albumId!);
        console.log("Busqueda: ", res);
        setSongs(res)
    },[albumId])
    
    function handleSelectMusic(song: Song) {
        const isDifferentAlbum = stringOfSongs.length > 0 && stringOfSongs[0].albumId !== song.albumId;

        if(isDifferentAlbum){
            console.log("No son iguales");
            console.log(current);
            const res = searchAlbumById(albumId!);
            setSongs(res)

            setSong(song, songs)
        }else{
            setSong(song, songs)
        }    
    }


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