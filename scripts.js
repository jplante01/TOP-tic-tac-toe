const spots = document.querySelectorAll(".spot"),
      popUp = document.querySelector('.pop-up'), 
      formInputP1Name = document.getElementById('player-one-name'),
      formInputP1Mark = document.getElementById('player-one-mark'),
      formInputP2Name = document.getElementById('player-two-name'),
      formInputP2Mark = document.getElementById('player-two-mark'),
      p1Display = document.getElementById('p1-display'),
      p2Display = document.getElementById('p2-display');

const playerFactory = function(name, mark){
  return {name, mark};
};

let player1 = playerFactory("", ""),
    player2 = playerFactory("", ""),
    currentPlayer = player1;

//Event listeners on gameBoard to fire the takeTurn function
spots.forEach((spot, idx) => {
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
  
  //Initiate new game
  game.newGame(formInputP1Name.value, formInputP1Mark.value, formInputP2Name.value, formInputP2Mark.value);
  

  //Update interface with players and pieces
  p1Display.firstElementChild.textContent = player1.name;
  p1Display.lastElementChild.textContent  = player1.mark;
  p2Display.firstElementChild.textContent  = player2.name;
  p2Display.lastElementChild.textContent  = player2.mark;

  //Reset form
  formInputP1Name.value = "";
  formInputP1Mark.value = "";
  formInputP2Name.value = "";
  formInputP2Mark.value = "";

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
    p1Display.classList.toggle("your-turn");
  }

 
  function togglePlayer() {
    p1Display.classList.toggle("your-turn");
    p2Display.classList.toggle("your-turn");

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
    } else {
      togglePlayer();
    }
  }

  return {
    newGame,
    takeTurn
  }
})();
