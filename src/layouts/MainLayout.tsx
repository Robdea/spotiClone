import { Outlet } from "react-router";
import PlayBar from "../components/PlayBar";

export default function MainLayout() {
    return(
        <div className="main-layout w-full h-full p-1.5 flex">
            <div className="playlist bg-primary rounded-xl ">
                <h2>Tu biblioteca</h2>
                <ul>
                    <li>Pli</li>
                    <li>pli</li>
                    <li>pli</li>
                </ul>
            </div>

            <main className="content bg-primary ml-1.5 rounded-xl ">
                <Outlet/>
            </main>
            <PlayBar/>         
        </div>
    )
}