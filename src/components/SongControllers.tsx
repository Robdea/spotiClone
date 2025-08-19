import Previous from './Previous'
import PlayButton from './PlayButton'
import Next from './Next'
import { useCurrentMusic } from '../storage/currentMusic'
import { useEffect } from 'react'
import { getAudioDurationInMinutes } from '../utils/audioUtils'
import RangeComponent from './RangeComponent'
// import RangeComponent from './RangeComponent'

export default function SongControllers() {
    const {musicData, duration, setShowPlayControl, setPreviousSong, setNextSong, setIsPaused, isPaused, currentAutor, currentTime, handleSeek} = useCurrentMusic()

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
        document.body.style.overflow = ""
        }
    }, [])

  return (
    <div 
    style={{
  background: `linear-gradient(to bottom, ${currentAutor?.color.accent}, ${currentAutor?.color.dark} 30%, #171717 100%)`
    }} 
    className='fixed w-full h-full z-200 top-0 p-4.5'>
        <div className='flex'>
            <button onClick={setShowPlayControl}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            <div className='flex justify-center w-full font-medium'>
                <h2>{currentAutor?.title}</h2>
            </div>
        </div>
        <div className='mt-13 mb-10'>
            <div className="flex justify-center mb-5">
                <img  className="size-56 shadow-2xl" src={musicData?.img} alt="" />
            </div>
            
            <div className="flex flex-col font-medium">
                <h3 className='text-2xl'>{musicData?.title}</h3>
                <span className="text-tiny text-light-gray">{musicData?.artists.join(", ")}</span>
            </div>
        </div>

        <div className='px-1 mb-5'>
            <RangeComponent
                limit={duration}
                start={0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                hiddenDot={true}
            />
            <div className='flex justify-between text-light-gray mt-3 text-tiny'>
                <span>
                    {getAudioDurationInMinutes(currentTime)}        
                </span>
                <span>
                    {musicData?.duration}
                </span>
            </div>
        </div>

        <div className="flex justify-center items-center gap-10">
            <button onClick={setPreviousSong}>
                <Previous />
            </button>
            <PlayButton
                handlePlay={setIsPaused}
                isPlay={isPaused}
                className='text-black bg-white'
            />
            <button onClick={setNextSong}>
                <Next/>
            </button>
        </div>
    </div>
  )
}
