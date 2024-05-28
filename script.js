function GameBoard() {
    // let cell = Mark();
    let board = [];
    const boardSize = 3;

    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i].push(`${i}${j}`);
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

    const checkAvailable = function (move) {
        const cell = getBoardPosition(move);
        if (board[cell.row][cell.col] === `${cell.row}${cell.col}`){
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
        board[cell.row].forEach(item => item === mark ? isWinner = true : isWinner = false); // Change to the other way around
        return isWinner;
    }

    const checkColWinner = function (position, mark) {
        const cell = getBoardPosition(position);
        arrCol = [];
        let isWinner = false;
        board.forEach(row => arrCol.push(row[cell.col]));
        arrCol.forEach(item => item === mark ? isWinner = true : isWinner = false);
        return isWinner;
    }

    const checkDiagonalWinner = function (mark) {
        let isWinner = false;
        if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark)  {
            isWinner = true;
        } else if (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark) {
            isWinner = true;
        }
        return isWinner;
    }

    return {
        board,
        getBoard,
        checkAvailable,
        putMark,
        checkRowWinner,
        checkColWinner,
        checkDiagonalWinner
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
        board.getBoard();
        console.log(`It's ${activePlayer.name} turn`);
        playRound();
    }

    const playRound = function () {
        let move = prompt(`${activePlayer.name}, What cell you choose?`);
        board.checkAvailable(move); // Assume Fair Play for now
        board.putMark(move, activePlayer.token);
        board.getBoard();
        if (victory(move, activePlayer.token) === true) {
            gameOver(activePlayer);
            return false;
        }
        changeActive();
        startNewRound();
    };

    const victory = function (position, mark) {
        let isWinner = false;
        if (board.checkRowWinner(position, mark) === true) {
            isWinner = true;
            console.log("Guilty Row");
        } else if (board.checkColWinner(position, mark) === true) {
            isWinner = true;
            console.log("Guilty Col");
        } else if (board.checkDiagonalWinner(mark) === true ) {
            isWinner = true;
            console.log("Guilty Diag");
        };
        return isWinner;
    }

    const gameOver = function (player) {
        console.log(`Congratulations ${player.name}, you win!`)
    }

    // Initiate Game
    startNewRound();

};

GameController();

// function test() {
//     const board = GameBoard().board; // CHANGE THIS ALSO, NO VARIABLE CAN DIRECT ACCESS
//     const col = 1;
//     function check() { 
//         let isWinner = false;
//         board.forEach(row => {
//             console.log(row[col])
//             if (row[col] === "11"){
//                 isWinner = true;
//             }
//         });
//         return isWinner;
//     };

//     if (check() === true) {
//         console.log("true")
//     };
// }

// test();