// Import the React library
import React from 'react';
// Import the CSS for the ConnectFour component
import './ConnectFour.css';

// Define class ConnectFour that extends React.Component
class ConnectFour extends React.Component {
  // Define the constructor method with parameter list including props
  constructor(props) {
    // Call the super constructor method and pass parameter props
    super(props);
    // Initialize the state object
    this.state = {
      // Initial state of the board: a 6x7 grid filled with zeros
      initialMatrix: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      // Initial state of the current player
      currentPlayer: 1,
    };
  }

  // Define function to handle filling a box
  fillBox = (e) => {
    // Get the column value from the clicked element
    const colValue = parseInt(e.target.getAttribute("data-value"));
    // Attempt to place the piece in the chosen column
    this.setPiece(5, colValue);
    // Switch the current player (1 -> 2 or 2 -> 1)
    this.setState({ currentPlayer: this.state.currentPlayer === 1 ? 2 : 1 });
  };

  // Define function to set a piece in the grid
  setPiece = (startCount, colValue) => {
    const { initialMatrix } = this.state;
    const rows = document.querySelectorAll(".grid-row");

    try {
      // If the cell is already filled, move up to the next row
      if (initialMatrix[startCount][colValue] !== 0) {
        this.setPiece(startCount - 1, colValue);
      } else {
        // Place the piece
        const currentRow = rows[startCount].querySelectorAll(".grid-box");
        currentRow[colValue].classList.add("filled", `player${this.state.currentPlayer}`);
        initialMatrix[startCount][colValue] = this.state.currentPlayer;

        // Check if the current player has won
        if (this.winCheck()) {
          alert(`Player ${this.state.currentPlayer} wins!`);
          return true;
        }
      }
    } catch (e) {
      // Catch errors when a column is full
      alert("Column full, select again");
    }

    // Check if the game is over
    this.gameOverCheck();
  };

  // Define function to check for a win
  winCheck = () => {
    // Check all win conditions
    return (
      this.checkHorizontal() ||
      this.checkVertical() ||
      this.checkPositiveDiagonal() ||
      this.checkNegativeDiagonal()
    );
  };

  // Define horizontal win check
  checkHorizontal = () => {
    const { initialMatrix, currentPlayer } = this.state;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          initialMatrix[row][col] === currentPlayer &&
          initialMatrix[row][col + 1] === currentPlayer &&
          initialMatrix[row][col + 2] === currentPlayer &&
          initialMatrix[row][col + 3] === currentPlayer
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Define vertical win check
  checkVertical = () => {
    const { initialMatrix, currentPlayer } = this.state;
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          initialMatrix[row][col] === currentPlayer &&
          initialMatrix[row + 1][col] === currentPlayer &&
          initialMatrix[row + 2][col] === currentPlayer &&
          initialMatrix[row + 3][col] === currentPlayer
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Define positive diagonal win check
  checkPositiveDiagonal = () => {
    const { initialMatrix, currentPlayer } = this.state;
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          initialMatrix[row][col] === currentPlayer &&
          initialMatrix[row - 1][col + 1] === currentPlayer &&
          initialMatrix[row - 2][col + 2] === currentPlayer &&
          initialMatrix[row - 3][col + 3] === currentPlayer
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Define negative diagonal win check
  checkNegativeDiagonal = () => {
    const { initialMatrix, currentPlayer } = this.state;
    for (let row = 3; row < 6; row++) {
      for (let col = 3; col < 7; col++) {
        if (
          initialMatrix[row][col] === currentPlayer &&
          initialMatrix[row - 1][col - 1] === currentPlayer &&
          initialMatrix[row - 2][col - 2] === currentPlayer &&
          initialMatrix[row - 3][col - 3] === currentPlayer
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Define game over check
  gameOverCheck = () => {
    let count = 0;
    const { initialMatrix } = this.state;

    for (const innerArray of initialMatrix) {
      if (innerArray.every((val) => val !== 0)) {
        count++;
      } else {
        return false;
      }
    }

    if (count === 6) {
      alert("Game over!");
      return true;
    }
  };

  // Render the Connect Four board
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          {[...Array(6)].map((_, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
              {[...Array(7)].map((_, colIndex) => (
                <div
                  className="grid-box"
                  data-value={colIndex}
                  onClick={(e) => this.fillBox(e)}
                  key={colIndex}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div id="information">
          <div className="player-wrappers">
            Player 1 <div className="player1"></div>
          </div>
          <div className="player-wrappers">
            Player 2 <div className="player2"></div>
          </div>
        </div>
      </div>
    );
  }
}

// Export the ConnectFour component
export default ConnectFour;
