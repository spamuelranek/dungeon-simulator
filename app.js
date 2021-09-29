
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
    // console.log(startArray);
    return startArray;
}

function randomGenerate (modifier){
    let newValue = Math.round(Math.random() * (modifier-1));
    return newValue;
}

// amount of obstacles on board
let amountOfObstacles = 20;

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
    // console.log(placementArray);
    for(let i = 0; i<placementArray.length; i++){
        startArray[placementArray[i][0]][placementArray[i][1]] = 4;
    }
    return startArray;
}


// sets the player start location
Board.prototype.playerLocation = function(){

    let startLocation = Math.floor(startArray.length/2);
    startArray[startLocation][0] =1;

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
            if(cell.textContent == 1){
                cell.setAttribute('class','player');
                cell.textContent = '';
            }
            else if(cell.textContent == 4){
                cell.setAttribute('class','obstacle');
                cell.textContent = '';
            }
            else{
                cell.setAttribute('class','floor');
                cell.textContent = '';
            }

        }

    }
}

 // moves the player forward and replaces the previous locaiton with a zero
function playerMotion(){
  for( let row = 0; row<height; row++){
            for ( let column = 0; column<width; column++){
               
                // moves player forward
                if (startArray[row][column] == 1){

                    let xAxisMovementright = column + 1;
                    let xAxisMovementleft = column - 1;

                    let yAxisMovementup = row - 1;
                    let yAxisMovementdown = row + 1;

                    // obstacle avoidance
                    if( startArray[row][xAxisMovementright] > 1 &&(startArray[yAxisMovementup][column] == 0||startArray[yAxisMovementdown][column]==0)){
                        while(startArray[yAxisMovementup][column] == 0 && startArray[yAxisMovementdown][column]==0){
                            let choice = randomGenerate(2);
                            console.log(choice);
                            if(choice == 0){
                                startArray[row][column] = 0;
                                startArray[yAxisMovementup][column] =1
                                console.log('went up one square when i had a choice');
                                break;
                            }
                            if(choice ==1){
                                startArray[row][column] = 0;
                                startArray[yAxisMovementdown][column] =1
                                console.log('went down one square when i had a choice');
                                break;
                            }

                        }
                        if(startArray[yAxisMovementup][column] == 0){
                            startArray[row][column] = 0;
                            startArray[yAxisMovementup][column] =1
                            console.log('went up one square when i had no choice');
                            break;
                        }
                        if(startArray[yAxisMovementdown][column] == 0){
                            startArray[row][column] = 0;
                            startArray[yAxisMovementdown][column] =1
                            console.log('went down one square when i had no choice');
                            break;
                        }
                    }
                    
                    else {
                    startArray[row][column] = 0;
                    startArray[row][xAxisMovementright] = 1;
                    console.log('went right one square');
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
    // console.log(startArray);
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
    // console.log(newBoard);
    newBoard.arrayBoard();
    placeObstacles();
    newBoard.playerLocation();
    printBoardContent(width,height);
}

getDimensions.addEventListener('submit',createBoard);




