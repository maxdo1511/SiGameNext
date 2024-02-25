import {useEffect, useState} from "react";
import Image from "next/image";
import config from "@/app/config";
import SoundPlayer from "@/components/SoundPlayer";

export default function Question({session, SetStage}) {
    const [team, SetCurrentTeam] = useState()
    const [updateSession, SetSession] = useState()

    function handle() {
        fetch(config.question_answered + session.uuid, {
            method: "POST"
        }).then(r => {
            if (r.ok) {
                SetStage("QUESTION_ANS")
            }
        })
    }

    useEffect(() => {
        fetch(config.get_current_team + session.uuid, {
            method: "GET",
            next: {relative: 0},
            cache: 'no-store'
        }).then(async r => {
            const data = await r.json()
            SetCurrentTeam(data)
        })
    })

    useEffect(() => {
        fetch(config.get_session + session.uuid, {
            method: "GET",
            next: {relative: 0},
            cache: 'no-store'
        }).then(async r => {
                if (r.ok) {
                    const data = await r.json();
                    SetSession(data)
                }
            }
        )
    })

    const content = () => {
        switch (updateSession.currentQuestion.questionType) {
            case 'TEXT':
                return (
                    <>
                    </>
                )
            case 'IMAGE':
                return (
                    <div>
                        <Image
                            src={config.question_image + updateSession.currentQuestion.id}
                            alt={"question image"}
                            height={500}
                            width={500}
                            className={"mb-10"}
                        />
                    </div>
                )
            case 'SOUND':
                return (
                    <SoundPlayer id={updateSession.currentQuestion.id} />
                )
        }
    }

    return (
        <>
            {
                updateSession != null &&
                <div className={"flex flex-col items-center pt-20 h-full"}>
                    {
                        team != null &&
                        <div className={"flex flex-row gap-2"}>
                            <h1 className={"text-center text-2xl"}>Отвечает</h1>
                            <h1 className={"text-center text-2xl font-medium"}>{team.name}</h1>
                        </div>
                    }
                    {
                        updateSession.currentQuestion != null &&
                        <>
                            <h2 className={"text-center text-1xl pb-10"}>{"Цена вопроса: " + updateSession.currentQuestion.cost}</h2>
                            <div className={"pb-10 pl-52 pr-52"}>
                                {
                                    updateSession.currentQuestion.title.split("\n").map((row) => (
                                            <h1 key={row} className={"text-center text-3xl"}>{row}</h1>
                                        )
                                    )
                                }
                            </div>
                            {content()}
                        </>
                    }
                    <button onClick={handle} className={"p-2 rounded-2xl bg-pink-400 text-white text-1xl font-medium w-40"}>
                        Открыть ответ
                    </button>
                    <br/>
                </div>
            }
        </>
    )
}