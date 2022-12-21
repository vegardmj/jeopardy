

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

function constructHeaders(categories){
    let div = document.getElementById("grid");
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("centered")
    for(let category of categories){
        let temp = document.createElement("input");
        row.classList.add("category")
        temp.value = category;
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

test1();
function test1(){
    setConfig();
    constructHeaders(config.categories);
    constructGrid(config.table);
}

function save(){
    let tempCategories = [];
    document.querySelectorAll(".category").forEach((element)=>{
        tempCategories.push(element.value);
    })
    config.categories = categories;
    window.localStorage.setItem("jeopardy", JSON.stringify(config))
}
function start(){
    window.location = "/jeopardy/play.html";
}

function setConfig(){
    let conf = {
        title: 'JEPORDY',
        teams: [],
        categories: [
            'Category 1',
            'Category 2',
            'Category 3',
            'Category 4',
            'Category 5',
        ],
        table: getTable()
    }

    config = conf;
}



function addTeam(){
    let value = document.getElementById("team-input").value;
    config.teams.push({
        name: value,
        score: 0
    });
    
    let div = document.getElementById("teams-container");
    let team = document.createElement("div");
    team.classList.add("team-wrapper");
    let scoreCard = document.createElement("div");
    scoreCard.classList.add("score-card");
    let temp = document.createElement("div");
    temp.classList.add("team")
    temp.setAttribute("id", "team-id-" + value);
    let teamNameElement = document.createElement("h3");
    teamNameElement.innerText = value;
    temp.appendChild(teamNameElement);
    team.appendChild(temp);
    div.appendChild(team);
    
}
function removeTeam(){
    let value = document.getElementById("team-input").value;
    for(let i = 0; i < config.teams.length; i++){
        if(config.teams[i]?.name == value){
            delete config.teams[i];
            break;
        }
    }
    document.getElementById("team-id-" + value).remove();
}