import { Link } from "react-router"
import PlayButton from "./PlayButton"
import { useState } from "react"
import { searchAlbumById } from "../lib/data";
import { useCurrentMusic } from "../storage/currentMusic";

interface CardMusicProps{
    img: string,
    artists: string[],
    title: string,
    albumId: string
}

function CardMusic(props: CardMusicProps) {
    const [showPlayBttn, setShowPlayBttn] = useState(false);

    const {setStringSong, musicData, isAlbumActive, setIsPaused, setRestart} = useCurrentMusic()
    
    async function handlePlayAlbum() {
        if(musicData === null || props.albumId !== musicData.albumId){
            setRestart()
            const res = await searchAlbumById(props.albumId);
            setStringSong(res);
        }else{
            setIsPaused()        
        }
    }

    return (
      <div 
      onMouseEnter={() => setShowPlayBttn(true)}
      onMouseLeave={() => setShowPlayBttn(false)}
      className="w-44 p-3 hover: hover:bg-light-dark rounded-xl relative">
        <Link to={`album/${props.albumId}`}>
            <div className="h-11/12">
                <img 
                className="h-full object-cover rounded-xl"
                src={props.img} alt={"Imagen del album" + props.title} />
                
            </div>
            <div className="text-light-gray">
                {props.artists.map((artist) =>(
                    <span key={artist}>{artist}</span>
                ))}
            </div>
        </Link>
        {showPlayBttn && (
            <div className="absolute top-28 right-5 z-20">
                <PlayButton
                className="bg-green"
                    handlePlay={handlePlayAlbum}
                    isPlay={isAlbumActive(props.albumId)}
                />
            </div>
        )}
      </div>
    )
  
}

export default CardMusic