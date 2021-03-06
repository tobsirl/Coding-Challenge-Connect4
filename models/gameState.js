module.exports = class GameState {
  constructor(player1, player2, currentPlayer, board, gameOver, message) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = currentPlayer;
    this.board = board;
    this.gameOver = gameOver;
    this.message = message;
  }

  // Starts new game
  initBoard() {
    // Create a blank 6x9 matrix
    const createEmptyTable = () => new Array(6).fill(null).map(() => new Array(9).fill(null));

    this.board = createEmptyTable();
    console.log(this.board);
  }

  togglePlayer() {
    return this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  play(col) {
    if (!this.gameOver) {
      const { board } = this;
      for (let row = 5; row >= 0; row--) {
        if (!board[row][col]) {
          board[row][col] = this.player2;
          break;
        }
      }

      // check status of board
      const result = this.checkAll(board);
      if (result === this.player1) {
        this.board = board;
        this.gameOver = true;
        this.message = 'Player 1 wins!';
      } else if (result === this.player2) {
        this.board = board;
        this.gameOver = true;
        this.message = 'Player 2 wins!';
      } else if (result === 'draw') {
        this.board = board;
        this.gameOver = true;
        this.message = 'Draw game.';
      } else {
        this.board = board;
        this.currentPlayer = this.togglePlayer();
      }
    } else {
      this.message = 'Game over. Please start a new game.';
    }
  }

  updateMessage(message) {
    this.message = message;
  }

  updatePlayer1(player1) {
    this.player1 = player1;
  }

  updatePlayer2(player2) {
    this.player2 = player2;
  }

  updateBoard(col) {
    for (let row = 5; row >= 0; row--) {
      if (!this.board[row][col]) {
        this.board[row][col] = this.currentPlayer;
        break;
      }
    }
  }

  getBoard() {
    return this.board;
  }

  // Check board for win conditions
  checkVertical(board) {
    // Check only if row is 4 or greater
    for (let row = 4; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col]) {
          if (
            board[row][col] === board[row - 1][col]
            && board[row][col] === board[row - 2][col]
            && board[row][col] === board[row - 3][col]
            && board[row][col] === board[row - 4][col]
          ) {
            return board[row][col];
          }
        }
      }
    }
  }

  checkHorizontal(board) {
    // Check only if column is 3 or less
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 5; col++) {
        if (board[row][col]) {
          if (
            board[row][col] === board[row][col + 1]
            && board[row][col] === board[row][col + 2]
            && board[row][col] === board[row][col + 3]
            && board[row][col] === board[row][col + 4]
          ) {
            return board[row][col];
          }
        }
      }
    }
  }

  checkDiagonalRight(board) {
    // Check only if row is 4 or greater AND column is 4 or less
    for (let row = 4; row < 6; row++) {
      for (let col = 0; col < 5; col++) {
        if (board[row][col]) {
          if (
            board[row][col] === board[row - 1][col + 1]
            && board[row][col] === board[row - 2][col + 2]
            && board[row][col] === board[row - 3][col + 3]
            && board[row][col] === board[row - 4][col + 4]
          ) {
            return board[row][col];
          }
        }
      }
    }
  }

  checkDiagonalLeft(board) {
    // Check only if row is 4 or greater AND column is 4 or greater
    for (let row = 4; row < 6; row++) {
      for (let col = 4; col < 9; col++) {
        if (board[row][col]) {
          if (
            board[row][col] === board[row - 1][col - 1]
            && board[row][col] === board[row - 2][col - 2]
            && board[row][col] === board[row - 3][col - 3]
            && board[row][col] === board[row - 4][col - 4]
          ) {
            return board[row][col];
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          return null;
        }
      }
    }
    return 'draw';
  }

  checkAll(board) {
    return (
      this.checkVertical(board)
      || this.checkDiagonalRight(board)
      || this.checkDiagonalLeft(board)
      || this.checkHorizontal(board)
      || this.checkDraw(board)
    );
  }
};
