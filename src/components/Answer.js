import config from "@/app/config";
import {useEffect, useState} from "react";

export default function Answer({session, SetStage}) {

    const [updateSession, SetSession] = useState()

    function handle(isTrue) {
        fetch(config.question_result, {
            method: "POST",
            body: JSON.stringify(
                {
                    "uuid": session.uuid,
                    "isTrue": isTrue
                }
            ),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(r => {
            if (r.ok) {
                SetStage("QUESTION_SELECTION")
            }
        })
    }

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

    return (
        <>
            {
                updateSession != null &&
                <div className={"flex flex-col items-center pt-20 h-full"}>
                    {
                        updateSession.currentQuestion != null &&
                        <>
                            <h1 className={"text-center text-3xl"}>Правильный ответ:</h1>
                            <h1 className={"text-center text-2xl"}>{updateSession.currentQuestion.answer}</h1>
                        </>
                    }
                    <br/>
                    <div className={"flex flex-row gap-5"}>
                        <button onClick={() => handle(true)} className={"p-2 rounded-2xl bg-green-700 w-40"}>
                            Верно
                        </button>
                        <button onClick={() => handle(false)} className={"p-2 rounded-2xl bg-red-700 w-40"}>
                            Неверно
                        </button>
                    </div>
                    <br/>
                </div>
            }
        </>
    )
}