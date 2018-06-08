"use strict";

class Direction {
    constructor(name, rowFactor, columnFactor) {
        this.name= name;
        this.rowFactor=rowFactor;
        this.columnFactor = columnFactor;
        }   
}

let directions = [
    new Direction("north", -1, 0),
    new Direction("northeast", -1, 1),
    new Direction("east", 0, 1),
    new Direction("southeast", 1, 1),
    new Direction("south", 1, 0),
    new Direction("southwest", 1, -1),
    new Direction("west", 0, -1),
    new Direction("northwest", -1, -1)
];