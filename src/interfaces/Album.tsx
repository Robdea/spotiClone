import { useParams } from "react-router"
import { getAutorById, Playlist, searchAlbumById, Song } from "../lib/data";
import { useEffect, useState } from "react";
import AlbumMusic from "../components/AlbumMusic";
import { useCurrentMusic } from "../storage/currentMusic";
import PlayButton from "../components/PlayButton";
import { useIsMobile } from "../hooks/useIsMobile";

function Album() {
    type AlbumParams = {
        albumId: string;
    };

    const {setSong, isAlbumActive, setIsPaused, setCurrentAutor, musicData, setStringSong, setRestart, isPaused} = useCurrentMusic()
    const { albumId } = useParams<AlbumParams>();
    const [songs, setSongs] = useState<Song[]>([])
    const [autor, setAutor] = useState<Playlist>();
    
    const isMobile = useIsMobile();

    useEffect(() => {
        const res = searchAlbumById(albumId!);
        const autor = getAutorById(albumId!)
        setSongs(res)
        setAutor(autor)
    },[albumId])

    function handleSelectMusic(song: Song) {
        if(!isPaused) setIsPaused();

        if (autor) {
            setCurrentAutor({
                title: autor.title,
                color: autor.color
            });
        }

        setSong(song, songs)
    }

    async function handlePlayAlbum() {
        if (!albumId) return;
        
        if (autor) {
            setCurrentAutor({
                title: autor.title,
                color: autor.color
            });
        }
        if(musicData === null || albumId !== musicData.albumId){
            setRestart()
            const res = await searchAlbumById(albumId);
            setStringSong(res);
        }else{
            setIsPaused()        
        }
    }

    return (
    <div className="relative">
        <div 
           style={{
            background: `linear-gradient(to bottom, ${autor?.color.accent}, ${autor?.color.dark} 60%, #121212 100%)`
        }}      
        className="absolute h-80 w-full z-1 md:rounded-t-2xl">
        </div>
        <header   
        className="relative p-5 flex gap-5 z-10 md:flex-row flex-col">
            <div className="flex justify-center">
                <img className="md:size-54 size-40 rounded-xs" src={autor?.cover} alt="" />
            </div>
            <div 
            className="flex flex-col justify-end">
                <h1 className="text-6xl font-medium ml-2">{autor?.title}</h1>
                <p>{autor?.artists.join(", ")}</p>
            </div>
        </header>
        
        <div className="relative z-10 px-5 h-fit flex md:justify-start justify-end">
            <PlayButton
            className="bg-green hover:bg-light-green size-15 flex justify-center"
            handlePlay={handlePlayAlbum}
            isPlay={isAlbumActive(albumId ?? "")}
            />
        </div>

        <div className="relative z-10 p-5">
            {
                !isMobile &&
                <div className="grid grid-cols-[30px_1fr_1fr_100px] gap-4 font-bold border-b border-light-dark pb-2">
                    <span>#</span>
                    <span>Título</span>
                    <span>Album</span>
                    <span>Duration</span>
                </div>
            }


            {songs.map((s, i) => (
                <div key={s.id}>
                    <AlbumMusic
                        onSelect={() => handleSelectMusic(s)}
                        album={s.album}
                        artists={s.artists}
                        duration={s.duration}
                        img={s.img}
                        id={s.id}
                        index={i}
                        music={s.music}
                        title={s.title}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Album