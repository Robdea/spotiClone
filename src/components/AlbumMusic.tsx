import { useState } from "react";
import PlayButton from "./PlayButton"
import { useCurrentMusic } from "../storage/currentMusic";
import { useIsMobile } from "../hooks/useIsMobile";

interface AlbumMusicProps{
    img: string,
    artists: string[],
    title: string,
    music: string,
    album: string,
    duration: string,
    id: string,
    index: number, 
    onSelect: () => void
}

export default function AlbumMusic (props: AlbumMusicProps){

    const {currentSong, isPaused}= useCurrentMusic()

    const isMobile = useIsMobile();

    const [showPlayBttn, setShowPlayBttn] = useState(false);

    return (
        <div 
        onMouseEnter={() => setShowPlayBttn(true)}
        onMouseLeave={() => setShowPlayBttn(false)}
        onClick={props.onSelect}
        className="grid md:grid-cols-[30px_1fr_1fr_100px] grid-cols-1 gap-4 items-center py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            { !isMobile &&
                <div>
                    {
                        showPlayBttn ? (
                            <PlayButton    
                            isPlay={currentSong(props.id) && isPaused} 
                            className={`${currentSong(props.id) ? 'text-green' : 'text-white'}`}
                            />
                        ): (
                            <div className={`${currentSong(props.id) && 'text-green'}`}>
                                <>
                                    { currentSong(props.id) && isPaused ? 
                                        <div>
                                            <svg  xmlns="http://www.w3.org/2000/svg"  
                                            width="24"  
                                            height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
                                            strokeWidth="2"  strokeLinecap="round"  
                                            strokeLinejoin="round" 
                                            className="text-green" 
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M4 20h3" /><path d="M17 20h3" /><path d="M10.5 20h3" /><path d="M4 16h3" /><path d="M17 16h3" /><path d="M10.5 16h3" /><path d="M4 12h3" /><path d="M17 12h3" /><path d="M10.5 12h3" /><path d="M4 8h3" /><path d="M17 8h3" /><path d="M4 4h3" />
                                            </svg>
                                            
                                        </div>
                                    : 
                                        <span>{props.index + 1}</span>
                                    }
                                </>
                            </div>
                        )
                    }
                </div>
            }


            <div className="flex gap-2.5">
                <div className="flex items-center gap-3">
                    <img className="size-10 rounded-xs" src={props.img} alt="" />
                    <div>
                    
                        <span className={`font-medium ${currentSong(props.id) && 'text-green'}`}>{props.title}</span>
                        <div>
                            <span className="text-light-gray">{props.artists.join(", ")}</span>
                        </div>
                    </div>
                </div>
            </div>

            {   !isMobile &&
                <>
                    <div>
                        <span>{props.album}</span>
                    </div>
                    <div>{props.duration}</div>
                </>
            }
        </div>
    )

}
