const PI = 3.14159;

function add(a, b) {
    return a + b;
}

class Calculator {
    constructor() {
        console.log("Calculator initialized");
    }

    multiply(a, b) {
        return a * b;
    }
}

// Exporting everything as an object
module.exports = {
    PI,
    add,
    Calculator
};
