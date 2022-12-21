

function getTable(){
    let table = [];
    for(let i = 1; i<6; i++){
        let temp = [];
        for(let j = 1; j<6; j++){
            temp.push({value: (100*i).toString()});
        }
        table.push(temp);
    }
    return table;
}

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
            card = document.createElement("button");
            card.classList.add("card")
            card.onclick = () => {
                console.log("note: " + card.dataset.note);
            }
            card.classList.add("centered")
            card.setAttribute("data-note", row.note)
            card.innerText = row.value;
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


function cardClicked(event){
    console.log(event.target);
}


function save(){
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
    let temp = document.createElement("div");
    temp.setAttribute("id", "team-id-" + value);
    temp.innerText = value;
    div.appendChild(temp);
    
}
function removeTeam(){
    console.log(config.teams);
    let value = document.getElementById("team-input");
    for(let i = 0; i < config.teams.length; i++){
        if(config.teams[i]?.name == value){
            delete config.teams[i];
            break;
        }
    }
    document.getElementById("team-id-" + value).remove();
}