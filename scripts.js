

let scoreValues = [100, 200, 300, 400, 500];

function getTable(){
    let table = [];
    for(let i = 1; i<6; i++){
        table.push(["Category " + i.toString(), ...scoreValues]);
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
            if(column.indexOf(row) != 0){
                rowElement.classList.add("card")
            }
            rowElement.innerText = row;
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
        table: getTable()
    }

    config = conf;
}