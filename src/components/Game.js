import config from "@/app/config";

export default function Game({game, selector, uuid}) {
    function select() {
        setTimeout(() => {
            fetch(config.select_game, {
                method: "POST",
                body: JSON.stringify(
                    {
                        "uuid": uuid,
                        "gameid": game.id
                    }
                ),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(r => {
                if (r.ok) {
                    selector("TEAMS_INIT")
                }
            })
        }, 500)
    }

    return (
        <div className={"flex flex-col items-center gap-2 min-w-40"}>
            <button className={"bg-pink-300 hover:bg-pink-400 p-5 rounded-2xl w-full hover:shadow-xl focus:animate-ping transition hover:-translate-y-1 ease-in duration-300"} onClick={select}>
                <h1 className={"text-white font-bold text-2xl"}>{game.game.name}</h1>
            </button>
            <h1 className={"text-pink-600 font-medium"}>{"Автор: " + game.game.author}</h1>
        </div>
    )
}