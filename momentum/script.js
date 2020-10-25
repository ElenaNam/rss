// DOM Elements
const time = document.getElementById('time'),

    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),

    focustoday = document.getElementById('focustoday'),
    date1 = document.getElementById('date1'), 

    //input = document.getElementById('input'),

    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    humidity = document.querySelector('.humidity'),
    windspeed = document.querySelector('.windspeed'),
    weatherDescription = document.querySelector('.weather-description'),
    city = document.getElementById('city'),

    quote = document.querySelector('.quote'),
    author = document.querySelector('.author'),
    btnquote = document.querySelector('.btn-quote'),
    btn = document.querySelector('.btn');
    
    

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

// Set Greeting
function setGreet() {
    let today = new Date(),
        hour = today.getHours();
    if(hour < 6) {
        // Night      
        greeting.textContent = 'Доброй ночи, \n'; 
        document.body.style.color = 'white';  
    } else if(hour < 12) {
        // Morning           
        greeting.textContent = 'Доброе утро, \n';  
    } else if (hour < 18) {
        // Afternoon  
        greeting.textContent = 'Добрый день, \n'; 
    } else if (hour < 24) {
        // Evening     
        greeting.textContent = 'Добрый вечер, \n'; 
    } 

}

//for(let i=0; i<input.length; i++){
    //input[i].setAttribute('size',input[i].getAttribute('placeholder').length);}

   


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
    } else {
        localStorage.setItem('name', e.target.value);
    }
}


// Get Focus
function getFocus() {
    if (localStorage.getItem('focustoday') === null) {
        focustoday.value = 'Введите цель';        
    } else {
        focustoday.value = localStorage.getItem('focustoday');
    }
}

// Set Focus

function setFocus(e) {
    if(e.type === 'keypress') {
        //убедиться что нажат Enter
        if(e.which == 13 || e.keyCode == 13) {                      //13 - это Enter
            localStorage.setItem('focustoday', e.target.value);
            focustoday.blur();
        }

    } else if (e.type === 'click') {                     // если был клик мышкой
        focustoday.value = '';                         // очисти поле ввода                
    } else {
        localStorage.setItem('focustoday', e.target.value);
    }
}
          //  ПОГОДА

// Get City
function getCity() {
    if (localStorage.getItem('city') === null  || localStorage.getItem('city') === '') {
        city.value = 'Ваш город';
        city.style.color = 'white';        
    } else {
        city.value = localStorage.getItem('city');
        getWeather();
    }
}

// Set City

