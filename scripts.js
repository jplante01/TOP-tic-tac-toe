const spots = document.querySelectorAll(".spot");
const popUp = document.querySelector('.pop-up'); 

let player1 = {},
    player2 = {},
    currentPlayer = player1;

//Event listeners on gameBoard to fire the takeTurn function
spots.forEach((spot, idx) =>{
  spot.addEventListener('click', (e) => {
    if (!e.target.textContent) game.takeTurn(idx);
  });
});

//Event listener to open new game form upon button click
document.getElementById('new').addEventListener('click',()=>{
  popUp.className = 'pop-up'
});

//Event listener for new game form submission
document.getElementById('new-game-form').addEventListener('submit',(e) => {
  //Collect inputs
  let playerOneName = document.getElementById('player-one-name').value;
  let playerOnePiece = document.getElementById('player-one-piece').value;
  let playerTwoName = document.getElementById('player-two-name').value;
  let playerTwoPiece = document.getElementById('player-two-piece').value;
  
  //Initiate new game
  game.newGame(playerOneName, playerOnePiece, playerTwoName, playerTwoPiece);
  
  //Get player info elements
  let pOneName = document.getElementById('p1-name-display');
  let pOnePiece = document.getElementById('p1-char-display');
  let pTwoName = document.getElementById('p2-name-display');
  let pTwoPiece = document.getElementById('p2-char-display');

  //Update interface with players and pieces
  pOneName.textContent = playerOneName;
  pOnePiece.textContent = playerOnePiece;
  pTwoName.textContent = playerTwoName;
  pTwoPiece.textContent = playerTwoPiece;
  
  //Reset form
  document.getElementById('player-one-name').value = "";
  document.getElementById('player-one-piece').value = "";
  document.getElementById('player-two-name').value = "";
  document.getElementById('player-two-piece').value = "";
  
  // gameBoard.resetBoard();
  // gameBoard.renderBoard();

  //Hide form pop-up
  popUp.className = 'pop-up hide'


  e.preventDefault();
});

// Game board module
const gameBoard = (function(){
  let board = ["", "", "", "", "", "", "", "", ""];

  function placePiece(piece, n) {
    board[n] = piece; 
  }

  function resetBoard(){
    for (i = 0; i < board.length; i++) {
       board[i] = "";
    }
  }

  function renderBoard () {
    for (i = 0; i < board.length; i++) {
      spots[i].innerHTML = board[i]; 
    }
  }
  
  function checkVictory(){
    let victoryConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (i = 0; i < victoryConditions.length; i++) {
      let first = board[victoryConditions[i][0]];
      let second = board[victoryConditions[i][1]];
      let third = board[victoryConditions[i][2]];
      
      if (first !== "" && first === second && first === third) {
        return true;
      }
    }
    return false; 
  }
  
  return {
    checkVictory,
    renderBoard,
    placePiece,
    resetBoard
  }
})();

const playerFactory = function(name, mark){
  return {name, mark};
};

//Game play module
const game = (function(){

  let activeGame = false;

  function newGame(p1, p1Mark, p2, p2Mark){
    player1.name = p1;
    player1.mark = p1Mark;
    player2.name = p2;
    player2.mark = p2Mark;
   
    gameBoard.resetBoard();
    gameBoard.renderBoard();
    activeGame = true;
  }

 
  function togglePlayer() {
    if(currentPlayer === player1) {
       currentPlayer = player2;
    } else {
      currentPlayer = player1;
      }
    }

  function takeTurn(n) {
    if (activeGame === false) return;

    gameBoard.placePiece(currentPlayer.mark, n);
  
    gameBoard.renderBoard()

    if (gameBoard.checkVictory()){
      console.log('YOU WIN!');
      activeGame = false;
    }
    
    togglePlayer();
  }

  return {
    newGame,
    takeTurn
  }
})();
