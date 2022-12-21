
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
            card.classList.add("centered")
            card.setAttribute("data-note", row.note)
            card.setAttribute("data-value", row.value)
            card.setAttribute("draggable", "true")
            card.innerText = row.text;
            card.onclick = () => {
                if(card.dataset.note){
                    console.log("note: " + card.dataset.note);
                }
                currentCard = card;
            }
            card.ondragstart = () => {
                currentCard = card;
            }
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
        let temp = document.createElement("div");
        temp.classList.add("team")
        temp.ondragover = (event) => {
            currentTeam = {element: temp, value: t};
            temp.classList.add("team-hover");
            event.preventDefault();
        }
        temp.ondragend = (event) => {
            event.preventDefault();
            temp.classList.remove("team-hover");
        }
        temp.ondrop = () => {
            config.teams[config.teams.indexOf(currentTeam.value)].score += Number(currentCard.dataset.value);
            currentCard.classList.remove("current-card")
            currentCard.classList.add("done")
            temp.classList.remove("team-hover");
            constructTeams()

            let undoButton = document.querySelector(".undo-button");
            undoButton.classList.remove("done");
        }
        let teamNameElement = document.createElement("h3");
        teamNameElement.innerText = t.name + (showScore ? ": " + t.score.toString() : "");
        temp.appendChild(teamNameElement);
        team.appendChild(temp);
        div.appendChild(team);
    }
    master.appendChild(div);
}

function undo(){
    config.teams[config.teams.indexOf(currentTeam.value)].score -= Number(currentCard.dataset.value);
    currentCard.classList.remove("done");
    constructTeams()

    let undoButton = document.querySelector(".undo-button");
    undoButton.classList.add("done");
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
