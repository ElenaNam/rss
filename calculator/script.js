// Объявляем переменные для всех кнопок

var numbers = document.querySelectorAll('.number');
//console.log(numbers);
var operations = document.querySelectorAll('.operator');
//console.log(operations);
var point = document.getElementById('decimal');
//console.log(point);
var clearBtns = document.querySelectorAll('.clear-btn');

var resultButton = document.getElementById('result');
//console.log(result);
var display = document.getElementById('display');
var MemoryCurrentNumber = 0;
var MemoryNewNumber = false;
var MemoryPendingOperation = '';

//var whatDoButton = document.getElementById('whatDo')
//console.log(whatDoButton);



// Обработчики событий

for (var i=0; i < numbers.length; i++){
    var number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.outerText);
    });
};

for (var i=0; i < operations.length; i++){
    var operationButton = operations[i];
    operationButton.addEventListener('click', function(e) {
        operation(e.target.outerText);
    });
};

for (var i=0; i < clearBtns.length; i++){
    var clearButton = clearBtns[i];
    clearButton.addEventListener('click', function(e) {
        //clear(e.target.outerText);
        clear(e.target.id);       
    });
};

point.addEventListener('click', decimal);

//resultButton.addEventListener('click', result);
    

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
    var localOperationMemory = display.value;
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
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);  //равно
        };
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = symbol;
    };


    //console.log('Клик по кнопке с операцией ' + symbol);
};

function clear(id) {
    if (id == 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
        console.log ('sdfsdfsfdsfsdfsd!!!');
        
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = '0';
        MemoryPendingOperation = '';      
    }   
};

function decimal() {
    var localDecimalMemory = display.value;
    if(MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else { 
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';    
        }
    }
    display.value = localDecimalMemory;    
}



//function whatDo() {

//};

