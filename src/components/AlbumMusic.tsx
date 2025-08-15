
interface AlbumMusicProps{
    img: string,
    artists: string[],
    title: string,
    music: string,
    album: string,
    duration: string
    index: number, 
    onSelect: () => void
}

export default function AlbumMusic (props: AlbumMusicProps){

    return (
        <div 
        onClick={props.onSelect}
        className="w-full flex justify-between">
            <div className="flex gap-2.5">
                <span>{props.index + 1}</span>
                <div className="flex">
                    <img className="size-10" src={props.img} alt="" />
                    <div>
                        <div>
                            <span>{props.title}</span>
                        </div>
                        <div>
                            {props.artists.map((p) => (
                                <span key={p}>{p}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <span>{props.album}</span>
            </div>
            <div>{props.duration}</div>
        </div>
    )

}
