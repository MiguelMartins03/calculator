let firstNumber = "";
let secondNumber = "";
let operator = "";

let display = document.querySelector("#display");

const numbers = document.querySelectorAll(".num");
numbers.forEach(button => {
    button.addEventListener("click", () => {
        operator ? secondNumber += button.textContent : firstNumber += button.textContent;
        updateDisplay();
    });    
});

const operators = document.querySelectorAll(".operator");
operators.forEach(button => {
    button.addEventListener("click", () => {
        operator = button.textContent;
        updateDisplay();
    });    
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => operate(+firstNumber, +secondNumber, operator));

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {firstNumber = ""; secondNumber = ""; operator = ""; updateDisplay()});

function operate(x, y, operator){
    switch(operator){
        case "+":
            display.textContent = x + y;
            firstNumber = display.textContent;
            break;
        case "-":
            display.textContent = x - y;
            firstNumber = display.textContent;
            break;
        case "*":
            display.textContent = x * y;
            firstNumber = display.textContent;
            break;
        case "/":
            display.textContent = x / y;
            firstNumber = display.textContent;
            break;
        default:
            alert("Invalid format!");
    }
}