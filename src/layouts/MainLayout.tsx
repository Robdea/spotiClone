import { Link, Outlet } from "react-router";
import PlayBar from "../components/PlayBar";
import { playlist } from "../lib/data";
import MiniCardAlbum from "../components/MiniCardAlbum";
import { useIsMobile } from "../hooks/useIsMobile";

export default function MainLayout() {
    const isMobile = useIsMobile()

    return(
        <div className="main-layout w-full h-full md:p-2 flex">
            {
                !isMobile &&
                <div className="playlist bg-primary rounded-2xl p-2 overflow-clip">    
                        <div className="flex justify-between px-2 items-center">
                            <h2 className="font-medium">Tu biblioteca</h2>
                            <Link to={"/"} className="hover:bg-light-dark p-1.5 rounded-full">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  
                                stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  
                                strokeLinejoin="round"  
                                ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                            </Link>
                        </div>        
                    <ul>
                        {
                            playlist.map((p) => (
                                <li key={p.id} className="hover: hover:bg-light-dark p-2 rounded-xl">
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
             }

            <main className="content bg-primary md:ml-1.5 rounded-xl ">
                <Outlet/>
            </main>
            <PlayBar/>         
        </div>
    )
}