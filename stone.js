"use strict";

let Stone = {
    empty: 0,
    black: 1, 
    white: 2,
    otherColor: function(color) {
        return color === Stone.black ? Stone.white : Stone.black;
    }
}
