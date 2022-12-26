const spots = document.querySelectorAll(".spot");
const popUp = document.querySelector('.pop-up'); 

spots.forEach((spot, idx) =>{
  spot.addEventListener('click', () => {
    game.takeTurn(idx);
  });
});

document.getElementById('new').addEventListener('click',()=>{
  popUp.className = 'pop-up'
});

document.getElementById('new-game-form').addEventListener('submit',(e) =>{
  let playerOneName = document.getElementById('player-one-name').value;
  let playerOnePiece = document.getElementById('player-one-piece').value;
  let playerTwoName = document.getElementById('player-two-name').value;
  let playerTwoPiece = document.getElementById('player-two-piece').value;

  game.newGame(playerOneName, playerOnePiece, playerTwoName, playerTwoPiece);

  let pOneName = document.getElementById('p1-name-display');
  let pOnePiece = document.getElementById('p1-char-display');
  let pTwoName = document.getElementById('p2-name-display');
  let pTwoPiece = document.getElementById('p2-char-display');


  pOneName.textContent = playerOneName;
  pOnePiece.textContent = playerOnePiece;
  pTwoName.textContent = playerTwoName;
  pTwoPiece.textContent = playerTwoPiece;
  
  popUp.className = 'pop-up hide'
  e.preventDefault();
});

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

const game = (function(){

  let player1 = "",
      player1Mark = "",
      player2 = "",
      player2Mark = "",
      activeGame = false;

  let turn = {
    'currentPlayer' : "",
    'currentMark' : "",
  }

  function newGame(p1, p1Mark, p2, p2Mark){
    player1 = p1;
    player1Mark = p1Mark;
    player2 = p2;
    player2Mark = p2Mark
    turn.currentPlayer = p1;
    turn.currentMark = p1Mark;

    gameBoard.resetBoard();
    activeGame = true;
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
    if (activeGame === false) return;

    gameBoard.placePiece(turn.currentMark, n);
  
    gameBoard.renderBoard()

    if (gameBoard.checkVictory()){
      console.log('YOU WIN!');
      activeGame = false;
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
// game.newGame('Jeff', 'X', 'Tom', 'O');
/***************************************************TESTING******************************/
