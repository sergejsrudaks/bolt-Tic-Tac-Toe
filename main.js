const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

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
        return;
      }

      let roundDraw = !board.includes('');
      if (roundDraw) {
        alert('Game ended in a draw!');
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetBoard() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;

      cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetBoard);
