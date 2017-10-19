/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessnewBoard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; 
  //instantiate a new new Board
  var newBoard = new Board({n : n});
  //create var to store number of pieces on newBoard
  var pieces = 0;

  //define a helper function to accept row, col
  var solve = function(row, col) {
    // if most recent row and col are both 0
    if (pieces === 0) {
      //toggle piece 0,0
      newBoard.togglePiece(row, col);
      //increment pieces
      pieces += 1;
      //check if any conflicts
      if (!newBoard.hasAnyRooksConflicts()) {
        //check if number of pieces on newBoard is equal to n
        if (pieces === n) {
          //set solution equal to newBoard
          solution = newBoard.rows();
          return;
        } else {
          solve(row, col);
        }
      }
    } else if (pieces > n) {
      return solution;
    } else {
      //toggle most recent row + 1, most recent col plus 1
      newBoard.togglePiece(row + 1, col + 1);
      pieces += 1;
      //check if any conflicts
      if (!newBoard.hasAnyRooksConflicts()) {
        //check if number of pieces on newBoard is equal to n
        if (pieces === n) {
          //return value
          solution = newBoard.rows();
          return;
        } else {
          solve(row + 1, col + 1);
        }
      }
    } 
  };
  //call helper funtion on most recent row and col
  solve(0, 0);
  //return solution
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};





// return the number of nxn chessnewBoards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessnewBoard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessnewBoards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
