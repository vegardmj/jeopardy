

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
    for(let i = 0; i < config.table.length; i++){
        let column = config.table[i];
        let temp = document.createElement("div");
        temp.classList.add("row")
        for(let j = 0; j < column.length; j++){
            let row = column[j];
            let card;
            card = document.createElement("div");
            card.classList.add("card")
            card.onclick = () => {
                console.log("add note");
            }
            card.classList.add("centered")
            card.innerText = row.text;
            temp.appendChild(card);
        }
        div.appendChild(temp);
    }
}
var config;

function save(){
    needSave = false;
    let tempCategories = [];
    document.querySelectorAll(".category").forEach((element)=>{
        tempCategories.push(element.value);
    })
    console.log("tempCategories", tempCategories)
    config.categories = tempCategories;
    window.localStorage.setItem("jeopardy", JSON.stringify(config))
    alert("Your Jeopardy has been saved!")
}
function start(){
    if(needSave) return;
    window.location = "/jeopardy/play.html";
}

function addTeam(){
    let element = document.getElementById("team-input");
    config.teams.push({
        name: element.value,
        score: 0
    });
    element.value = "";
    constructTeams();
}

function constructTeams(){
    let master = document.getElementById("teams-wrapper");
    let div = document.getElementById("teams-container");
    div.remove();
    div = document.createElement("div");
    div.setAttribute("id", "teams-container")
    div.classList.add("team-wrapper");
    
    for(let i = 0; i < config.teams.length; i++){
        let t = config.teams[i]
        let team = document.createElement("div");
        let temp = document.createElement("div");
        temp.classList.add("team")
        let teamNameElement = document.createElement("h3");
        teamNameElement.innerText = t.name;
        let delButton = document.createElement("button");
        delButton.innerText = "DELETE";
        delButton.onclick = ()=>{
            team.remove();
            config.teams.splice(i, 1);
        }
        temp.appendChild(teamNameElement);
        temp.appendChild(delButton);
        team.appendChild(temp);
        div.appendChild(team);
    }
    master.appendChild(div);
}

var needSave = false;
var config;
load();

function load(){
    config = JSON.parse(window.localStorage.getItem("jeopardy"));
    if(config == null){
        needSave = true;
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