// Объявляем переменные для всех кнопок

var numbers = document.querySelectorAll('.number');
console.log(numbers);
var operations = document.querySelectorAll('.operator');
console.log(operations);
var point = document.getElementById('decimal');
console.log(point);
var clearBtns = document.querySelectorAll('.clear-btn');

var resultButton = document.getElementById('result');
console.log(result);
var display = document.getElementById('display');
var memoryCurrentNumber = 0;
var memoryNewNumber = false;
var memoryPendingOperation = '';

//var whatDoButton = document.getElementById('whatDo')
//console.log(whatDoButton);



// Обработчики событий

for (var i=0; i<numbers.length; i++){
    var number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.outerText);
    });
};

for (var i=0; i<operations.length; i++){
    var operationButton = operations[i];
    operationButton.addEventListener('click', function(e) {
        operation(e.target.outerText);
    });
};

for (var i=0; i<clearBtns.length; i++){
    var clearButton = clearBtns[i];
    clearButton.addEventListener('click', function(e) {
        clear(e.srcElement.id) 
    });
};

point.addEventListener('click', decimal);

resultButton.addEventListener('click', result);




//Функции

function numberPress(number) {
    if(display.value === '0') {
        display.value = number;
    } else {
        display.value += number;
    }
    console.log('Клик по кнопке с номером ' + number);
};

function operation(symbol) {
    console.log('Клик по кнопке с операцией ' + symbol);
};

function clear(id) {
    console.log('Клик по кнопке ' + id);
};

function decimal() {
    console.log('Клик по кнопке .');
};

function result() {
    console.log('Клик по кнопке результат');
}

//function whatDo() {

//};


