document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const overlay = document.getElementById("overlay");
    const winnerText = document.querySelector(".winner-text");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the game board dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = i;
        cell.addEventListener("click", () => handleCellClick(i));
        
        const symbol = document.createElement("div");
        symbol.className = "symbol";
        cell.appendChild(symbol);

        board.appendChild(cell);
    }

    // Function to handle a cell click
    function handleCellClick(index) {
        if (gameBoard[index] === "" && !isGameOver()) {
            gameBoard[index] = currentPlayer;
            const cell = document.getElementById(index);
            cell.classList.add("played");
            cell.querySelector(".symbol").innerText = currentPlayer;

            if (isWinner()) {
                winnerText.innerText = `GAME OVER  Player ${currentPlayer} wins!`;
                showOverlay();
            } else if (isBoardFull()) {
                winnerText.innerText = "Match draw!";
                showOverlay();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Function to check if there is a winner
    function isWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    // Function to check if the board is full (draw)
    function isBoardFull() {
        return gameBoard.every(cell => cell !== "");
    }

    // Function to check if the game is over
    function isGameOver() {
        return isWinner() || isBoardFull();
    }

    // Function to show the overlay
    function showOverlay() {
        overlay.style.display = "flex";
    }

    // Function to hide the overlay
    function hideOverlay() {
        overlay.style.display = "none";
    }

    // Function to reset the game
    window.resetGame = function() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("played");
            cell.querySelector(".symbol").innerText = "";
        });
        hideOverlay();
    };
});
