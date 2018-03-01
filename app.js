// game state
var state = {
  turn: 'x',
  winCondition: false,
  winner: null,
  boardPlacement: [
    null, null, null, 
    null, null, null, 
    null, null, null
  ]
};

var checkHorizontal = function(row) {
  var placement = state.boardPlacement;
  if ((placement[row] === 'x' || placement[row] ==='o') && 
    (placement[row] === placement[row + 1]) && (placement[row + 1] === placement[row + 2])) {
    state.winner = placement[row];
    state.winCondition = true;
  }
}

var checkVertical = function(column) {
  var placement = state.boardPlacement;
  if ((placement[column] === 'x' || placement[column] ==='o') && 
    (placement[column] === placement[column + 3]) && (placement[column + 3] === placement[column + 6])) {
    state.winner = placement[column];
    state.winCondition = true;
  }
}

var checkMajorDiagonal = function() {
  var placement = state.boardPlacement;
  if ((placement[0] === 'x' || placement[0] ==='o') && 
    (placement[0] === placement[4]) && (placement[4] === placement[8])) {
    state.winner = placement[0];
    state.winCondition = true;
  }
}

var checkMinorDiagonal = function() {
  var placement = state.boardPlacement;
  if ((placement[2] === 'x' || placement[2] ==='o') && 
    (placement[2] === placement[4]) && (placement[4] === placement[6])) {
    state.winner = placement[2];
    state.winCondition = true;
  }
}

// logic helper functions
var checkWin = function() {
  for (let i = 0; i < 3; i++) {
    checkHorizontal(i * 3);
    checkVertical(i);
  }
  checkMajorDiagonal();
  checkMinorDiagonal();
}

// board update
var renderBoard = function() {
  for (let i = 0; i < positions.length; i++) {
    let position = positions[i];

    if (state.boardPlacement[i] === null) {
      position.innerHTML = '';
    } else if (state.boardPlacement[i] === 'x') {
      position.innerHTML = 'x';
    } else if (state.boardPlacement[i] === 'o') {
      position.innerHTML = 'o';
    }
  }
}

var renderTurnMessage = function() {
  let message = document.getElementById('turn');
  message.innerHTML = `It is player ${state.turn}'s turn`;
}

// establish board event handlers
var positions = document.getElementsByClassName('block');
for (let i = 0; i < positions.length; i++) {
  positions[i].onclick = function(event) {

    let position = event.target.dataset.id;
    // if can place, place and change state turn 
    if (state.winCondition === false) {
      if (state.boardPlacement[i] === null) {
        state.boardPlacement[i] = state.turn;
        if (state.turn === 'x') {
          state.turn = 'o';
        } else {
          state.turn = 'x'
        }
      }

      // creates turnMessage
      renderTurnMessage();

      // create function to render board
      renderBoard();

      // check for win
      checkWin();

      // if win, append new div to body and state winner
      if (state.winCondition === true) {
        let winStatement = document.createElement('h2');
        winStatement.setAttribute('id', 'win-statement')
        winStatement.innerHTML = `Congratulations! Player '${state.winner}' is the winner!`;
        document.body.appendChild(winStatement);
      }
    }
  }
}

var resetButton = document.getElementById('reset');
resetButton.onclick = function() {
  state = {
    turn: 'x',
    winCondition: false,
    winner: null,
    boardPlacement: [
      null, null, null, 
      null, null, null, 
      null, null, null
    ]
  };

  let winStatement = document.getElementById('win-statement');

  if (winStatement === null) {
    return;
  } else {
    winStatement.remove();
  }

  renderBoard();
  renderTurnMessage();
}

