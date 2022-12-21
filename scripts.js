

let scoreValues = [{value: 100}, {value: 200}, {value: 300}, {value: 400}, {value: 500}];

function getTable(){
    let table = [];
    for(let i = 1; i<6; i++){
        table.push([{value: "Category " + i.toString()}, ...scoreValues]);
    }
    return table;
}

function constructGrid(table){
    let div = document.getElementById("test");
    for(let column of table){
        let temp = document.createElement("div");
        temp.classList.add("column")
        for(let row of column){
            let rowElement = document.createElement("div");
            rowElement.classList.add("centered")
            if(column.indexOf(row) != 0){
                rowElement.classList.add("card")
            }
            rowElement.setAttribute("data-note", row.note)
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
}
function removeTeam(){
    let value = document.getElementById("team-input").value;
    for(let i = 0; i < config.teams.length; i++){
        if(config.teams[i].name == value){
            delete config.teams[i];
            break;
        }
    }
}