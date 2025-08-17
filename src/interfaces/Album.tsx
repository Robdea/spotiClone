import { useParams } from "react-router"
import { getAutorById, Playlist, searchAlbumById, Song } from "../lib/data";
import { useEffect, useState } from "react";
import AlbumMusic from "../components/AlbumMusic";
import { useCurrentMusic } from "../storage/currentMusic";
import PlayButton from "../components/PlayButton";

function Album() {
    type AlbumParams = {
        albumId: string;
    };

    const {setSong, isAlbumActive, setIsPaused, musicData, setStringSong, setRestart} = useCurrentMusic()
    const { albumId } = useParams<AlbumParams>();
    const [songs, setSongs] = useState<Song[]>([])
    const [autor, setAutor] = useState<Playlist>();
    
    useEffect(() => {
        const res = searchAlbumById(albumId!);
        const autor = getAutorById(albumId!)
        setSongs(res)
        setAutor(autor)
    },[albumId])

    function handleSelectMusic(song: Song) {
        setSong(song, songs)
    }

     async function handlePlayAlbum() {
        if (!albumId) return;
        if(musicData === null || albumId !== musicData.albumId){
            setRestart()
            const res = await searchAlbumById(albumId);
            setStringSong(res);
        }else{
            setIsPaused()        
        }
    }

    // const isActive = musicData && musicData.albumId === albumId && isPaused;

    return (
    <div className="relative">
        <div 
           style={{
            background: `linear-gradient(to bottom, ${autor?.color.accent}, ${autor?.color.dark} 60%, #121212 100%)`
        }}      
        className="absolute h-80 w-full z-1 rounded-t-2xl">
        </div>
        <header   
        className="relative p-5 flex gap-5 z-10">
            <img className="size-54 rounded-xs" src={autor?.cover} alt="" />
            <div 
            className="flex flex-col justify-end">
                <h1 className="text-6xl font-medium ml-2">{autor?.title}</h1>
                <>
                    {autor?.artists.map((a) => (
                        <p>{a}</p>
                    ))}
                </>
            </div>
        </header>
        
        <div className="relative z-10 px-5  h-fit">
            <PlayButton
            className="bg-green hover:bg-light-green size-15 flex justify-center"
            handlePlay={handlePlayAlbum}
            isPlay={isAlbumActive(albumId ?? "")}
            />
        </div>

        <div className="relative z-10 p-5">
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
    </div>
  )
}

export default Album