'use client'
import {useEffect, useState} from "react";

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    })

    useEffect(() => {
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener("resize", handelResize)

        handelResize()

        return () => window.removeEventListener("resize", handelResize)
    }, [])

    return windowSize
}