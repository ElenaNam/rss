// Объявляем переменные для всех кнопок

let numbers = document.querySelectorAll('.number');

let operations = document.querySelectorAll('.operator');

let point = document.getElementById('decimal');

let clearBtns = document.querySelectorAll('.clear-btn');

let resultButton = document.getElementById('result');

let sqrtButton = document.getElementById('square');

let plusMinusButton = document.getElementById('plusMinus');



let display = document.getElementById('display');

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

//let whatDoButton = document.getElementById('whatDo')
//console.log(whatDoButton);



// Обработчики событий

for (let i=0; i < numbers.length; i++){
    let number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.outerText);
    });
};

for (let i=0; i < operations.length; i++){
    let operationButton = operations[i];
    operationButton.addEventListener('click', function(e) {
        operation(e.target.outerText);
        console.log(e.target.outerText);
    });
};

for (let i=0; i < clearBtns.length; i++){
    let clearButton = clearBtns[i];
    clearButton.addEventListener('click', function(e) {       
        clear(e.target.id);       
    });
};

point.addEventListener('click', decimal);

resultButton.addEventListener('click', result);


sqrtButton.addEventListener('click', square);
plusMinusButton.addEventListener ('click', minusPlus);



//Функции

function numberPress(number) {
    if(MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
         if(display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }

};

function operation(symbol) {
    let localOperationMemory = display.value;
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;

        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '^'){
            MemoryCurrentNumber = +Math.pow(MemoryCurrentNumber, localOperationMemory);
            /*MemoryCurrentNumber **= parseFloat(localOperationMemory)*/;             
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);  //равно
        };
        //MemoryCurrentNumber = Math.round(MemoryCurrentNumber * 10000) / 10000;  //computation.toFixed(10).replace(/0*$/, '')
        display.value = MemoryCurrentNumber;
        //display.value = parseFloat(MemoryCurrentNumber.toFixed(10));
        MemoryPendingOperation = symbol; 
        //MemoryNewNumber = true;    
       
    };
      
};

function clear(id) {
    if (id == 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
     
        
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = '0';
        MemoryPendingOperation = ''; 
      
    }   
};

function decimal() {
    let localDecimalMemory = display.value;
    if(MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else { 
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';    
        }
    }
    display.value = localDecimalMemory;    
};

function square() {  

    if (display.value.indexOf('-') !== -1) {
        display.value = 'Ошибка!';
    } else {
        display.value = +Math.sqrt(display.value);
    } 
    
}

function minusPlus() {
   
    let localMinusMemory = display.value;
   
    if (MemoryNewNumber = true) {
            localMinusMemory = parseFloat(localMinusMemory) * (-1);
    //display.value =  (display.value * (-1);
    display.value = localMinusMemory;
    
    }
    MemoryCurrentNumber = display.value;
    
}








//function whatDo() {

//};

