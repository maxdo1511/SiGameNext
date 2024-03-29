'use client'

import Image from 'next/image'
import config from "@/app/config";
import Game from "@/components/Game";
import {useEffect, useState} from "react";
import CreateTeams from "@/components/CreateTeams";
import RoundStart from "@/components/RoundStart";
import Questions from "@/components/Questions";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import treeImage from "../../../public/tree.png"
import End from "@/components/End";


export default function Home() {

    function createSession() {
        fetch(config.create_session, {
            method: "POST",
            body: JSON.stringify({"maxQuestionAnsTime": 10}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async r => {
            const data = await r.json();
            localStorage.setItem("session_uuid", data.uuid)

            fetch(config.get_session + data.uuid, {
                method: "GET",
                next: {relative: 0},
                cache: 'no-store'
            }).then(async r => {
                    const data = await r.json();
                    SetSession(data)
                    SetStage(data.stage)
                }
            )
        })
    }

    function getSession() {
        fetch(config.get_session + localStorage.getItem("session_uuid"), {
            method: "GET",
            next: {relative: 0},
            cache: 'no-store'
        }).then(async r => {
                if (r.ok) {
                    const data = await r.json();
                    SetSession(data)
                    SetStage(data.stage)
                }else {
                    createSession()
                }
            }
        )
    }

    useEffect(() => {
        if (localStorage.getItem("session_uuid") != null) {
            getSession()
            return
        }
        createSession()
    }, [])

    const [stage, SetStage] = useState("GAME_SELECTION")
    const [data, SetData] = useState(null)
    const [session, SetSession] = useState(null)

    useEffect(() => {
        fetch(config.get_games, {
            method: "GET",
            next: {relative: 0},
            cache: 'no-store'
        }).then(async r => {
                const data = await r.json();
                SetData(data)
            }
        )
    }, [])

    const selectScreen = () => {
        switch(stage) {
            case 'GAME_SELECTION':
                return (
                    data != null &&
                    data.map((game) => (
                        <div className={"p-5"} key={game.id}>
                            <Game game={game} selector={SetStage} uuid={localStorage.getItem("session_uuid")}/>
                        </div>
                    ))
                )
            case 'TEAMS_INIT':
                return (
                    session != null &&
                        <CreateTeams session={session} SetStage={SetStage}/>
                )
            case 'ROUND_START':
                return (
                    session != null &&
                        <RoundStart session={session} SetStage={SetStage} />
                )
            case "QUESTION_SELECTION":
                return (
                    session != null &&
                        <Questions session={session} SetStage={SetStage} />
                )
            case "QUESTION":
                return (
                    session != null &&
                        <Question session={session} SetStage={SetStage} />
                )
            case "QUESTION_ANS":
                return (
                    session != null &&
                        <Answer session={session} SetStage={SetStage} />
                )
            case "RESULT":
                return (
                    session != null &&
                        <End session={session} SetStage={SetStage} />
                )
        }
    }

    const RenderImage = () => {
        return (
            <Image
                src={treeImage}
                alt={"tree image"}
                width={200}
                height={600}
                className={"absolute ml-10 mt-3"}
            />
        )
    }

    return (
        <div className={"container h-full bg-pink-200 rounded-b-2xl"}>
            {
                selectScreen()
            }
        </div>
    )
}
