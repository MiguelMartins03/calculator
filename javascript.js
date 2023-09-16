let firstNumber = "";
let secondNumber = "";
let operator = "";

let display = document.querySelector("#display");

function updateDisplay(){
    display.textContent = firstNumber + operator + secondNumber;
}

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
        if(!firstNumber){
            alert("Invalid format!");
        }else if(!secondNumber){
            operator = button.textContent;
            updateDisplay();
        }else{
            operate(+firstNumber, +secondNumber, operator);
            operator = button.textContent;
            updateDisplay();
        }
    });    
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => {
    if(!secondNumber && operator){
        alert("Invalid format!");
    }else{
        operate(+firstNumber, +secondNumber, operator);
    }
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {firstNumber = ""; secondNumber = ""; operator = ""; updateDisplay()});

function operate(x, y, operation){
    switch(operation){
        case "+":
            display.textContent = x + y;
            firstNumber = display.textContent;
            secondNumber = "";
            operator = "";
            break;
        case "-":
            display.textContent = x - y;
            firstNumber = display.textContent;
            secondNumber = "";
            operator = "";
            break;
        case "*":
            display.textContent = x * y;
            firstNumber = display.textContent;
            secondNumber = "";
            operator = "";
            break;
        case "/":
            if(y === 0){
                alert("Impossible to divide by 0!");
            }else{
                display.textContent = Math.round((x / y) * 10**10) / 10**10;
                firstNumber = display.textContent;
                secondNumber = "";
                operator = "";
            }
            break;
    }
}