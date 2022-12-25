const spots = document.querySelectorAll(".spot");

const gameBoard = (function(){
  let board = ["", "", "", "", "", "", "", "", ""];

  function showPiece(n) {
    return board[n];
  }

  function placePiece(piece, n) {
    board[n] = piece; 
  }

  function resetBoard(){
    for (i = 0; i < board.length; i++) {
       placePiece("", i);
    }
  }

  function printBoard() {
    console.log(board)
  }

  function renderBoard () {
    for (i = 0; i < board.length; i++) {
      spots[i].innerHTML = board[i]; 
    }
  }
  
  function checkVictory(){
    let victoryConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (i = 0; i < victoryConditions.length; i++) {
      let first = showPiece(victoryConditions[i][0]);
      let second = showPiece(victoryConditions[i][1]);
      let third = showPiece(victoryConditions[i][2]);
      
      if (first !== "" && first === second && first === third) {
        return true;
      }
    }
    return false; 
  }
  
  return {
    checkVictory,
    renderBoard,
    showPiece,
    placePiece,
    resetBoard,
    printBoard
  }
})();

/***************************************************TESTING******************************/
// gameBoard.printBoard()
// console.log(gameBoard.checkVictory())
// gameBoard.placePiece("X",2)
// gameBoard.placePiece("X",4)
// gameBoard.placePiece("X",6)
// gameBoard.printBoard()
// console.log(gameBoard.checkVictory())
/***************************************************TESTING******************************/

const player = (name, piece) => {
  function choose(coord){
    gameBoard.placePiece(this.piece, coord[0], coord[1])
  } 
  
  return {name, piece, choose}
}

const playGame = (function(){
  

  return {
  }

})();

const game = (function(){

  let player1 = "",
      player1Mark = "",
      player2 = "",
      player2Mark = "";

  function newGame(p1, p1Mark, p2, p2Mark){
    player1 = p1;
    player1Mark = p1Mark;
    player2 = p2;
    player2Mark = p2Mark
    turn.currentPlayer = p1;
    turn.currentMark = p1Mark;

    gameBoard.resetBoard();
  }

  turn = {
    'currentPlayer' : player1,
    'currentMark' : player1Mark,
    'gameComplete' : false
  }
 
  function togglePlayer() {
    if(turn.currentPlayer === player1) {
       turn.currentPlayer = player2;
       turn.currentMark = player2Mark;
    } else {
      turn.currentPlayer = player1;
      turn.currentMark = player1Mark;
      }
    }

  function takeTurn(n) {
  
    gameBoard.placePiece(turn.currentMark, n);
  
    gameBoard.renderBoard()

    if (gameBoard.checkVictory()){
      console.log('YOU WIN!');
      turn.gameComplete = true;
    }
    
    togglePlayer();
  }

  return {
    newGame,
    turn, /*********TESTING----REMOVE*****/
    togglePlayer,  /*********TESTING----REMOVE*****/
    takeTurn
  }
})();

/***************************************************TESTING******************************/
game.newGame('Jeff', 'X', 'Tom', 'O');
/***************************************************TESTING******************************/
