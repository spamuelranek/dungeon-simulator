let board =[0,0,0]

function printPlayer(){
    board[0] = 1
}


function printBoard(){
    printPlayer();
    let row = document.getElementById("board");
    for (let boardWidth=0; boardWidth<board.length; boardWidth++){
        let cell = document.createElement("td");
        cell.textContent = board[boardSize];
        row.appendChild(cell);
    }

}

printBoard()

function movePlayer(){
    for (let boardWidth=0; boardWidth<board.length; boardWidth++){
        if (board[0] = 1){
            board[0] =0;
            board[1] =1
        }
    }
}