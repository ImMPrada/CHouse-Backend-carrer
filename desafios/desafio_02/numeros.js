"use strict";
exports.__esModule = true;
var Numeros = /** @class */ (function () {
    function Numeros(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    Numeros.prototype.getNumeros = function () {
        return [this.num1, this.num2];
    };
    return Numeros;
}());
exports["default"] = Numeros;