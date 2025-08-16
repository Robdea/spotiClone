import { useEffect, useRef, useState } from "react";
import { getAudioDurationInMinutes } from "../utils/audioUtils";
import { useCurrentMusic } from "../storage/currentMusic";
import RangeComponent from "./RangeComponent";
import PlayButton from "./PlayButton";

export default function PlayBar(){
    const audioRef = useRef<HTMLAudioElement>(null)
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0)
    const {musicData, setNextSong, setPreviousSong, setIsPaused, isPaused } = useCurrentMusic()
    
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
    }, []);

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

    const handleSeek = (value: number) => {
        console.log(duration);
        setCurrentTime(value);
        if(audioRef.current){
            audioRef.current.currentTime = value
        }
    }

    const [volume, setVolume] = useState(80)
    function handleVolumeChange(value: number) {
        setVolume(value);
        if(audioRef.current){
            audioRef.current.volume = value / 100;
        }
    }

    return(
        <div className="music-play flex justify-between">
            <div className="flex">
                <img src={musicData?.img} alt="" />
                <div>
                    <p>{musicData?.title}</p>
                    <>
                    {musicData?.artists.map((a) => (
                        <p key={a}>{a}</p>
                    ))}</>
                </div>
            </div>
            <div className="flex flex-col">
                <audio 
                ref={audioRef}
                
                src={musicData?.music}></audio>

                <div className="flex flex-row justify-center items-center">
                    <button
                    onClick={setPreviousSong}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg"  
                        width="24"  
                        height="24"  
                        viewBox="0 0 24 24"  
                        fill="none"  
                        stroke="currentColor"  
                        strokeWidth="2"  
                        strokeLinecap="round"  strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M14 6l-6 6l6 6v-12" />
                        </svg>
                    </button>
                    <PlayButton
                        isPlay={isPaused}
                        handlePlay={setIsPaused}
                        className="bg-white"
                    />
                    <button
                    onClick={setNextSong}
                    >
                        <svg  
                        xmlns="http://www.w3.org/2000/svg"  
                        width="24"  height="24"  viewBox="0 0 24 24"  
                        fill="none"  stroke="currentColor"  
                        strokeWidth="2"  
                        strokeLinecap="round"  
                        strokeLinejoin="round"  
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 18l6 -6l-6 -6v12" />
                        </svg>
                    </button>
                </div>
                <div className="flex gap-2.5">
                    {getAudioDurationInMinutes(currentTime)}
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
            <div>
                sonido
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