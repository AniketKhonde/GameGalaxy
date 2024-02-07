const board = document.getElementById('board');
        const message = document.getElementById('message');
        const restartButton = document.getElementById('restart-button');
        const cells = [];
        let currentPlayer = 'X';
        let gameActive = true;

        function goHome() {
            window.location.href = "index.html"
        }
        // Create the game board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', makeMove);
                board.appendChild(cell);
                cells.push(cell);
            }
        }

        function makeMove() {
            if (!gameActive || this.textContent !== '') return;

            // Player's move
            this.textContent = currentPlayer;
            if (checkWinner()) {
                announceWinner();
                return;
            }

            // Check for a draw
            if (isBoardFull()) {
                announceDraw();
                return;
            }

            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            // Computer's move
            if (gameActive) {
                makeComputerMove();
                if (checkWinner()) {
                    announceWinner();
                    return;
                }
                // Check for a draw again after computer's move
                if (isBoardFull()) {
                    announceDraw();
                }
            }
        }

        function makeComputerMove() {
            const emptyCells = cells.filter(cell => cell.textContent === '');
            if (emptyCells.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const computerMove = emptyCells[randomIndex];
                computerMove.textContent = currentPlayer;
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];
        
            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (cells[a].textContent !== '' &&
                    cells[a].textContent === cells[b].textContent &&
                    cells[a].textContent === cells[c].textContent) {
                    highlightWinner(combination);
                    return true;
                }
            }
        
            return false;
        }

        function isBoardFull() {
            return cells.every(cell => cell.textContent !== '');
        }

        function highlightWinner(winningCombination) {
            for (const index of winningCombination) {
                cells[index].classList.add('winning-cell');
            }
        }

        function announceWinner() {
            gameActive = false;
            Swal.fire({
                title: `Player with green BG wins!`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }

        function announceDraw() {
            gameActive = false;
            Swal.fire({
                title: 'It\'s a draw!',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        }

        function restartGame() {
            window.location.reload();
        }

        function goHome() {
            window.location.href = "../html/index.html";
        }