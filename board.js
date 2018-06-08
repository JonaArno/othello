"use strict";

class Board {

    constructor(numberOfRows, numberOfColumns) {

        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        this.stones = getStones();
    
        function getStones() {

            let result = [];

            for (let row = 0; row < numberOfRows ; row++) {
                result.push([]);
                for (let column = 0; column < numberOfColumns; column++) {
                    result[row].push(Stone.empty);
                }
            }
        
            return result;
        }
    }

    initialise() {
        let row = (this.numberOfRows / 2) - 1;
        let col = (this.numberOfColumns / 2) - 1;
        this.stones[row][col] = Stone.white;
        this.stones[row + 1][col + 1] = Stone.white;
        this.stones[row + 1][col] = Stone.black;
        this.stones[row][col + 1] = Stone.black;
    }

    isValidMove(move, color) {
        return this.isWithinBoardLimits(move.row,move.column) &&
            this.isEmpty(move.row, move.column) &&
            this.circlesOtherPlayer(move, color);
    }

    circlesOtherPlayer(move, color) {
        for (let index = 0 ; index < directions.length; index++) {
            let coveredStonesCollection = this.circlesOtherPlayerDirection(move,color,directions[index]);

            if (coveredStonesCollection.length) {
                for (let stone = 0; stone < coveredStonesCollection.length; stone++) {
                    move.coveredStones.push(coveredStonesCollection[stone]);
                }
            }
        }

        for (let index = 0; index < move.coveredStones.length; index++) {
            if (index === 0) {
                this.stones[move.row][move.column] = color;
            }
            let row = move.coveredStones[index].row;
            let column = move.coveredStones[index].column;
            this.stones[row][column] = color;
        }
        return move.coveredStones.length;
    }

    circlesOtherPlayerDirection(move, color, direction) {
        let coveredStones = [];
        let collection = [];
        let that = this;
        let newRow = move.row;
        let newColumn = move.column;

        exploreDirection(newRow, newColumn, color, direction);

        function exploreDirection(row, column,color,direction) {
            newRow += direction.rowFactor;
            newColumn += direction.columnFactor;

            if (!(that.isWithinBoardLimits(newRow,newColumn))) {
                return;
            }

            let newFieldCoordinate = new Move(newRow, newColumn);
            let newFieldColor = that.stones[newRow][newColumn];

            if (that.fieldBelongsToOtherColor(newFieldColor, color)) {
                collection.push(newFieldCoordinate);
                exploreDirection(newRow, newColumn, color, direction);
            }

            if (that.collectionIsEnclosed(collection, newFieldColor, color)) {
                coveredStones = collection;
            }
        }
        return coveredStones;
    }

    fieldBelongsToOtherColor(fieldColor, color) {
        return (( fieldColor !== color ) && ( fieldColor !== Stone.empty ));
    }

    collectionIsEnclosed(collection, field, color) {
        return collection.length && field === color;
    }
      
    isWithinBoardLimits(row, col) {
        return row >= 0 && row < this.numberOfRows && col >= 0 && col < this.numberOfColumns; 
    }

    isEmpty(row, col) {
        return this.stones[row][col] === Stone.empty;
    }

}