// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');
// Options
const showAmPm = true;

// Show Time  функция показа времени
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

// Set AM or PM   утро или вечер
    const amPm = hour >= 12 ? 'PM': 'AM';

// 12hr Format 
    hour = hour % 12 || 12;

// Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;

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
    if(hour < 12) {
        // Morning   
        document.body.style.backgroundImage = "url('../img/morning.jpg')";  
        greeting.textContent = 'Доброе утро \n';  
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('img/afternoon.jpg')";  
        greeting.textContent = 'Добрый день \n'; 
    } else {
        // Evening
        document.body.style.backgroundImage = "url('../img/evening.jpg')";  
        greeting.textContent = 'Доброй ночи \n'; 
        document.body.style.color = 'white';   
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = 'Введите имя';        
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if(e.type === 'keypress') {
        //убедиться что нажат Enter
        if(e.which == 13 || e.keyCode == 13) {                      //13 - это Enter
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }

    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}


// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = 'Введите цель';        
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus

function setFocus(e) {
    if(e.type === 'keypress') {
        //убедиться что нажат Enter
        if(e.which == 13 || e.keyCode == 13) {                      //13 - это Enter
            localStorage.setItem('focus', e.target.innerText);
            name.blur();
        }

    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}


// обработчики событий
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);



// Run 
showTime();
setBgGreet();
getName();
getFocus();