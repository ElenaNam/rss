// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focustoday = document.getElementById('focustoday'),
    date1 = document.getElementById('date1'),    
    input = document.getElementById('input'),

    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    humidity = document.querySelector('.humidity'),
    windspeed = document.querySelector('.windspeed'),
    weatherDescription = document.querySelector('.weather-description'),
    city = document.querySelector('.city'),

    quote = document.querySelector('.quote'),
    author = document.querySelector('.author');

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
        name.value = 'Введите имя';                       // то выводится "Введите имя"
    } else {                                                    // если что-то появилось
        name.value = localStorage.getItem('name');        // то запиши это в лок.хр, это будет имя
    }
}




// Set Name
function setName(e) {
    if(e.type === 'keypress') {                                        // если нажата клавиша
        //убедиться что нажат Enter
        if(e.which == 13 || e.keyCode == 13) {                      //13 - это Enter
            localStorage.setItem('name', e.target.value);   // сохранить в лок.хр пару (ключ,значение)
            name.blur();
        }

    } else if (e.type === 'click') {                     // если был клик мышкой
        name.value = '';                                 // очисти поле ввода
        //localStorage.removeItemKey('name');             // удали из лок.хр предыдущее имя
    } else {
        localStorage.setItem('name', e.target.value);
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
           //  ПОГОДА

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=8d9aaf89b688cf115332aee8f50199c7&units=metric`;
  try { 
    const res = await fetch(url);
    const data = await res.json();   
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;  
    windspeed.textContent = `скорость ветра ${data.wind.speed}м/с`; 
    humidity.textContent = `относительная влажность ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
  } catch (error) {
    city.textContent = 'Город не найден';
    city.style.background = 'red';
    localStorage.setItem('city', '');    
  }
}

function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
}

            // ЦИТАТА
const quotes = {
    'Когда в дружбе исходят лишь из выгоды, сеют неприязнь и злобу': 'Конфуций',
    'На пути непременно возникнет много трудностей, если надеяться на легкую дорогу' : 'Лао Цзы',
    'Мы познаем человека не потому, что он знает, а по тому, чему он радуется' : 'Рабиндранат Тагор',
    'Дом не там, где вы родились, а там, где прекратили ваши попытки к бегству' : 'Нагиб Махфуз',
    'Одно слово может изменить твое решение. Одно чувство может изменить твою жизнь. Один человек может изменить тебя' : 'Конфуций',
    'Цель взаимоотношений не в том, чтобы был другой, кто мог бы завершить тебя, а в том, чтобы был другой, с кем можно разделить свою завершенность' : 'Нил Доналд Уолш',
    'Начинай уже сейчас жить той жизнью, какой ты хотел бы видеть ее в конце' : 'Марк Аврелий',
    'Новая жизнь начинается именно в тот момент, когда для старой внутри больше нет места' : 'Ошо',
    'Вы можете получить все, что вам нужно, если только это вам и вправду нужно' : 'Рэй Брэдбери',
    'Работай над очищением своих мыслей. Если у тебя не будет дурных мыслей, не будет и дурных поступков' : 'Конфуций',
    'Счастливый человек притягивает всех, кого не огорчает его счастье' : 'Джулиана Вильсон',
    'Причины - внутри, снаружи - последствия' : 'Аму Мом',
    'Избегайте тех, кто старается подорвать вашу веру в себя. Эта черта свойственна мелким людям. Великий человек, наоборот, внушает вам чувство, что и вы можете стать великим' : 'Марк Твен',
    'Чтобы обрести знание, каждый день что-нибудь добавляй.Чтобы обрести мудрость, каждый день от чего-нибудь избавляйся' : 'Японская мудрость',
    'Не делай ничего постыдного ни в присутствии других, ни втайне. Первым твоим законом должно быть уважение к себе самому' : 'Пифагор',
    'Мы видим не мир , а содержание своего ума' : 'Лама Оле Нидал',
    'Не принимай никакой негатив. Пока ты его не примешь, он принадлежит тому, кто его принес' : 'Будда',
    'Если что можно доказать делом, то на это незачем тратить слова' : 'Эзоп',
    'Толкни сосуд. Что из него выплеснется, тем он и наполнен' : 'Народная мудрость',
    'Самое лучшее наследство, которое можно оставить ребенку, это способность на собственных ногах прокладывать себе путь' : 'Айседора Дункан',
    'Мы сами должны стать теми переменами, которые хотим видеть в мире' : 'Махатма Ганди',
    'Только в спокойных водах вещи отражаются неискаженными. Только спокойное сознание пригодно для восприятия мира' : 'Ганс Марголиус',
}

const quotesArr = Object.keys(quotes);
const q = quotesArr[Math.floor(Math.random() * quotesArr.length)];
const a = quotes[q];

/*async function getQuote() {
    const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
    const res = await fetch(url);
    const data = await res.json();
    quote.textContent = `<<${data.quote.quoteText}>>`;
    author.textContent = data.quote.quoteAuthor;
}*/

function getQuote() {
    quote.textContent = `<<${q}>>`;
    author.textContent = a;
}




// обработчики событий

//Имя
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name. addEventListener('click', setName);

//Цель

focustoday.addEventListener('keypress', setFocus);
focustoday.addEventListener('blur', setFocus);
//focustoday. addEventListener('click', setFocus);

//Погода

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

//Цитата
document.addEventListener('DOMContentLoaded', getQuote);

// Run 
showTime();
setBgGreet();
getName();
getFocus();
getWeather();
getQuote();
