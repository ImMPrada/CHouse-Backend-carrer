"use strict";
exports.__esModule = true;
var ops = {
    operation: function (num1, num2, op) {
        switch (op.toLowerCase()) {
            case 'suma':
                return num1 + num2;
            case 'resta':
                return num1 > num2 ? num1 - num2 : num2 - num1;
            default:
                break;
        }
    }
};
exports["default"] = ops;