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
        return this.isWithinBoardLimits(move.row,move.col) &&
            this.isEmpty(move.row, move.col) &&
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
        return move.coveredStones.length;
    }

    /*
    circlesOtherPlayerDirection(move, color, direction) {
        let otherPlayer = Stone.otherColor(color);

        if (this.isWithinBoardLimits(row+direction.rowFactor, col+direction.columnFactor) 
            && !this.isEmpty(row+direction.rowFactor, col+direction.columnFactor) 
            && this.stones[row+direction.rowFactor][col+ direction.columnFactor] === Stone.otherPlayer) {

            row += direction.rowFactor * 2;
            col += direction.columnFactor * 2;

            while (this.isWithinBoardLimits(row,col) && !this.isEmpty(row,col)) {
            
                if (this.stones[row][col] === color) return true;
                
                row += direction.rowFactor;
                col += direction.columnFactor;
            }
        }   
        return false;
    }
    */

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
            let newFieldColor = this.stones[newRow][newColumn];

            if (this.fieldBelongsToOtherColor(newFieldColor, color)) {
                collection.push(newFieldCoordinate);
                exploreDirection(newRow, newColumn, color, direction);
            }

            if (this.collectionIsEnclosed(collection, newFieldColor, color)) {
                coveredStones = collection;
            }
        }
        return coveredStones;
    }

    fieldBelongsToOtherColor(fieldColor, color) {
        return fieldColor !== color;
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