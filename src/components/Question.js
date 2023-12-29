import {useEffect, useState} from "react";
import Image from "next/image";
import config from "@/app/config";

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
                        />
                    </div>
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
                        <h1 className={"text-center text-2xl"}>{"Отвечает " + team.name}</h1>
                    }
                    {
                        updateSession.currentQuestion != null &&
                        <>
                            <h2 className={"text-center text-1xl"}>{"Цена вопроса: " + updateSession.currentQuestion.cost}</h2>
                            <br/>
                            <h1 className={"text-center text-3xl"}>{updateSession.currentQuestion.title}</h1>
                            {content()}
                        </>
                    }
                    <br/>
                    <button onClick={handle} className={"p-2 rounded-2xl bg-fuchsia-700 w-40"}>
                        Открыть ответ
                    </button>
                    <br/>
                </div>
            }
        </>
    )
}