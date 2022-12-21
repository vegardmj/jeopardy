

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
            temp.appendChild('<div class="card">' + row + '</div>');
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