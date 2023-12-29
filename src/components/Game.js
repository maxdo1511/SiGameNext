import config from "@/app/config";

export default function Game({game, selector, uuid}) {
    function select() {
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
    }

    return (
        <div>
            <button onClick={select}>
                {game.game.name}
            </button>
        </div>
    )
}