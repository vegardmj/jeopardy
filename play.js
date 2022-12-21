
function constructHeaders(categories){
    let div = document.getElementById("grid");
    let row = document.createElement("div");
    row.classList.add("row");
    for(let category of categories){
        let temp = document.createElement("h2");
        temp.classList.add("centered")
        temp.innerText = category;
        row.appendChild(temp);
    }
    div.appendChild(row);
}

function constructGrid(table){
    let div = document.getElementById("grid");
    for(let column of table){
        let temp = document.createElement("div");
        temp.classList.add("row")
        for(let row of column){
            let card;
            card = document.createElement("div");
            card.classList.add("card")
            card.onclick = () => {
                console.log("note: " + card.dataset.note);
            }
            card.classList.add("centered")
            card.setAttribute("data-note", row.note)
            card.setAttribute("draggable", "true")
            card.innerText = row.value;
            temp.appendChild(card);
        }
        div.appendChild(temp);
    }
}

function constructTeams(){
    let div = document.getElementById("teams-container");
    
    for(let t of config.teams){
        let team = document.createElement("div");
        team.classList.add("team-wrapper");
        let scoreCard = document.createElement("div");
        scoreCard.classList.add("score-card");
        let temp = document.createElement("div");
        temp.classList.add("team")
        temp.setAttribute("id", "team-id-" + t.name);
        let teamNameElement = document.createElement("h3");
        teamNameElement.innerText = value;
        temp.appendChild(teamNameElement);
        team.appendChild(temp);
        div.appendChild(team);
    }
    
}

var config;

load();

function load(){
    config = JSON.parse(window.localStorage.getItem("jeopardy"));
    constructHeaders(config.categories);
    constructGrid(config.table);
}
