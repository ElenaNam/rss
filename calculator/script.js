// Объявляем переменные для всех кнопок

var numbers = document.querySelectorAll('.number')
console.log(numbers);
var operations = document.querySelectorAll('.operator')
console.log(operations);
var point = document.getElementById('decimal')
console.log(point);
var clearBtns = document.querySelectorAll('.clear-btn')

var resultButton = document.getElementById('result')
console.log(result);
//var whatDoButton = document.getElementById('whatDo')
//console.log(whatDoButton);



// Обработчики событий

for (var i=0; i<numbers.length; i++){
    var number = numbers[i];
    number.addEventListener('click', numberPress);
};

for (var i=0; i<operations.length; i++){
    var operationButton = operations[i];
    operationButton.addEventListener('click', operation);
};

for (var i=0; i<clearBtns.length; i++){
    var clearButton = clearBtns[i];
    clearButton.addEventListener('click', function(e) {
        clear(e.srcElement.id) 
    });
};


point.addEventListener('click', decimal);

resultButton.addEventListener('click', result);






function numberPress() {
    console.log('Клик по кнопке с номером');
};

function operation() {
    console.log('Клик по кнопке с операцией');
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


