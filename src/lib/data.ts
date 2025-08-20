import { colors } from "./colors";

export interface Playlist {
  id: string;
  albumId: string;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
}

export interface Song {
    id: string;
    albumId: string;
    title: string;
    img: string;
    artists: string[];
    album: string;
    duration: string;
    music: string 
}

export const playlist: Playlist[] = [
    {
        id: '1',
        albumId: "lofi",
        cover: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        artists: ["Ezrs2"],
        title: "Lo-fi Music",
        color: colors.blue
    },
    {
        id: '2',
        albumId: "8-bits",
        cover: `${import.meta.env.BASE_URL}/cover/pixel-art-7280249_1280.png`,
        artists: ["PixelEcho"],
        title: "8-bits",
        color: colors.yellow
    },
    {
        id: '3',
        albumId: "nostalgic",
        cover: `${import.meta.env.BASE_URL}/cover/nostalgic.jpeg`,
        artists: ["PixelEcho"],
        title: "Nostalgic",
        color: colors.gray
    },
    {
        id: '4',
        albumId: "retro",
        cover: `${import.meta.env.BASE_URL}/cover/astronaut-2026960_1280.png`,
        artists: ["RetroFlow"],
        title: "Retro",
        color: colors.orange
    },
]

export function searchAlbumById(id: string):Song[] {
    return songs.filter((s) => s.albumId === id)
}


export function getAutorById(id: string): Playlist | undefined {
    return playlist.find((p) => p.albumId === id)
}

