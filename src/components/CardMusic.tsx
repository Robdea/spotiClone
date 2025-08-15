import { Link } from "react-router"


interface CardMusicProps{
    img: string,
    artists: string[],
    title: string,
    albumId: string
}

function CardMusic(props: CardMusicProps) {

    return (
      <div className="w-44 p-3 hover: hover:bg-light-dark rounded-xl">
        <Link to={`album/${props.albumId}`}>
            <div className="h-11/12">
                <img 
                className="h-full object-cover rounded-xl"
                src={props.img} alt={"Imagen del album" + props.title} />
            </div>
            <div className="text-light-gray">
                {props.artists.map((artist) =>(
                    <span key={artist}>{artist}</span>
                ))}
            </div>
        </Link>
      </div>
    )
  
}

export default CardMusic