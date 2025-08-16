import { create } from "zustand";


type MusicData = {
    albumId: string,
    album: string,
    artists: string[],
    duration: string,
    img: string,
    title: string,
    music: string,
    id: string
}

interface MusicState {
    musicData: MusicData | null;
    stringOfSongs: MusicData[];
    current: number;
    isPaused: boolean;
    setSong: (songData: MusicData, album?:MusicData[]) => void;
    setStringSong: (stringSong: MusicData[]) => void;
    setNextSong: () => void;
    setPreviousSong: () => void;
    setIsPaused: () => void;
}

export const useCurrentMusic = create<MusicState>((set) =>({
    musicData: null,
    stringOfSongs: [],
    current:0,
    isPaused: false,
    setStringSong: (stringSong) =>{
        set((state) =>({ 
            stringOfSongs: stringSong,
            musicData: stringSong[state.current],
            isPaused: true
        }));
    },
    setIsPaused: () =>{
        set((state) => ({
            isPaused: !state.isPaused
        }))
    },
    setSong: (songData, album) =>{
        set((state) => {
            if(state.stringOfSongs.length > 0){
                const indexSong = state.stringOfSongs.findIndex((s) => s.id === songData.id);
                return {
                    musicData: state.stringOfSongs[indexSong],
                    current: indexSong
                } 
            }else{
                const indexSong = album?.findIndex((s) => s.id === songData.id);
                return{
                    stringOfSongs: album,
                    musicData: songData,
                    current: indexSong,
                }
            }
        })
    },
    setNextSong: () =>{
        set((state) => {
            const nextIndex = (state.current + 1) % state.stringOfSongs.length;
            return {
                current: nextIndex,
                musicData: state.stringOfSongs[nextIndex],
                isPaused: true, 
            };
        });  
    },
    setPreviousSong: ()=>{
        set((state) => {
            const prevIndex = (state.current -1 + state.stringOfSongs.length) % state.stringOfSongs.length
            return {
                current: prevIndex,
                musicData: state.stringOfSongs[prevIndex],
                isPaused: true, 
            };
        });   
    }
}))