function setCity(e) {
    if(e.type === 'keypress') {
            city.style.color = 'white'; 
            if(e.which == 13 || e.keyCode == 13) { 
                if (localStorage.getItem('city') === ''){   //localStorage.getItem('city') === null || 
                    city.value = '';  
                    //city.value = 'Ваш город';
                }  else {
                   
                    //city.value = localStorage.getItem('city');
                    //getWeather();
                    localStorage.setItem('city', e.target.value); 
                    getWeather();
                    /*localStorage.setItem('city', e.target.value); */ //работает только после обновления страницы*/                  
                  
                }  
                     
            
            city.blur();
            }
    } else if (e.type === 'click') {      
            city.value = ''; 
                       
                     
               
    } else {//blur
        localStorage.setItem('city', e.target.value);
        //getWeather();  
    }
   
}

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=8d9aaf89b688cf115332aee8f50199c7&units=metric`;
   
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
            city.value = 'Город не найден';
            city.style.border = '1px solid red';
            
            //localStorage.setItem('city', '');         
                
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


// другой вариант
/*async function getQuote() {
    const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
    const res = await fetch(url);
    const data = await res.json();
    quote.textContent = `<<${data.quote.quoteText}>>`;
    author.textContent = data.quote.quoteAuthor;
}*/

function getQuote() {   
    const quotesArr = Object.keys(quotes);
    const q = quotesArr[Math.floor(Math.random() * quotesArr.length)];
    const a = quotes[q];
    quote.textContent = `<<${q}>>`;
    author.textContent = a;
}

function setQuote(e) {
    if (e.type === 'click') {
        quote.textContent = '';    
        console.log(quote.textContent);    
        quote.textContent = `<<${q}>>`;
        author.textContent = a;   
        console.log(quote.textContent);
            
    }                    

}


           // ФОНОВЫЕ ИЗОБРАЖЕНИЯ

const base = 'assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];


let sixArray = [];

// получаем массив с 6 jpg-ми
function randomImg(){
    const i = Math.floor(Math.random() * images.length);
    let j = i;
    let arr = [];
    j > 13 ? j = j - 7 : true
    for (let o = j; o < images.length; o++) {
        if (o >= 19 || images[o] === undefined) {
            o = o - 10
            arr.push(images[o])
        } else {
            arr.push(images[o])
        }
    }
    let k = 0;
    while (k < 6) {
        sixArray.push(arr[k]);
        k++;
    }
    console.log (sixArray);
    return sixArray;
}
console.log(randomImg()); //МАГИЯ - если закомментировать эту строчку, то фон не загрузится...

let dailyArray = [...sixArray, ...sixArray, ...sixArray, ...sixArray];
//console.log (dailyArray);
// получаем кокретную картинку в зависимости от времени суток
window.onload = function getDailyBg() {
    let imageSrc = '',
        today = new Date(),
        hour = today.getHours(),
        index = Math.floor(Math.random() * sixArray.length);
        console.log(index);
    if (hour < 6|| hour===24) {//костыль
        imageSrc = base + 'night/' + sixArray[index];      
        console.log (imageSrc);  
    } else if (hour < 12) {
        imageSrc = base + 'morning/' + sixArray[index];
    } else if (hour < 18) {
        imageSrc = base + 'day/' + sixArray[index];
    } else if (hour < 24) {
        imageSrc = base +  'evening/' + sixArray[index];       
       
    }
    viewBgImg(imageSrc);
}


// передаем  конкретную картинку в стиль body в качестве фона 
function viewBgImg(data) {
    const body = document.querySelector('body'),
          src = data,
          img = document.createElement('img');
    img.src = src;
    img.onload = () => {body.style.backgroundImage = `url(${src})`}; //это она самая
}
// получаем конкретную картинку каждый час
let i = 0;
function getImage() {
    const index = Math.floor(Math.random() * images.length);
    let imageSrc = '',
        today = new Date();
        hour = today.getHours();  
        //min = today.getMinutes();  
            
    let count = hour + i;
    //let count = min + i;

    if (count >= 24) {
        i = i - count;
    }  
    if (count < 6 || count === 24) {
        imageSrc = '../' + base + 'night/' + dailyArray[count - 1];
        //console.log (imageSrc);
      
    } else if (count < 12) {
        imageSrc = './' + base + 'morning/' + dailyArray[count];  
    
    } else if (count < 18) {
        imageSrc =  './' + base + 'day/' + dailyArray[count];   
    
    } else if (count < 24) {
        imageSrc = './' + base + 'evening/' + dailyArray[count];
        
    }

    viewBgImg(imageSrc);
    console.log (imageSrc);
    i++;

    btn.disabled = true;
    setTimeout(function() {btn.disabled = false;}, 1000);
    
}

// обработчики событий

//Имя
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name. addEventListener('click', setName);

//Цель

focustoday.addEventListener('keypress', setFocus);
focustoday.addEventListener('blur', setFocus);
focustoday. addEventListener('click', setFocus);

//Погода

//document.addEventListener('DOMContentLoaded', getWeather);

city.addEventListener('keypress', setCity);
city.addEventListener('click', setCity);
city.addEventListener('blur', setCity);

//Цитата
document.addEventListener('DOMContentLoaded', getQuote);
btnquote.addEventListener('click', getQuote);



//Фон
btn.addEventListener('click', getImage);

// Run 
showTime();
setGreet();
getName();
getFocus();
getCity();
//getWeather();
getQuote();
getImage();



// починить смену фона каждый час
// ошибку в городе