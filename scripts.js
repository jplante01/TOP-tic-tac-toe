const gameboard = (function(){
  let board = [[null,null, null],[null,null, null],[null,null, null]];

  function showPiece(x, y) {
    return board[x][y];
  }

  function placePiece(piece, x, y) {
    board[x][y] = piece; 
  }

  return {
    get,
    set
  }
})();


const game = (function(){
  
  function resetBoard(){

  }

  function (){

  }

  function resetBoard(){

  }
})();
