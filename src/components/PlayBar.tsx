import { useEffect, useRef, useState } from "react";
import { getAudioDurationInMinutes } from "../utils/audioUtils";
import { useCurrentMusic } from "../storage/currentMusic";
import RangeComponent from "./RangeComponent";

export default function PlayBar(){
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlay, setIsPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0)
    const {musicData} = useCurrentMusic()
    
    useEffect(() => {
        console.log(audioRef.current?.volume);
        if (isPlay) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlay]);

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

    const handleSeek = (value: number) => {
        console.log(duration);
        setCurrentTime(value);
        if(audioRef.current){
            audioRef.current.currentTime = value
        }
    }

    function handlePlay() {
        setIsPlay(prev => !prev);
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
                <button
                onClick={handlePlay}
                className="p-5 bg-amber-200"
                >
                    play
                </button>
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