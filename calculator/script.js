// Объявляем переменные для всех кнопок

var numbers = document.querySelectorAll('.number')
console.log(numbers);
var operations = document.querySelectorAll('.operator')
console.log(operations);
var point = document.getElementById('decimal')
console.log(point);
var ce = document.getElementById('ce')
console.log(ce);
var c = document.getElementById('c')
console.log(c);
var result = document.getElementById('result')
console.log(result);
//var whatDoButton = document.getElementById('whatDo')
//console.log(whatDoButton);



// Обработчики событий

for (var i=0; i<numbers.length; i++){
    var number = numbers[i];
    number.addEventListener('click', function(e) {
        console.log('Клик по кнопке с номером')
    });
};

for (var i=0; i<operations.length; i++){
    var operation = operations[i];
    operation.addEventListener('click', function(e) {
        console.log('Клик по кнопке с операцией')
    });
};


point.addEventListener('click', function(e) {
    console.log('Клик по кнопке .')
});

ce.addEventListener('click', function(e) {
    console.log('Клик по кнопке ce')
});


c.addEventListener('click', function(e) {
    console.log('Клик по кнопке c')
});

result.addEventListener('click', function(e) {
    console.log('Клик по кнопке =')
});






function numberPress() {

};

function operation() {

};

function decimal() {

};

//function clear() {

//};

function whatDo() {

};