export const songs: Song[]= [
    {
        id: '1',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["Luna Waves"],
        duration: "2:02",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Midnight Coffee",
        music: `${import.meta.env.BASE_URL}/music/lofi/chill-lofi-ambient-373046.mp3`
    },
    {
        id: '2',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["Echo Dreams"],
        duration: "2:27",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "s",
        music: `${import.meta.env.BASE_URL}/music/lofi/ambient-lofi-lofi-music-344112.mp3`
    },
    {
        id: '3',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["Kai Breeze"],
        duration: "3:16",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Cloud Drifter",
        music: `${import.meta.env.BASE_URL}/music/lofi/dreamy-lofi-music-380556.mp3`
    },
    {
        id: '4',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["Soft Static"],
        duration: "4:03",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Lazy Sunday",
        music: `${import.meta.env.BASE_URL}/music/lofi/lazy-sunday-chill-lofi-377239.mp3`
    },
    {
        id: '5',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["Juno Sky"],
        duration: "2:28",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Morning Haze",
        music: `${import.meta.env.BASE_URL}/music/lofi/lofi-295209.mp3`
    },
    {
        id: '6',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["Velvet Echo"],
        duration: "3:39",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Window Rain",
        music: `${import.meta.env.BASE_URL}/music/lofi/lofi-background-music-326931.mp3`
    },
    {
        id: '7',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["Nova Mist"],
        duration: "2:20",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Quiet Corners",
        music: `${import.meta.env.BASE_URL}/music/lofi/lofi-background-music-336230.mp3`
    },
    {
        id: '8',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["Aria Moon"],
        duration: "2:43",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Lofi Girl Dreams",
        music: `${import.meta.env.BASE_URL}/music/lofi/lofi-girl-chill-lofi-beats-365953.mp3`
    },
    {
        id: '9',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["NarvA"],
        duration: "2:59",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Moonlit Walk",
        music: `${import.meta.env.BASE_URL}/music/lofi/lofi-girl-lofi-hiphop-beats-328177.mp3`
    },
    {
        id: '29',
        albumId: "lofi",
        album: "Lo-fi Music",
        artists: ["NarvA"],
        duration: "4:00",
        img: `${import.meta.env.BASE_URL}/cover/ai-generated-8649728_1280.jpg`,
        title: "Rainy City Lights",
        music: `${import.meta.env.BASE_URL}/music/lofi/rainy-lofi-city-lofi-music-332746.mp3`
    },
    {
        id: '302',
        albumId: "8-bits",
        album: "8-bits",
        artists: ["PixelEcho"],
        duration: "1:25",
        img: `${import.meta.env.BASE_URL}/cover/pixel-art-7280249_1280.png`,
        title: "Retro Quest",
        music: `${import.meta.env.BASE_URL}/music/8-bits/8-bit-hero-251426.mp3`
    },
    {
        id: '305',
        albumId: "8-bits",
        album: "8-bits",
        artists: ["BitCrush"],
        duration: "5:53",
        img: `${import.meta.env.BASE_URL}/cover/pixel-art-7280249_1280.png`,
        title: "Neon Odyssey",
        music: `${import.meta.env.BASE_URL}/music/8-bits/8-bit-hip-hop-rapbeatzchiptunevideogamepodcast-153463.mp3`
    },
    {
        id: '312',
        albumId: "8-bits",
        album: "8-bits",
        artists: ["SynthWaveX"],
        duration: "1:01",
        img: `${import.meta.env.BASE_URL}/cover/pixel-art-7280249_1280.png`,
        title: "Pixel Runner",
        music: `${import.meta.env.BASE_URL}/music/8-bits/8bit-video-game-music-289970.mp3`
    },
    {
        id: '339',
        albumId: "8-bits",
        album: "8-bits",
        artists: ["Neon Ghosts"],
        duration: "1:12",
        img: `${import.meta.env.BASE_URL}/cover/pixel-art-7280249_1280.png`,
        title: "Arcade Dreams",
        music: `${import.meta.env.BASE_URL}/music/8-bits/a-night-full-of-stars-peaceful-electronic-8-bitpiano-track-321551.mp3`
    },
    {
        id: '399',
        albumId: "8-bits",
        album: "8-bits",
        artists: ["RetroFlow"],
        duration: "1:22",
        img: `${import.meta.env.BASE_URL}/cover/pixel-art-7280249_1280.png`,
        title: "Glitched Reality",
        music: `${import.meta.env.BASE_URL}/music/8-bits/falselyclaimed-bit-beats-3-168873.mp3`
    },
    {
        id: '422',
        albumId: "nostalgic",
        album: "nostalgic",
        artists: ["Luna Waves"],
        duration: "2:43",
        img: `${import.meta.env.BASE_URL}/cover/nostalgic.jpeg`,
        title: "Faded Memories",
        music: `${import.meta.env.BASE_URL}/music/nostalgic/240508-piano-retro-fairytail-239358.mp3`
    },
    {
        id: '305',
        albumId: "nostalgic",
        album: "nostalgic",
        artists: ["NarvA"],
        duration: "2:17",
        img: `${import.meta.env.BASE_URL}/cover/nostalgic.jpeg`,
        title: "Retro Pulses",
        music: `${import.meta.env.BASE_URL}/music/nostalgic/a-piano-to-the-moon-143520.mp3`
    },
    {
        id: '312',
        albumId: "nostalgic",
        album: "nostalgic",
        artists: ["NarvA"],
        duration: "2:24",
        img: `${import.meta.env.BASE_URL}/cover/nostalgic.jpeg`,
        title: "Moonlit Path",
        music: `${import.meta.env.BASE_URL}/music/nostalgic/nostalgic-melancholy-soundscape-364786.mp3`
    },
    {
        id: '339',
        albumId: "nostalgic",
        album: "nostalgic",
        artists: ["Echo Dreams"],
        duration: "2:10",
        img: `${import.meta.env.BASE_URL}/cover/nostalgic.jpeg`,
        title: "Silent Whispers",
        music: `${import.meta.env.BASE_URL}/music/nostalgic/sentimental-piano-piece-380809.mp3`
    },
    {
        id: '399',
        albumId: "nostalgic",
        album: "nostalgic",
        artists: ["NarvA"],
        duration: "2:14",
        img: `${import.meta.env.BASE_URL}/cover/nostalgic.jpeg`,
        title: "Timeless Echo",
        music: `${import.meta.env.BASE_URL}/music/nostalgic/spring-lofi-vibes-lofi-music-340019.mp3`
    },
    {
        id: '4222',
        albumId: "retro",
        album: "retro",
        artists: ["Mira"],
        duration: "2:48",
        img: `${import.meta.env.BASE_URL}/cover/astronaut-2026960_1280.png`,
        title: "Spring Lofi Nights",
        music: `${import.meta.env.BASE_URL}/music/retro/80s-retro-synthwave-186631.mp3`
    },
    {
        id: '3305',
        albumId: "retro",
        album: "retro",
        artists: ["Synth Kid"],
        duration: "3:51",
        img: `${import.meta.env.BASE_URL}/cover/astronaut-2026960_1280.png `,
        title: "Neon Skyline",
        music: `${import.meta.env.BASE_URL}/music/retro/cool-retro-darkwavesynthwave-type-beat-shadows-211527.mp3`
    },
    {
        id: '4312',
        albumId: "retro",
        album: "retro",
        artists: ["NarvA"],
        duration: "2:55",
        img: `${import.meta.env.BASE_URL}/cover/astronaut-2026960_1280.png`,
        title: "Arcade Dreams",
        music: `${import.meta.env.BASE_URL}/music/retro/retro-beat-284125.mp3`
    },
    {
        id: '3539',
        albumId: "retro",
        album: "retro",
        artists: ["NarvA"],
        duration: "4:00",
        img: `${import.meta.env.BASE_URL}/cover/astronaut-2026960_1280.png`,
        title: "Shadow Drive",
        music: `${import.meta.env.BASE_URL}/music/retro/retro-gaming-271301.mp3`
    },
    {
        id: '9399',
        albumId: "retro",
        album: "retro",
        artists: ["NarvA"],
        duration: "2:30",
        img: `${import.meta.env.BASE_URL}/cover/astronaut-2026960_1280.png`,
        title: "Cosmic Pop",
        music: `${import.meta.env.BASE_URL}/music/retro/retro-pop-experiment-146709.mp3`
    },
]

