
let height = 0;
let width =0;
let startArray =[];

//creates the instance of the board
function Board(width,height){
    this.rows = height;
    this.columns = width;
    this.firstStart = true;
}

//creates the content of the board
Board.prototype.arrayBoard = function(){
    for ( let row=0; row<this.rows; row++){
        let rowArray = [];
        for( let column=0; column<this.columns; column++){
            rowArray.push(0);
        }
        startArray.push(rowArray);
    }
    console.log(startArray);
    return startArray;
}

// sets the player start location
Board.prototype.playerLocation = function(){
    let startLocation = Math.floor(startArray.length/2);
    startArray[startLocation][0] =1;
    return startArray;
}

// start to move process. Trying to splice into print action
Board.prototype.turnAction = function(event){  
    this.firstStart = false;
    console.log("coolio!");
    startArray[0][0]=5
    printBoardContent(height, width);
}

// // Bottleneck for switching through turns
// Board.prototype.turnSwitch = function(){
    
//     //allows for setting the starting position
//     if(this.firstStart == true){
//         let boardContent = this.playerLocation();
//         return boardContent;
//         } 
        
//         // interjects new board content array
//         else{
//         let boardContent = this.playerLocation();
//         return boardContent;
//     }
// }


//builds board and puts ids content into it
function printBoard(){
    let table = document.getElementById("board");
    table.innerHTML = '';

    // creates each row and sets id to row position
    for (let row=0; row<height; row++){
        let tableRow = document.createElement('tr');
        table.appendChild(tableRow);
        tableRow.setAttribute('id',row) 
        
        // creates cells and sets id to column position
        for ( let column = 0; column<width; column++){
            let cell = document.createElement("td");
            let cellIdBuild = " cell " + row + ' at ' + column;
            cell.setAttribute('id',cellIdBuild);
            tableRow.appendChild(cell);
        }

    }
}

//puts content into it cells
function printBoardContent(height,width){ 

    // goes through each row
    for (let row=0; row<height; row++){

        // fills cells with content
        for ( let column = 0; column<width; column++){
            let cellIdcontent = " cell " + row + ' at ' + column;
            let cell = document.getElementById(cellIdcontent);
            cell.textContent = startArray[row][column];

        }

    }
}



let turnGenerator = document.getElementById('button');



turnGenerator.addEventListener('click',Board.prototype.turnAction);


let getDimensions = document.getElementById('dimensions');

function createBoard(event) {
    event.preventDefault();
    height = event.target.height.value;
    width = event.target.width.value;
    printBoard();
    let newBoard = new Board(height, width);
    console.log(newBoard);
    newBoard.arrayBoard();
    newBoard.playerLocation();
    printBoardContent(height,width);
}

getDimensions.addEventListener('submit',createBoard);

// let board = new Board(5,3);
// console.log(board);
// board.printBoard();



