function GameBoard() {
    let board = [];
    const boardSize = 3;

    const generateEmptyBoard = function () {
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                board[i].push(" ");
            }
        }
    }; 

    generateEmptyBoard();

    const getBoard = () => board;

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
                if (cell === " "){
                    isFull = false;
                }
            })
        })
        return isFull;
    }

    const checkAvailable = function (move) {
        const cell = getBoardPosition(move);
        let isAvailable = false;
        if (board[cell.row][cell.col] === ` `){
            isAvailable = true;
        } else {
            isAvailable = false;
        }
        return isAvailable;
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
        generateEmptyBoard,
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
    const boardContainer = document.querySelector(".game-board");
    const startBtn = document.querySelector(".start-button");
    const messageBoard = document.querySelector(".message-board");
    const changeNameBtnOne = document.querySelector("#playerOneChangeBtn");
    const playerOneChangedName = document.querySelector("#playerOneName");
    
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
        renderMessage(`It's ${activePlayer.name} turn`);
        renderBoard();
    };

    const playRound = function (position) { 
        let move = position;
        if (board.checkAvailable(move) === false) {
            renderMessage("Choose a free cell please");
            return false;
        }
        board.putMark(move, activePlayer.token);
        renderBoard()
        if (victory(move, activePlayer.token) === true) {
            renderBoard()
            gameOver(activePlayer);
            return false;
        }
        if (checkTie() === true) {
            renderBoard();
            gameOver("tie");
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
    };

    const checkTie = function () {
        let isATie = false;
        if (board.isBoardFull() === true) {
            isATie = true;
        }
        return isATie;
    };

    const gameOver = function (playerOrTie) {
        if (playerOrTie === "tie") {
            renderMessage(`It's a Tie!`);
            removeBoardInteraction();
            return false;
        } else {
            renderMessage(`Congratulations ${playerOrTie.name}, you win!`)
            removeBoardInteraction();
            return false;
        }
    };

    // DOM Related EVENTS and DISPLAY
    
    const renderBoard = function () { 
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.firstChild);
        };
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                const cell = document.createElement("button");
                cell.textContent = board.getBoard()[i][j];
                cell.id = `${i}${j}`
                cell.addEventListener("click", () => {
                  playRound(cell.id);
                })
                boardContainer.appendChild(cell);            
            }
        }
    };

    const renderNonInteractableBoard = function () {
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.firstChild);
        };
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                const cell = document.createElement("button");
                cell.textContent = board.getBoard()[i][j];
                cell.id = `${i}${j}`
                boardContainer.appendChild(cell);            
            }
        }
        
    }

    const renderMessage = (message) => messageBoard.textContent = `${message}`;

    startBtn.addEventListener("click", () => {
        board.generateEmptyBoard();
        startNewRound();
        startBtn.textContent = "Restart"
    })

    const removeBoardInteraction = function () {
        renderNonInteractableBoard();
        boardContainer.classList.add("blur");
    }

    // CHANGE NAME INTERACTION

};

GameController()