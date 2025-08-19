import { useEffect, useRef, useState } from "react";
import { getAudioDurationInMinutes } from "../utils/audioUtils";
import { useCurrentMusic } from "../storage/currentMusic";
import RangeComponent from "./RangeComponent";
import PlayButton from "./PlayButton";
import Previous from "./Previous";
import Next from "./Next";
import HomeIcon from "./HomeIcon";
import BooksIcon from "./BooksIcon";
import { useIsMobile } from "../hooks/useIsMobile";
import PlayControlForMobile from "./PlayControlForMobile";
import { Link } from "react-router";

export default function PlayBar(){
    const audioRef = useRef<HTMLAudioElement>(null)
    // const [currentTime, setCurrentTime] = useState(0);
    // const [] = useState(0)
    const {musicData, setNextSong, handleSeek, setPreviousSong, setIsPaused, isPaused, setCurrentTime, currentTime, duration, setDuration } = useCurrentMusic()
    
    useEffect(() => {
        if(!audioRef.current) return
        if (isPaused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPaused, musicData]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        setDuration(audio.duration)
        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };
        const updateDuration = () =>{
            setDuration(audio.duration);
        }
        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
        };
    }, [setCurrentTime, setDuration]);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;
        const handleEnded = () => {
            setNextSong();
        }

        audio.addEventListener("ended", handleEnded);
        return() =>{
            audio.removeEventListener("ended", handleEnded);
        }
    },[setNextSong]);

    // const handleSeek = (value: number) => {
    //     console.log(duration);
    //     setCurrentTime(value);
    //     if(audioRef.current){
    //         audioRef.current.currentTime = value
    //     }
    // }

    const [volume, setVolume] = useState(80)
    function handleVolumeChange(value: number) {
        setVolume(value);
        if(audioRef.current){
            audioRef.current.volume = value / 100;
        }
    }

    const isMobile = useIsMobile()

    return(
        <aside className="music-play z-90 md:bg-black md:pt-2.5 md:pb-0 pb-30 ">
            <audio ref={audioRef} src={musicData?.music}></audio>
            {
                isMobile ? 
                (
                    <div className="grid grid-rows-2">
                        <div className="h-full">
                            { musicData &&
                                <div className="bg-black h-full px-2">
                                    <PlayControlForMobile 
                                    />
                                    <div className="px-1">
                                        <RangeComponent
                                            limit={duration}
                                            start={0}
                                            step={0.1}
                                            value={currentTime}
                                            onChange={handleSeek}
                                            hiddenDot={true}
                                        />
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="pt-3 h-full w-full flex justify-center gap-30 bg-black ">
                            <div className="flex items-center flex-col">
                                <Link to={"/"}>
                                    <HomeIcon/>
                                    <span className="text-small text-light-gray">Inicio</span>
                                </Link>
                            </div>
                            <div className="flex items-center flex-col">
                                <BooksIcon/>
                                <span className="text-small text-light-gray">Tu biblioteca</span>
                            </div>
                        </div>
                    </div>
                )
                : 
                (
                <div className="flex justify-between items-center w-full">

                    <div className="flex items-center gap-3 flex-1 text-tiny">
                        
                        { musicData && 
                            (
                                <>
                                    <img className="size-17 rounded-xl" src={musicData?.img} alt="" />
                                    
                                    <div>
                                        <p><strong>{musicData?.title}</strong></p>
                                        <span>{musicData?.artists.join(", ")}</span>
                                    </div>
                                </>   
                            )
                        }
                    </div>

                    <div className="flex flex-col flex-4 items-center gap-1.5">
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <button
                            disabled={!musicData}
                            onClick={setPreviousSong}
                            >
                                <Previous/>
                            </button>
                            <PlayButton
                                isPlay={isPaused}
                                handlePlay={setIsPaused}
                                className="bg-white"
                                disabled={!musicData}
                            />
                            <button
                            onClick={setNextSong}
                            disabled={!musicData}
                            >
                                <Next/>
                            </button>
                        </div>
                        <div className="flex gap-2.5 w-2/3 items-center text-tiny">
                            <span>
                                {getAudioDurationInMinutes(currentTime)}
                            </span>
                            <RangeComponent
                                limit={duration}
                                start={0}
                                step={0.1}
                                value={currentTime}
                                onChange={handleSeek}
                            />
                            <span>
                                {musicData ? getAudioDurationInMinutes(duration) : "0:00"}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/12 flex ">
                        <RangeComponent
                            limit={100}
                            start={0}
                            value={volume}
                            step={1}
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>
                )
            }
        </aside>
    )
}