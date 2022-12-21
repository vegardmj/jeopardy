

let scoreValues = [100, 200, 300, 400, 500];

function getDummyTable(){
    let table = [];
    for(let i = 1; i<6; i++){
        table.push(["Category " + String.valueOf(i), ...scoreValues]);
    }
    return table;
}

function constructGrid(table){
    let div = document.getElementById("test");
    for(let column of table){
        let temp = document.createElement("div");
        for(let row of column){
            let rowElement = document.createElement("div");
            rowElement.classList.add("card")
            rowElement.innerText = row;
            temp.appendChild(rowElement);
        }
        div.appendChild(temp);
    }
}



function test1(){
    constructGrid(getDummyTable());
}


function cardClicked(event){
    console.log(event.target);
}

var config = {}

function save(){
    window.localStorage.setItem("jeopardy", JSON.stringify(config))
}

function setConfig(){
    let conf = {
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
        table: getDummyTable()
    }

    config = conf;
}