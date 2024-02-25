import config from "@/app/config";
import {useState} from "react";
import '@/styles/CreateTeam.css'

export default function CreateTeams({session, SetStage}) {
    const [teams, SetTeams] = useState([])

    var team = {
        "uuid": "",
        "name": "",
        "members": []
    }

    useState(() => {
        if (teams.length <= 0) {
            fetch(config.get_teams + session.uuid, {
                    method: "GET",
                    next: {relative: 0},
                    cache: 'no-store'
            }).then(async r => {
                const data = await r.json();
                SetTeams(data)
            })
        }
    })

    function handle() {
        team.uuid=session.uuid
        fetch(config.add_team, {
            method: "POST",
            body: JSON.stringify(team),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(r => {
            if (r.ok) {
                SetTeams([...teams, team])
                team = {
                    "uuid": "",
                    "name": "",
                    "members": []
                }
            }
        })
    }

    function start() {
        fetch(config.start_game + session.uuid, {
            method: "POST"
        }).then((r) => {
            if (r.ok) {
                SetStage("ROUND_START")
                setTimeout(() => {
                    SetStage("QUESTION_SELECTION")
                }, 10000)
            }
        })
    }

    return (
        <div className={"flex flex-col items-center pl-10 pr-10"}>
                <div className={"flex flex-row pt-5 w-full items-start gap-4"}>
                    {
                        teams.length > 0 &&
                        teams.map((team) => (
                            <div className={"h-full"} key={team.name}>
                                <div className={"h-full p-5 flex flex-col bg-pink-300 rounded-2xl"}>
                                    <h1 className={"text-2xl"}>{team.name}</h1>
                                    {
                                        team.members.map((member) => (
                                            <div key={member}>
                                                <h1>{member}</h1>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

            <br/>
            <div className={"flex flex-col gap-2 w-full"}>
                <h1 className={"text-3xl p-4"}>Создать команды</h1>

                <div className={"flex flex-row pb-2 pl-2"}>
                    <label className={"text-2xl"}>Название</label>
                    <input type={"text"} placeholder={"Название команды"} id={"name"} className={"ml-5 bg-pink-200 focus:outline-none focus:border-b-slate-50 focus:border-b-2"}
                           onBlur={(event) => {
                               event.target.classList.remove("members__input")
                           }}
                           onFocus={(event) => {
                                 event.target.classList.add("members__input")
                            }}
                           onChange={event => team.name=event.target.value}/>
                </div>

                <div className={"flex flex-row pb-2 pl-2 w-full"}>
                    <label className={"text-2xl"}>Участиники</label>
                    <input type={"text"} placeholder={"Участники через пробел"} id={"members"} className={"ml-5 bg-pink-200 w-full focus:outline-none focus:border-b-slate-50 focus:border-b-2"}
                           onBlur={(event) => {
                               event.target.classList.remove("members__input")
                           }}
                           onFocus={(event) => {
                               event.target.classList.add("members__input")
                           }}
                           onChange={event =>
                               team.members=event.target.value.split(" ")}
                    />
                </div>

                <div className={"flex flex-row gap-5"}>
                    <button onClick={handle} className={"p-2 rounded-2xl bg-pink-300 hover:bg-pink-400 w-40"}>
                        Добавить
                    </button>
                    {
                        teams.length > 1 &&
                        <button onClick={start} className={"p-2 rounded-2xl bg-pink-300 hover:bg-pink-400 w-40"}>
                            Начать
                        </button>
                    }
                </div>
                <br/>
            </div>
        </div>
    )
}