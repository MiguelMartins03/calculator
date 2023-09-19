let firstNumber = "";
let secondNumber = "";
let operator = "";

window.addEventListener("keydown", (e) => {
    console.log(e.code)
    // let key = "";
    // switch(true) {
    //     case e.code.includes("Digit"):
    //         key = document.querySelector(`#num${e.code.slice(-1)}`);
    //         key.click();
    //         break;
    //     case e.code.includes("Numpad"):
    //         if(e.code.slice(6).search(/[0-9]/) >= 0){
    //             key = document.querySelector(`#num${e.code.slice(-1)}`);
    //             key.click();
    //         }else if(e.code.slice(6).includes("Enter")){
    //             key = document.querySelector("#equals");
    //             key.click();
    //         }else{
    //             switch(e.code.slice(6)) {
    //                 case "Divide":
    //                     key = document.querySelector("#divide");
    //                     key.click();
    //                     break;
    //                 case "Multiply":
    //                     key = document.querySelector("#multiply");
    //                     key.click();
    //                     break;
    //                 case "Subtract":
    //                     key = document.querySelector("#subtract");
    //                     key.click();
    //                     break;
    //                 case "Add":
    //                     key = document.querySelector("#add");
    //                     key.click();
    //                     break;
    //                 case "Decimal":
    //                     key = document.querySelector("#decimal");
    //                     key.click();
    //                     break;
    //             }
    //         }
    //         break;
    // }
    key = document.querySelector(`button[data-key*="${e.code}"]`);
    if(!key) return;
    key.click();
});

let display = document.querySelector("#display");

function updateDisplay(){
    display.textContent = firstNumber + operator + secondNumber;
    if(display.textContent.length > 9) {
        display.textContent = display.textContent.substring(0, 9);
    }
}

const numbers = document.querySelectorAll(".num");
numbers.forEach(button => {
    button.addEventListener("click", () => {
        if(display.textContent.length < 9){
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
        }
    });
});

const operators = document.querySelectorAll(".operator");
operators.forEach(button => {
    button.addEventListener("click", () => {
        if(display.textContent.length < 9){
            if(!firstNumber){
                alert("Invalid format!");
            }else if(!secondNumber){
                operator = button.textContent;
                updateDisplay();
            }else{
                operate(firstNumber, secondNumber, operator);
                operator = button.textContent;
                updateDisplay();
            }
        }
    });
});

const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
    if(display.textContent.length < 9){
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
    }
});

const percentage = document.querySelector("#percentage");
percentage.addEventListener("click", () => {
    if(display.textContent.length < 9){
        if(!operator){
            firstNumber += "%";
        }else if(operator && secondNumber){
            secondNumber += "%";
        }
        updateDisplay();
    }
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

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
    if(firstNumber && !operator && !secondNumber){
        firstNumber = firstNumber.slice(0,-1);
    }else if(operator && !secondNumber){
        operator = "";
    }else if(secondNumber){
        secondNumber = secondNumber.slice(0,-1);
    }
    updateDisplay();
});

function operate(x, y, operation){
    if(x.includes("%")){
        x = +(x.slice(0,-1));
        x /= 100;
    }
    if(y.includes("%")){
        y = +(y.slice(0,-1));
        y /= 100;
    }
    x = +x;
    y = +y;
    switch(operation){
        case "+":
            prepareNextOperation(x + y);
            break;
        case "-":
            prepareNextOperation(x - y);
            break;
        case "*":
            prepareNextOperation(x * y);
            break;
        case "/":
            if(y === 0){
                alert("Impossible to divide by 0!");
            }else{
                prepareNextOperation(x / y);
            }
            break;
    }
}

function prepareNextOperation(result){
    display.textContent = Math.round((result) * 10**7) / 10**7;
    if(display.textContent.length > 9) {
        display.textContent = display.textContent.substring(0, 9);
    }
    firstNumber = display.textContent;
    secondNumber = "";
    operator = "";
}