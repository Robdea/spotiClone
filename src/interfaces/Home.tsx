import CardMusic from "../components/CardMusic"
import { playlist} from "../lib/data"

export default function Home() {
        
    return(
        <div className="flex gap-2 p-3 flex-wrap">
            {playlist.map((play) => (
                <CardMusic
                    artists={play.artists}
                    img={play.cover}
                    title={play.title}
                    key={play.id}
                    albumId={play.albumId}
                />
            ))}        
        </div>
    )    
}