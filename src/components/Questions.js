import {useState} from "react";
import config from "@/app/config";

export default function Questions({session, SetStage}){
    const [round, SetRound] = useState(null)

    useState(() => {
        fetch(config.get_round + session.uuid, {
            method: "GET",
            next: {relative: 0},
            cache: 'no-store'
        }).then(async r => {
            const data = await r.json()
            SetRound(data)
        })
    })

    function handle(questionId) {
        fetch(config.select_question, {
            method: "POST",
            body: JSON.stringify(
                {
                    "uuid": session.uuid,
                    "questionId": questionId
                }
            ),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(r => {
            if (r.ok) {
                SetStage("QUESTION")
            }
        })
    }

    return (
        <div className={"pt-10"}>
            {
                round != null &&
                <>
                    <h1 className={"text-4xl w-full text-center"}>{round.name}</h1>
                    <div className={"flex flex-row p-8 items-center gap-8 text-2xl"}>
                        <div className={"flex flex-col gap-4 w-40"}>
                            {
                                round.themes.map((theme) => (
                                    <div key={theme} className={"bg-gray-50 flex items-center rounded text-center h-40"}>
                                        <h1 className={"w-full"}>{theme}</h1>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={"grid grid-cols-5 grid-rows-5 gap-4 w-full"}>
                            {
                                round.questionEntities.map((question) => (
                                    <div key={question.id} className={"bg-gray-50 rounded h-40"}>
                                        {
                                            round.questionStatuses[question.id] ?
                                                <button onClick={() => handle(question.id)} className={"w-full h-full"}>
                                                    <h1>{question.cost}</h1>
                                                </button>
                                                :
                                                <button className={"opacity-30 w-full h-full"}>
                                                    <h1>{question.cost}</h1>
                                                </button>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}