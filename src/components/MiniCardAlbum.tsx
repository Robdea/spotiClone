import { Link } from "react-router";
import PlayButton from "./PlayButton";
import { useCurrentMusic } from "../storage/currentMusic";
import { searchAlbumById } from "../lib/data";
import { useState } from "react";

interface MiniCardAlbumProps{
    img: string,
    artists: string[],
    title: string,
    albumId: string
}

export default function MiniCardAlbum(props: MiniCardAlbumProps) {
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
        className="flex gap-2  items-center">
            <div className="size-13 relative">
                { showPlayBttn && (
                    <div className="absolute size-full rounded-xl bg-transparent-dark">
                        <PlayButton
                        className="text-white flex size-full justify-center"
                        isPlay={isAlbumActive(props.albumId)}
                        handlePlay={handlePlayAlbum}
                        />
                    </div>
                    )
                }
                <img className="rounded-xl" src={props.img} alt="" />
            </div>

            <div>
                <Link to={`album/${props.albumId}`}>
                    <h3>{props.title}</h3>
                </Link>
            </div>
        </div>
    )
}
