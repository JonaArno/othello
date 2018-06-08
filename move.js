"use strict";

class Move {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.coveredStones = [];
    }
}