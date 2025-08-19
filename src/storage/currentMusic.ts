import { create } from "zustand";
import { colors } from "../lib/colors";

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

type Autor = {
    title: string;
    color: (typeof colors)[keyof typeof colors];
}

interface MusicState {
    musicData: MusicData | null;
    stringOfSongs: MusicData[];
    current: number;
    isPaused: boolean;
    currentAutor: Autor | null;
    showPlayControl: boolean;
    setShowPlayControl: ( )=> void;
    setSong: (songData: MusicData, album?:MusicData[]) => void;
    setStringSong: (stringSong: MusicData[]) => void;
    setNextSong: () => void;
    setPreviousSong: () => void;
    setIsPaused: () => void;
    setRestart: ()=> void;
    isAlbumActive: (albumId: string) => boolean;
    currentSong: (id: string) => boolean;
    setCurrentAutor: (autor: Autor) => void,
    setCurrentTime: (time: number)=> void;
    currentTime: number;
    duration: number;
    handleSeek: (value: number) => void;
    setDuration: (d: number) => void;
}

export const useCurrentMusic = create<MusicState>((set, get) =>({
    musicData: null,
    stringOfSongs: [],
    duration: 0,
    current:0,
    isPaused: false,
    currentAutor: null,
    showPlayControl: false,
    currentTime: 0,
    setCurrentTime: (time) =>{
        set({currentTime: time})
    },
    handleSeek: (value: number) => {
        const audio = document.querySelector("audio") as HTMLAudioElement | null
        if (!audio) return
        audio.currentTime = value
        set({ currentTime: value })
    },
    setDuration: (d) =>{
        set({duration: d})
    },
    setCurrentAutor: (autor: Autor) => {
      set({ currentAutor: autor })
    },
    setShowPlayControl: ()=>{
        set((state) =>({showPlayControl: !state.showPlayControl}))
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
