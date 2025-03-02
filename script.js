$(document).ready(function () {
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameOver = true;
                return board[a];
            }
        }
        return board.includes('') ? null : 'Draw';
    }

    function renderBoard() {
        $('#board').empty();
        board.forEach((cell, index) => {
            let cellElement = $(`<div class='cell'>${cell}</div>`);
            if (cell) cellElement.addClass('taken');
            cellElement.click(() => {
                if (!cell && !gameOver) {
                    board[index] = currentPlayer;
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    renderBoard();
                    let winner = checkWinner();
                    if (winner) {
                        $('#message').text(winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`);
                    }
                }
            });
            $('#board').append(cellElement);
        });
    }

    $('#reset').click(() => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        $('#message').text('');
        renderBoard();
    });

    renderBoard();
});