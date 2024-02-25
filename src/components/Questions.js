import {useEffect, useState} from "react";
import config from "@/app/config";
import "@/styles/Questions.css"

export default function Questions({session, SetStage}){
    const [round, SetRound] = useState(null)
    const [teams, SetTeams] = useState(null)
    const [currentTeam, SetCurrentTeam] = useState()

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

    useState(() => {
        fetch(config.get_teams + session.uuid, {
            method: "GET",
            next: {relative: 0},
            cache: 'no-store'
        }).then(async r => {
            const data = await r.json()
            SetTeams(data)
        })
    })

    function handle(questionId) {
        setTimeout(() => {
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
        }, 500)
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

    return (
        <div className={"pt-10 questions__container"} >
            {
                round != null & currentTeam != null &&
                <>
                    <div className={"flex flex-row pb-5 ml-10 gap-4"}>
                        {
                            teams != null &&
                            teams.map((team) => (
                                <div key={team.uuid}>
                                    {
                                        currentTeam.uuid === team.uuid ?
                                            <div className={""}>
                                                <div className={"bg-pink-300 border-2 border-pink-500 h-28 w-40 rounded p-5"}>
                                                    <h1>{team.name}</h1>
                                                    <h1>{team.owner}</h1>
                                                    <h1>{team.score}</h1>
                                                </div>
                                            </div>
                                            :
                                            <div className={""}>
                                                <div className={"bg-pink-300 h-28 w-40 rounded p-5"}>
                                                    <h1>{team.name}</h1>
                                                    <h1>{team.owner}</h1>
                                                    <h1>{team.score}</h1>
                                                </div>
                                            </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <h1 className={"text-4xl w-full text-pink-500 text-center font-bold round__title"}>{round.name}</h1>
                    <div className={"flex flex-row p-8 items-center gap-8 text-2xl"}>
                        <div className={"flex flex-col gap-4 w-40"}>
                            {
                                round.themes.map((theme) => (
                                    <div key={theme} className={"bg-gray-50 flex flex-col justify-center items-center rounded text-center h-28"}>
                                        {
                                            theme.split("\n").map((line) => (
                                                <h1 key={line} className={"w-full"}>{line}</h1>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className={"grid grid-cols-5 grid-rows-5 gap-4 w-full"}>
                            {
                                round.questionEntities.map((question) => (
                                    <div key={question.id} className={"bg-gray-50 rounded h-28"}>
                                        {
                                            round.questionStatuses[question.id] ?
                                                <button onClick={() => handle(question.id)} className={"w-full h-full hover:shadow-xl focus:animate-ping transition ease-in duration-300"}>
                                                    <h1>{question.cost}</h1>
                                                </button>
                                                :
                                                <button className={"opacity-30 bg-pink-300 w-full h-full"}>
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