import { Outlet } from "react-router";
import PlayBar from "../components/PlayBar";
import { playlist } from "../lib/data";
import MiniCardAlbum from "../components/MiniCardAlbum";

export default function MainLayout() {

    return(
        <div className="main-layout w-full h-full p-2 flex">
            
            <div className="playlist bg-primary rounded-2xl p-2 overflow-clip">
                <h2>Tu biblioteca</h2>
                <ul>
                    {
                        playlist.map((p) => (
                            <li className="hover: hover:bg-light-dark p-2 rounded-xl">
                                <MiniCardAlbum
                                    albumId={p.albumId}
                                    artists={p.artists}
                                    img={p.cover}
                                    title={p.title}
                                />
                            </li>
                        ))
                    } 
                </ul>
            </div>

            <main className="content bg-primary ml-1.5 rounded-xl ">
                <Outlet/>
            </main>
            <PlayBar/>         
        </div>
    )
}