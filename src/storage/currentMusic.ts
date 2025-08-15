import { create } from "zustand";


type MusicData = {
    albumId: string,
    album: string,
    artists: string[],
    duration: string,
    img: string,
    title: string,
    music: string
}

interface MusicState {
    musicData: MusicData | null;
    setSong: (songData: MusicData) => void;
}

export const useCurrentMusic = create<MusicState>((set) =>({
    musicData: null,
    setSong: (songData) =>{
        set({musicData: songData})
        
    }
}))
