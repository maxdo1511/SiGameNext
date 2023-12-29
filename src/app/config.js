const config = {
    "get_games": "http://127.0.0.1:8080/api/game/get/games/all",
    "get_session": "http://127.0.0.1:8080/api/session/getByUUID/",
    "create_session": "http://127.0.0.1:8080/api/session/create/session",
    "select_game": "http://127.0.0.1:8080/api/session/select/game",
    "add_team": "http://127.0.0.1:8080/api/session/add/team",
    "get_teams": "http://127.0.0.1:8080/api/session/getTeams/",
    "start_game": "http://127.0.0.1:8080/api/session/start/",
    "get_round": "http://127.0.0.1:8080/api/session/get/round/",
    "select_question": "http://127.0.0.1:8080/api/session/question/select",
    "get_current_team": "http://127.0.0.1:8080/api/session/getAnsTeam/",
    "question_answered": "http://127.0.0.1:8080/api/session/question/answer/",
    "question_result": "http://127.0.0.1:8080/api/session/question/result",

    "question_image": "http://localhost:8080/api/images/get/",

    "desktop_nav_max": 800,
}

export default config;