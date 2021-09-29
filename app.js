
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

function randomGenerate (modifier){
    let newValue = Math.round(Math.random() * (modifier-1));
    return newValue;
}

// amount of obstacles on board
let amountOfObstacles = 15;

function createObstacleArray(){
    let obstacleArray = [];
    for (let i = 0; i<amountOfObstacles; i++){
        let yAxis = randomGenerate(height);
        let xAxis = randomGenerate(width);
        let xyAxis = [yAxis,xAxis];
        obstacleArray.push(xyAxis);

    }
    return obstacleArray;
}

// hopefully places obstacles on board
function placeObstacles(){
    let placementArray = createObstacleArray();
    console.log(placementArray);
    for(let i = 0; i<placementArray.length; i++){
        startArray[placementArray[i][0]][placementArray[i][1]] = 4;
    }
    return startArray;
}


// sets the player start location
Board.prototype.playerLocation = function(){



    let startLocation = Math.floor(startArray.length/2);
    startArray[startLocation][0] =1;

    // // tester: obstacle in path of player
    // let obstacleLocation = 3;
    // let modifiedY = startLocation - 1;
    
    // let modifiedX = obstacleLocation + 2;
    // startArray[startLocation][obstacleLocation] = 5;
    // startArray[modifiedY][modifiedX] = 5


    return startArray;
}

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
function printBoardContent(width,height){ 

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

 // moves the player forward and replaces the previous locaiton with a zero
function playerMotion(){
  for( let row = 0; row<height; row++){
            for ( let column = 0; column<width; column++){
               
                // moves player forward
                if (startArray[row][column] == 1){
                    let xAxisMovement = column + 1;
                    
                    // obstacle avoidance
                    if( startArray[row][xAxisMovement] > 1){
                        let yAxisMovement = row - 1;
                        startArray[row][column] = 0;
                        startArray[yAxisMovement][column] =1
                        break;
                    }
                    
                    else {
                    startArray[row][column] = 0;
                    startArray[row][xAxisMovement] = 1;
                    findingPlayer = true;
                    break;
                    }

            }
        }  
    }
}

// targets the 'move' button
let turnGenerator = document.getElementById('button');

// move process. splices into print action
Board.prototype.turnAction = function(event){  
    playerMotion();    
    console.log(startArray);
    printBoardContent(width, height);
}

turnGenerator.addEventListener('click',Board.prototype.turnAction);


let getDimensions = document.getElementById('dimensions');

function createBoard(event) {
    event.preventDefault();
    height = event.target.height.value;
    width = event.target.width.value;
    printBoard();
    let newBoard = new Board(width,height);
    console.log(newBoard);
    newBoard.arrayBoard();
    placeObstacles();
    newBoard.playerLocation();
    printBoardContent(width,height);
}

getDimensions.addEventListener('submit',createBoard);




