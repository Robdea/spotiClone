import { useCurrentMusic } from '../storage/currentMusic';
import PlayButton from './PlayButton'

export default function PlayControlForMobile() {
    const {isPaused, currentAutor,setIsPaused, musicData, setShowPlayControl} = useCurrentMusic()

    return (
        <div
        style={{backgroundColor: currentAutor?.color.accent}}
        className={`flex justify-between px-3 pt-1 rounded-xl cursor-pointer h-full`}>
            <div 
            onClick={setShowPlayControl} 
            className='flex gap-2.5 w-full'>
                <div>
                    <img className='size-10 rounded-xs' src={musicData?.img} alt="" />
                </div>
                
                <div>
                    <h2 className='text-tiny font-medium'>{musicData?.title}</h2>
                    <span className='text-tiny'>{musicData?.artists.join(", ")}</span>
                </div>
            </div>

            <PlayButton
            className='p-0 text-white'
            handlePlay={setIsPaused}
            isPlay={isPaused}
            />
        </div>
  )
}
