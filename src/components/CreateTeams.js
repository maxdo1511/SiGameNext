import config from "@/app/config";
import {useState} from "react";

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
            }
        })
    }

    console.log(teams)

    return (
        <div className={"flex flex-col items-center"}>

                <div className={"flex flex-row"}>
                    {
                        teams.length > 0 &&
                        teams.map((team) => (
                            <div key={team.name}>
                                <div className={"flex flex-col pl-2 pr-2"}>
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
            <div className={"flex flex-col gap-2 items-center"}>
                <h1 className={"text-3xl p-4"}>Создать команды</h1>

                <div className={"flex flex-row pb-2 pl-2"}>
                    <label className={"text-2xl"}>Название</label>
                    <input type={"text"} placeholder={"Название команды"} id={"name"} className={"ml-5 bg-gray-400 border-b-slate-50 border-b-2"} onChange={event => team.name=event.target.value}/>
                </div>

                <div className={"flex flex-row pb-2 pl-2"}>
                    <label className={"text-2xl"}>Участиники</label>
                    <input type={"text"} placeholder={"Участники через пробел"} id={"members"} className={"ml-5 bg-gray-400 border-b-slate-50 border-b-2"} onChange={event => team.members=event.target.value.split(" ")}/>
                </div>

                <div className={"flex flex-row gap-5"}>
                    <button onClick={handle} className={"p-2 rounded-2xl bg-fuchsia-700 w-40"}>
                        Добавить
                    </button>
                    {
                        teams.length > 1 &&
                        <button onClick={start} className={"p-2 rounded-2xl bg-fuchsia-700 w-40"}>
                            Начать
                        </button>
                    }
                </div>
                <br/>
            </div>
        </div>
    )
}