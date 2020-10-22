// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focustoday = document.getElementById('focustoday'),
    date1 = document.getElementById('date1');
    
    input = document.getElementById('input');


// Options
//const showAmPm = true;

const months = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря'    
}
//const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];     //работает и с массивом и с объектом
const days = {0: 'Воскресенье', 1: 'Понедельник', 2: 'Вторник', 3: 'Среда', 4: 'Четверг', 5: 'Пятница', 6: 'Суббота'};

// Show Time  функция показа времени
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        month = today.getMonth(),
        //month = today.toLocaleString('ru', {month: 'long'}),  //месяц в именительном падеже
        day = today.getDay();
        date = today.getDate();

// 24hr Format 
    hour = hour % 24 || 24;

   
// Output Date
   date1.innerHTML = `${date} ${months[month]}<span>, </span>${String(days[day]).toLowerCase()}`;


// Output Time    
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    setTimeout(showTime, 1000); // показывать каждую секунду
}

// Add Zeros 
function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();
    if(hour > 6 && hour < 12) {
        // Morning   
        document.body.style.backgroundImage = "url('../img/morning.jpg')";  
        greeting.textContent = 'Доброе утро \n';  
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('img/afternoon.jpg')";  
        greeting.textContent = 'Добрый день \n'; 
    } else if (hour < 24) {
        // Evening
        document.body.style.backgroundImage = "url('img/evening.jpg')";  
        greeting.textContent = 'Добрый вечер \n'; 
    } 
    else {
        // Night
        document.body.style.backgroundImage = "url('../img/night.jpg')";  
        greeting.textContent = 'Доброй ночи \n'; 
        document.body.style.color = 'white';   
    }
}

//for(i=0; i<input.length; i++){
   // input[i].setAttribute('size',input[i].getAttribute('placeholder').length);}




// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {                // если в лок.хр имя - это null
        name.textContent = 'Введите имя';                       // то выводится "Введите имя"
    } else {                                                    // если что-то появилось
        name.textContent = localStorage.getItem('name');        // то запиши это в лок.хр, это будет имя
    }
}




// Set Name
function setName(e) {
    if(e.type === 'keypress') {                                        // если нажата клавиша
        //убедиться что нажат Enter
        if(e.which == 13 || e.keyCode == 13) {                      //13 - это Enter
            localStorage.setItem('name', e.target.innerText);   // сохранить в лок.хр пару (ключ,значение)
            name.blur();
        }

    } else if (e.type === 'click') {                     // если был клик мышкой
        name.textContent = '';                           // очисти поле ввода
        //localStorage.removeItemKey('name');             // удали из лок.хр предыдущее имя
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}


// Get Focus
function getFocus() {
    if (localStorage.getItem('focustoday') === null) {
        focustoday.textContent = 'Введите цель';        
    } else {
        focustoday.textContent = localStorage.getItem('focustoday');
    }
}

// Set Focus

function setFocus(e) {
    if(e.type === 'keypress') {
        //убедиться что нажат Enter
        if(e.which == 13 || e.keyCode == 13) {                      //13 - это Enter
            localStorage.setItem('focustoday', e.target.innerText);
            name.blur();
        }

    } else if (e.type === 'click') {                             // если был клик мышкой
        focustoday.textContent = '';                           // очисти поле ввода
        //localStorage.removeItemKey('focustoday');             // удали из лок.хр предыдущую цель
    } else {
        localStorage.setItem('focustoday', e.target.innerText);
    }
}



// обработчики событий
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name. addEventListener('click', setName);

focustoday.addEventListener('keypress', setFocus);
focustoday.addEventListener('blur', setFocus);
//focustoday. addEventListener('click', setFocus);



// Run 
showTime();
setBgGreet();
getName();
getFocus();