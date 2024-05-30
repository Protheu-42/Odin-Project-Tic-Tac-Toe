function GameBoard() {
    let board = [];
    const boardSize = 3;

    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i].push(`0`);
        }
    };

    const getBoard = () => console.table(board); // CHANGE THIS CONSOLE LOG LATER

    const getBoardPosition = function (cell) {
        const row = cell.charAt(0);
        const col = cell.charAt(1);

        return {
            row, col
        };
    }

    const isBoardFull = function () {
        let isFull = true;
        board.forEach(row => {
            row.forEach(cell => {
                if (cell === "0"){
                    isFull = false;
                }
            })
        })
        return isFull;
    }

    const checkAvailable = function (move) {
        const cell = getBoardPosition(move);
        if (board[cell.row][cell.col] === `0`){
            return true;
        } else {
            return false;
        }
    };

    const putMark = function (position, mark) {
        const cell = getBoardPosition(position)
        board[cell.row][cell.col] = mark;
    };

     const checkRowWinner = function (position, mark) {
        const cell = getBoardPosition(position);
        let isWinner = true;
        board[cell.row].forEach(item => {
            if (item != mark) {
                isWinner = false;
                return false;
            }
        });
        return isWinner;
    }

    const checkColWinner = function (position, mark) {
        const cell = getBoardPosition(position);
        let arrCol = [];
        let isWinner = true;
        board.forEach(row => arrCol.push(row[cell.col]));
        arrCol.forEach(item => {
            if (item != mark) {
                isWinner = false;
                return false;
            }
        });
        return isWinner;
    }

    const checkDiagonalWinner = function (mark) {
        let isWinner = false;
        if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark)  {
            isWinner = true;
            return true;
        } else if (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark) {
            isWinner = true;
            return true;
        }
        return isWinner;
    }

    return {
        getBoard,
        checkAvailable,
        putMark,
        checkRowWinner,
        checkColWinner,
        checkDiagonalWinner,
        isBoardFull
    };
};


function GameController() {
    const board = GameBoard();
    const player = [
        {
            name: "Player One",
            token: "X"
        },
        {
            name: "Player Two",
            token: "O"
        }
    ];

    let activePlayer = player[0];

    const changeActive = function () {
        if (activePlayer === player[0]) {
            activePlayer = player[1];
        } else {
            activePlayer = player[0];
        }
    };

    const startNewRound = function () {
        console.log(`It's ${activePlayer.name} turn`);
        playRound();
    }

    const playRound = function () {
        let move;
        board.getBoard();
        do {
            move = prompt(`${activePlayer.name}, What cell you choose?`);
        } while (board.checkAvailable(move) === false); // Make sure not to overlap marks
        board.putMark(move, activePlayer.token);
        if (victory(move, activePlayer.token) === true) {
            board.getBoard();
            gameOver(activePlayer);
            return false;
        }
        if (checkTie() === true) {
            board.getBoard();
            console.log("Is a Tie!");
            return false;
        }
        changeActive();
        startNewRound();
    };

    const victory = function (position, mark) {
        let isWinner = false;
        if (board.checkRowWinner(position, mark) === true) {
            isWinner = true;
            console.log("Row Guilty")
        } else if (board.checkColWinner(position, mark) === true) {
            isWinner = true;
            console.log("Col Guilty")
        } else if (board.checkDiagonalWinner(mark) === true ) {
            isWinner = true;
            console.log("Diag Guilty")
        };
        return isWinner;
    }

    const checkTie = function () {
        let isATie = false;
        if (board.isBoardFull() === true) {
            isATie = true;
        }
        return isATie;
    }

    const gameOver = function (player) {
        console.log(`Congratulations ${player.name}, you win!`)
    }

    // Initiate Game
    startNewRound();

};

GameController();