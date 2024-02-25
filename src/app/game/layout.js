import AudioPlayer from "@/components/AudioPlayer";

export default function GameLayout({ children }) {
    return (
        <>
            <div>
                <AudioPlayer />
            </div>
            <div>
                {children}
            </div>
        </>
    )

}