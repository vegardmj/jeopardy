
function constructHeaders(){
    let div = document.getElementById("grid");
    let row = document.createElement("div");
    row.classList.add("row");
    for(let category of config.categories){
        let temp = document.createElement("h2");
        temp.classList.add("centered")
        temp.innerText = category;
        row.appendChild(temp);
    }
    div.appendChild(row);
}

function constructGrid(){
    let div = document.getElementById("grid");
    for(let column of config.table){
        let temp = document.createElement("div");
        temp.classList.add("row")
        for(let row of column){
            let card;
            card = document.createElement("div");
            card.classList.add("card")
            card.onclick = () => {
                if(card.dataset.note){
                    console.log("note: " + card.dataset.note);
                }
                card.classList.add("current-card");
                currentCard = card;
            }
            card.classList.add("centered")
            card.setAttribute("data-note", row.note)
            card.setAttribute("draggable", "true")
            card.innerText = row.text;
            temp.appendChild(card);
        }
        div.appendChild(temp);
    }
}

var currentTeam;
var currentCard;

function constructTeams(){
    let master = document.getElementById("teams-wrapper");
    let div = document.getElementById("teams-container");
    div.remove();
    div = document.createElement("div");
    div.setAttribute("id", "teams-container")
    
    for(let t of config.teams){
        let team = document.createElement("div");
        team.classList.add("team-wrapper");
        let scoreCard = document.createElement("div");
        scoreCard.classList.add("score-card");
        let temp = document.createElement("div");
        temp.classList.add("team")
        temp.setAttribute("id", "team-id-" + t.name);
        temp.ondragover = (event) => {
            console.log("ondragover")
            currentTeam = {element: temp, value: t};
            console.log("currentTeam", currentTeam)
            temp.classList.add("team-hover");
            event.preventDefault();
        }
        temp.ondrop = () => {
            config.team[config.team.indexOf(currentTeam.value)].score += card.value;
            currentCard.classList.remove("current-card")
            currentCard.classList.add("done")
            temp.classList.remove("team-hover");
        }
        let teamNameElement = document.createElement("h3");
        teamNameElement.innerText = t.name + (showScore ? ": " + t.score.toString() : "");
        temp.appendChild(teamNameElement);
        team.appendChild(temp);
        div.appendChild(team);
    }
    master.appendChild(div);
}

var config;

load();

function load(){
    config = JSON.parse(window.localStorage.getItem("jeopardy"));
    constructHeaders();
    constructGrid();
    constructTeams()
}

var showScore = false;
function toggleScore(){
    showScore = !showScore;
    constructTeams()
}
