
export function getAudioDurationInMinutes(duration: number) {
    if(duration){
        const durationSeconds = duration; // en segundos
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return "0:00"
}

