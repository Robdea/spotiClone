import { useEffect, useState } from "react";
import CardMusic from "../components/CardMusic"
import { playlist} from "../lib/data"

export default function Home() {
    const [currentDate, setCurrentDate] = useState("");

    function momentoDelDiaMexico(): string {
        const opciones: Intl.DateTimeFormatOptions = {
            timeZone: "America/Mexico_City",
            hour: "numeric"
        };

        const hora = parseInt(
            new Intl.DateTimeFormat("es-MX", opciones).format(new Date())
        );

        if (hora >= 5 && hora < 12) {
            return "Buenos días";
        } else if (hora >= 12 && hora < 19) {
            return "Buenas tardes";
        } else if (hora >= 19 && hora < 23) {
            return "Buenas noches";
        } else{
            return "Hola"
        }
    }

    useEffect(() => {
        const date = momentoDelDiaMexico();

        setCurrentDate(date)
        console.log(date);

    }, []);


    return(
        <div className="flex flex-col">
            <div className="p-3 bg-linear-to-bl h-19 from-gray-300 to-primary md:rounded-t-2xl">
                <h2 className="text-2xl font-medium">
                    {currentDate}
                </h2>
            </div>
            <div className="flex gap-2 p-3 flex-wrap md:justify-start justify-center">
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
        </div>
    )    
}