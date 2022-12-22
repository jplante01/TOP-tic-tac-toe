const gameBoard = (function(){
  let board = [[null,null, null],[null,null, null],[null,null, null]];

  function showPiece(x, y) {
    return board[x][y];
  }

  function placePiece(piece, x, y) {
    board[x][y] = piece; 
  }

  function resetBoard(){
    for (i = 0; i < 3; i++) {
     for (j = 0; j < 3; j++) {
       placePiece(null, i, j);
     }
    }
  }
  function printBoard() {
    board.forEach((arr) => console.log(arr))
  }

  return {
    showPiece,
    placePiece,
    resetBoard,
    printBoard
  }
})();

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
