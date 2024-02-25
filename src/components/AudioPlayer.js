'use client'

import {useEffect, useRef, useState} from "react";
import config from "@/app/config";
import Image from "next/image";
import down from "@/../public/angle-down.svg"

const AudioPlayer = () => {
    const audioRef = useRef(null);
    const [hidden, SetHidden] = useState(false)
    const [volume, SetVolume] = useState(0.01)

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                const response = await fetch(config.get_music);
                const audioBlob = await response.blob();

                audioRef.current.src = URL.createObjectURL(audioBlob);
            } catch (error) {
                console.error('Ошибка загрузки аудио:', error);
            }
        };

        fetchAudio();
    }, []);

    function play() {
        audioRef.current.play()
        SetHidden(true)
    }

    return (
        <>
            <button onClick={() => {
                setTimeout(() => {
                    play()
                }, 500)
            }} hidden={hidden} className={"bg-pink-400 text-white text-center w-full focus:animate-ping"}>
                <h1>Включить музыку</h1>
                <audio ref={audioRef} autoPlay={true} loop={true} onPlay={(e) => {
                    e.target.volume = volume
                }} onEnded={() => {
                    SetHidden(false)
                }}/>
            </button>
            <div className={"absolute"} hidden={!hidden}>
                <Image src={down} alt={"down icon"} width={20} height={20} className={"ml-5"} onClick={() => {
                    setTimeout(() => {
                        SetHidden(false)
                    }, 300)
                    audioRef.current.pause()
                }}/>
            </div>
        </>
    );
};

export default AudioPlayer;