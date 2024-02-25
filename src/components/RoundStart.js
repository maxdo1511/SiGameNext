import config from "@/app/config";
import {useEffect, useState} from "react";
import TeamsComponent from "@/components/TeamsComponents";

export default function RoundStart({session, SetStage}) {
    const [round, SetRound] = useState(null)

    useEffect(() => {
        fetch(config.get_round + session.uuid, {
            method: "GET",
            next: {relative: 0},
            cache: 'no-store'
        }).then(async r => {
            const data = await r.json()
            SetRound(data)
        })
    })

    function handle() {
        SetRound("QUESTION_SELECTION")
    }

    return (
        <>
            {
                round != null &&
                <div className={"absolute w-1/2 h-2/3 flex flex-col items-end justify-end"}>
                    <div className={"pb-10"}>
                        <h1 className={"text-3xl font-bold w-full text-center"}>{round.name}</h1>
                        <br/>
                        <TeamsComponent items={round.themes} />
                    </div>
                    <button onClick={handle} className={"bg-pink-300 rounded p-4 w-32 hover:bg-pink-400"}>
                        К раунду
                    </button>
                </div>
            }
        </>
    )
}