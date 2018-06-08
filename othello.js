"use strict";

function othello() {

    const blockSize = 50;
    let color = Stone.black;

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

        console.log("column " + col + " and row " + row);

        let move = new Move(row,col);

        if (board.isValidMove(move, color) && color === Stone.black) {
            drawStone(move, color);
            //hier op basis van move.coveredStones alle nodige stenen omkeren
            turnStones(move, color);
            updateScore();
            //needs to be reactivated once other player there
            //color = Stone.white;
        }

    }

    //dit later refactoren zodat het hergebruikt kan worden in validMove
    function drawBoard(board) {
        for (let row = 0; row < board.numberOfRows; row++) {
            for (let col = 0; col < board.numberOfColumns; col++) {
                let move = new Move(row,col);
                drawSquare(row, col);
                drawStone(move, board.stones[row][col]);
                updateScore();
            }
        }        
     
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
    }
}




 
