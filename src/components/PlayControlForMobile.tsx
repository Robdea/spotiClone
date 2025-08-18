import { useCurrentMusic } from '../storage/currentMusic';
import PlayButton from './PlayButton'

interface PlayControlForMobileProps{
    cover: string;
    title: string;
    artists: string[];
}

export default function PlayControlForMobile(props: PlayControlForMobileProps) {
    const {isPaused, currentColor,setIsPaused} = useCurrentMusic()

    return (
        <div 
        style={{backgroundColor: currentColor}}
        className={`flex justify-between px-3 pt-1 rounded-xl`}>
            <div className='flex gap-2.5'>
                <div>
                    <img className='size-10 rounded-xs' src={props.cover} alt="" />
                </div>
                
                <div>
                    <h2 className='text-tiny font-medium'>{props.title}</h2>
                    <span className='text-tiny'>{props.artists.join(", ")}</span>
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
