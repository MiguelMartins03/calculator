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
        if(operator){
            if(secondNumber.includes("%")){
                operate(+firstNumber, +secondNumber, operator);
                operator = "*";
                secondNumber += button.textContent;
            }else{
                secondNumber += button.textContent;
            }
        }else{
            if(firstNumber.includes("%")){
                operate(+firstNumber, +secondNumber, operator);
                operator = "*";
                firstNumber += button.textContent;
            }else{
                firstNumber += button.textContent;
            }
        }
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

const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
    if(!firstNumber){
        firstNumber = "0.";
    }else if(!operator && !firstNumber.includes(".")){
        firstNumber += ".";
    }else if(!secondNumber && operator){
        secondNumber = "0.";
    }else if(!secondNumber.includes(".") && operator){
        secondNumber += ".";
    }
    updateDisplay();
});

const percentage = document.querySelector("#percentage");
percentage.addEventListener("click", () => {
    if(!operator){
        firstNumber += "%";
    }else if(operator && secondNumber){
        secondNumber += "%";
    }
    updateDisplay();
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => {
    if(!secondNumber && operator){
        alert("Invalid format!");
    }else if(firstNumber.includes("%") && !secondNumber){
        operate(firstNumber, 0, "+");
    }else{
        operate(firstNumber, secondNumber, operator);
    }
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {firstNumber = ""; secondNumber = ""; operator = ""; updateDisplay()});

function operate(x, y, operation){
    if(x.includes("%")){
        x = +(x.slice(0,-1));
        x /= 100;
    }else if(y.includes("%")){
        y = +(y.slice(0,-1));
        y /= 100;
    }
    x = +x;
    y = +y;
    switch(operation){
        case "+":
            display.textContent = x + y;
            prepareNextOperation();
            break;
        case "-":
            display.textContent = x - y;
            prepareNextOperation();
            break;
        case "*":
            display.textContent = x * y;
            prepareNextOperation();
            break;
        case "/":
            if(y === 0){
                alert("Impossible to divide by 0!");
            }else{
                display.textContent = Math.round((x / y) * 10**10) / 10**10;
                prepareNextOperation();
            }
            break;
    }
}

function prepareNextOperation(){
    firstNumber = display.textContent;
    secondNumber = "";
    operator = "";
}