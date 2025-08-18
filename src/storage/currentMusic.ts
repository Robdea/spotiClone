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
    currentColor: string;
    setColor: (color: string) => void;
    setSong: (songData: MusicData, album?:MusicData[]) => void;
    setStringSong: (stringSong: MusicData[]) => void;
    setNextSong: () => void;
    setPreviousSong: () => void;
    setIsPaused: () => void;
    setRestart: ()=> void;
    isAlbumActive: (albumId: string) => boolean;
    currentSong: (id: string) => boolean;
}

export const useCurrentMusic = create<MusicState>((set, get) =>({
    musicData: null,
    stringOfSongs: [],
    current:0,
    currentColor: "#121212",
    isPaused: false,
    setColor:(color) =>{
        set({currentColor:color })
    },
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
    setRestart: () =>{
        set({current: 0})
    },
    setSong: (songData, album) =>{
        set((state) => {
            if(state.stringOfSongs.length > 0 && state.musicData?.albumId === songData.albumId){
                const indexSong = state.stringOfSongs.findIndex((s) => s.id === songData.id);
                return {
                    musicData: state.stringOfSongs[indexSong],
                    current: indexSong
                } 
            }
            const indexSong = album?.findIndex((s) => s.id === songData.id) ?? 0;
            return{
                stringOfSongs: album ?? [],
                musicData: songData,
                current: indexSong,
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
    },
    isAlbumActive: (albumId) =>{
        const {musicData, isPaused} = get();
        return musicData !== null && musicData.albumId === albumId && isPaused
    },
    currentSong: (id) =>{
        const {musicData} = get();

        return musicData !== null && musicData.id === id 
    }
}))
