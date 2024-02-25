import {useEffect, useState} from "react";
import config from "@/app/config";

export default function End({session, SetStage}) {
    const [winner, SetWinner] = useState(null)

    useEffect(() => {
        fetch(config.get_winner + session.uuid, {
            method: "GET",
            next: {relative: 0},
            cache: 'no-store'
        }).then(async r => {
            const data = await r.json();
            SetWinner(data)
        })
    }, []);

    return (
        <div className={"w-full h-full pt-10 pb-10"}>
            {
                winner != null &&
                <div className={"w-full h-full text-center"}>
                    <div className={"w-full h-full flex flex-col justify-center items-center"}>
                        <h1 className={"text-2xl"}>Победила команда</h1>
                        <br />
                        <div className={"p-4 rounded-2xl bg-pink-400 w-1/4"}>
                            <h1 className={"text-2xl text-white font-bold underline"}>{winner.name}</h1>
                            <div className={"pt-2"}>
                                {
                                    winner.members.map((member) => (
                                        <h1 key={member}>{member}</h1>
                                    ))
                                }
                            </div>
                            <h1 className={"text-white font-medium"}>{"С количестовом очков: "}</h1>
                            <h1 className={"text-white font-bold"}>{winner.score}</h1>
                        </div>
                        <br/>
                        <h1 className={"text-2xl"}>ПОЗДРАВЛЯЕМ!!!</h1>
                    </div>
                    <div className={"relative w-full items-end justify-end pt-5 pr-5 flex"}>
                        <button className={"p-2 rounded-2xl bg-pink-300 hover:bg-pink-400 w-40 hover:translate-x-2"}>
                            {"Статистика >"}
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}