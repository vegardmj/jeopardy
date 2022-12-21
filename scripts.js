

let scoreValues = [{value: 100}, {value: 200}, {value: 300}, {value: 400}, {value: 500}];

function getTable(){
    let table = [];
    for(let i = 1; i<6; i++){
        let temp = [];
        for(let j = 1; j<6; j++){
            temp.push(i.toString());
        }
        table.push(temp);
    }
    return table;
}

function constructGrid(table){
    let div = document.getElementById("test");
    for(let column of table){
        let temp = document.createElement("div");
        temp.classList.add("row")
        for(let row of column){
            let rowElement;
            rowElement = document.createElement("button");
            rowElement.classList.add("card")
            /*
            rowElement.onclick = (this) => {
                console.log(this.dataset.note);
            }
            */
            rowElement.classList.add("centered")
            rowElement.setAttribute("data-note", row.value)
            rowElement.innerText = row.value;
            temp.appendChild(rowElement);
        }
        div.appendChild(temp);
    }
}


test1();
function test1(){
    constructGrid(getTable());
}


function cardClicked(event){
    console.log(event.target);
}


function save(){
    window.localStorage.setItem("jeopardy", JSON.stringify(config))
}

function setConfig(){
    let conf = {
        title: 'JEPORDY',
        teams: [
            {
                name: 'Team 1',
                score: 200
            },
            {
                name: 'Team 2',
                score: 300
            },
        ],
        categories: [
            'Category 1',
            'Category 2'
        ],
        table: getTable()
    }

    config = conf;
}


var config = {
    teams: []
}
function addTeam(){
    let value = document.getElementById("team-input").value;
    config.teams.push({
        name: value,
        score: 0
    });
    renderTeams();
}
function removeTeam(){
    console.log(config.teams);
    let value = document.getElementById("team-input").value;
    for(let i = 0; i < config.teams.length; i++){
        if(config.teams[i].name == value){
            delete config.teams[i];
            break;
        }
    }
    renderTeams();
}
function renderTeams(){
    let div = document.getElementById("teams-container");
    
    let child = div.lastElementChild; 
    while (child) {
        div.removeChild(child);
        child = div.lastElementChild;
    }
    for(let team of config.teams){
        let temp = document.createElement("p");
        temp.innerText = team.name + ": " + team.score.toString();
        div.appendChild(temp);
    }
}