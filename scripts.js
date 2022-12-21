

function getTable(){
    let table = [];
    for(let i = 1; i<6; i++){
        let temp = [];
        for(let j = 1; j<6; j++){
            temp.push({text: (100*i).toString(), value: 100*i});
        }
        table.push(temp);
    }
    return table;
}
function getDefaultCategories(){
    return ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
}

function constructHeaders(){
    let div = document.getElementById("grid");
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("centered")
    for(let category of config.categories){
        let temp = document.createElement("input");
        temp.classList.add("category")
        temp.value = category;
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
                console.log("add note");
            }
            card.classList.add("centered")
            card.setAttribute("data-note", row.note)
            card.innerText = row.text;
            temp.appendChild(card);
        }
        div.appendChild(temp);
    }
}

var config;

function save(){
    let tempCategories = [];
    document.querySelectorAll(".category").forEach((element)=>{
        tempCategories.push(element.value);
    })
    console.log("tempCategories", tempCategories)
    config.categories = tempCategories;
    window.localStorage.setItem("jeopardy", JSON.stringify(config))
    
}
function start(){
    window.location = "/jeopardy/play.html";
}


function addTeam(){
    let value = document.getElementById("team-input").value;
    config.teams.push({
        name: value,
        score: 0
    });
    
    constructTeams()
    
}
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
        let teamNameElement = document.createElement("h3");
        teamNameElement.innerText = t.name;
        let delButton = document.createElement("button");
        delButton.innerText = "DELETE";
        delButton.onclick = ()=>{
            team.remove();
            for(let team of config.teams){
                if(team.name = teamNameElement.innerText){
                    delete team;
                    break;
                }
            }
        }
        temp.appendChild(teamNameElement);
        temp.appendChild(delButton);
        team.appendChild(temp);
        div.appendChild(team);
    }
    master.appendChild(div);
}


var config;
load();

function load(){
    config = JSON.parse(window.localStorage.getItem("jeopardy"));
    if(config == null){
        config = {
        categories: getDefaultCategories(),
        table: getTable(),
        teams: []
        }
    }
    constructHeaders();
    constructGrid();
    constructTeams();
}