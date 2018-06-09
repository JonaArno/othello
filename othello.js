"use strict";

function othello() {

    const blockSize = 50;
    //rewrite to make this redundant?
    let color = Stone.black;
    let validMoves = [];

    let canvas = document.getElementById("bordCanvas");
    let ctx = canvas.getContext("2d");
    canvas.addEventListener('click', boardClick, false);

    let board = new Board(8,8);
    board.initialise();
    drawBoard(board);
    
    function boardClick(event) {
        let x = event.pageX - canvas.offsetLeft;
        let y = event.pageY - canvas.offsetTop;

        let row = Math.floor(y / blockSize);
        let col = Math.floor(x / blockSize);

        //remove once application completed
        console.log("column " + col + " and row " + row);

        let move = new Move(row,col);

        if (board.isValidMove(move, color) && color === Stone.black) {
            drawStone(move, color);
            turnStones(move, color);
            removePlacedStoneFromValidMovesCollection(move);
            removePossibleMoves();
            updateScore();

            //niet de cleanste manier
            setTimeout(function() {
                whitePlayerTurnRandom();
                while ((board.getValidMovesForColor(Stone.black) === undefined) || ((board.getValidMovesForColor(Stone.black)).length === 0)) {
                    setTimeout(function() {
                        whitePlayerTurnRandom();
                    }, 2000);                  
                }
                drawAllAvailableMoves();               
            }, 2000);



            //IS THIS EVEN NECESSARY? Remove references and hardcode?
            //color = Stone.white;
        }
    }

    function whitePlayerTurnRandom() {
        //check if no move possible first
        if ((board.getValidMovesForColor(Stone.white) !== undefined) || ((board.getValidMovesForColor(Stone.white)).length !== 0)) {
            let moveToExecute = board.pickRandomMoveFromMovesCollection(board.getValidMovesForColor(Stone.white));
            if (moveToExecute !== undefined) {
                board.circlesOtherPlayer(moveToExecute, Stone.white);
                drawStone(moveToExecute, Stone.white);
                turnStones(moveToExecute, Stone.white);
                updateScore();
            }
        }
    }

    function removePlacedStoneFromValidMovesCollection(move) {
        for (let item = 0; item < validMoves.length; item++) {
            if (validMoves[item].row === move.row && validMoves[item].column === move.column) {
                validMoves.splice(item, 1);
            }
        }
    }

    //dit later refactoren zodat het hergebruikt kan worden in validMove
    function drawBoard(board) {
        for (let row = 0; row < board.numberOfRows; row++) {
            for (let col = 0; col < board.numberOfColumns; col++) {
                let move = new Move(row,col);
                drawSquare(row, col);
                drawStone(move, board.stones[row][col]);            
            }
        }
        drawAllAvailableMoves();
        updateScore();      
    }  

    function drawSquare(row, col) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.strokeStyle = "silver";
        ctx.rect(col * blockSize, row * blockSize, blockSize, blockSize);
        ctx.fill();
        ctx.stroke();
    }

    function drawStone(move, stone) {
        if (stone == Stone.white || stone == Stone.black) {
            let offset = blockSize / 2;
            ctx.beginPath();
            ctx.fillStyle = stone == Stone.black ? "black" : "white";
            ctx.arc(move.column * blockSize + offset, move.row * blockSize + offset, 20, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function turnStones(move, color) {
        for (let index = 0; index < move.coveredStones.length; index++) {
            drawStone(move.coveredStones[index] ,color);
        }
    }
    
    function drawAllAvailableMoves() {
        validMoves = board.getValidMovesForColor(Stone.black);

        for (let index = 0 ; index < validMoves.length; index++) {
            drawAvailableMove(validMoves[index]);
        }
    }

    function removePossibleMoves() {
        for (let index = 0; index < validMoves.length; index++) {
            drawSquare(validMoves[index].row, validMoves[index].column);
        }
        validMoves = [];
    }

    function drawAvailableMove(move) {
        let offset = blockSize / 2;
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(move.column * blockSize + offset, move.row * blockSize + offset, 4, 0, Math.PI *2);
        ctx.fill();
    }

    function updateScore() {
        let scoreWhite = 0;
        let scoreBlack = 0;

        for (let row = 0 ; row < board.numberOfRows; row++) {
            for (let col = 0 ; col < board.numberOfColumns ; col++) {
                if (board.stones[row][col] !== Stone.empty) {
                    board.stones[row][col] == Stone.black ? scoreBlack += 1 : scoreWhite += 1;
                }
            }
        }

        document.getElementById("scoreBord").innerText = "Wit: " + scoreWhite + " /// Black: " + scoreBlack;

        // check if game is over
        if (board.getValidMovesForColor(Stone.black).length === 0 && board.getValidMovesForColor(Stone.white).length === 0) {
            scoreWhite > scoreBlack ? alert("White beat black with a score of " + scoreWhite + " against " + scoreBlack) 
            : scoreBlack > scoreWhite ? alert("Black beat white with a score of " + scoreBlack + " against " + scoreWhite)
            : alert("The game ended in a draw. Both players ended on a score of " + scoreBlack);
        }


    }
}




 
