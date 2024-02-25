'use client'

import {useEffect, useRef} from "react";
import config from "@/app/config";

const SoundPlayer = ({id}) => {
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                const response = await fetch(config.get_audio + id);
                const audioBlob = await response.blob();

                audioRef.current.src = URL.createObjectURL(audioBlob);
            } catch (error) {
                console.error('Ошибка загрузки аудио:', error);
            }
        };

        fetchAudio();
    }, [id]);

    return (
        <audio className={"mb-10"} ref={audioRef} controls={true} autoPlay={false} loop={false}/>
    );
};

export default SoundPlayer;