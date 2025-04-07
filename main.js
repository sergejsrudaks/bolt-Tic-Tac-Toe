const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const currentPlayerDisplay = document.getElementById('current-player');
    const xScoreDisplay = document.getElementById('x-score');
    const oScoreDisplay = document.getElementById('o-score');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let xScore = 0;
    let oScore = 0;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function handleCellClick(event) {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

      if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
      }

      board[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;

      checkResult();
    }

    function checkResult() {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
          continue;
        }

        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        alert(`Player ${currentPlayer} has won!`);
        gameActive = false;

        // Update scores
        if (currentPlayer === 'X') {
          xScore++;
          xScoreDisplay.textContent = xScore;
        } else {
          oScore++;
          oScoreDisplay.textContent = oScore;
        }

        return;
      }

      let roundDraw = !board.includes('');
      if (roundDraw) {
        alert('Game ended in a draw!');
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      currentPlayerDisplay.textContent = currentPlayer;
    }

    function resetBoard() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;

      cells.forEach(cell => cell.textContent = '');
      currentPlayerDisplay.textContent = currentPlayer;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetBoard);
