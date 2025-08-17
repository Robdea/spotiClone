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
        <aside className="music-play flex justify-center">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3 flex-1 text-tiny">
                    <img className="size-17 rounded-xl" src={musicData?.img} alt="" />
                    <div>
                        <p><strong>{musicData?.title}</strong></p>
                        <>
                        {musicData?.artists.map((a) => (
                            <p className="text-light-gray" key={a}>{a}</p>
                        ))}</>
                    </div>
                </div>

                <div className="flex flex-col flex-4 items-center gap-1.5">
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
        </aside>
    )
}