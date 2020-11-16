const { doc } = require("prettier");

const wrapper = document.createElement('div'); //фон
const popapWrapper = document.createElement('div'); //popap
const resultWrapper = document.createElement('div'); //popap
const puzzleWrapper = document.createElement('div');//поле
const additionalWrapper = document.createElement('div');//доп.поле
let cellElement = document.createElement('div'); //клетка 
const congratulation = document.createElement('div');
const sound = document.createElement('audio');
const soundWin = document.createElement('audio');

let intervalID;
let score = document.querySelector('.score');
let time = document.querySelector('.time'); 

let count = 0;  //счетчик кликов
let sec= 0;
let min = 0;
let hour = 0;

//let cells = [];
//let newCells=[];

const btnSound = document.createElement('button');
const btnPause = document.createElement('button');
const btnAllSound = document.createElement('button');
// кнопки в popap
const btnNewGame =  document.createElement('button');
const btnLoadGame =  document.createElement('button');
const btnProgress =  document.createElement('button');
const btnSelect3x3 =  document.createElement('button');
const btnContinue =  document.createElement('button');


const fragment = document.createDocumentFragment();

//размер клетки
let cellSize;

if (window.innerWidth > 480){
    cellSize = 99; 
} else if (window.innerWidth <= 480) {
    cellSize = 78; 
};


/*
window.addEventListener('resize', () => {
    if (window.innerWidth > 480){
        cellSize = 99; 
    } else if (window.innerWidth <= 480) {
        cellSize = 78; 
    };

})
*/

//Create HTML for an icon
const createIconHTML = (icon_name) => {
    return `<i class = material-icons>${icon_name}</i>`            
} 

function init() {
 
        //---------фон----------        
        wrapper.classList.add('wrapper');
        document.body.appendChild(wrapper);

        //--------поле игры------------       
        puzzleWrapper.classList.add('puzzle-wrapper');
        document.body.appendChild(puzzleWrapper);

        // клетки         
        // если в памяти сохраненa игра, то возьми оттуда
     /*   if (localStorage.getItem('gameSave')){
            puzzleWrapper.innerHTML = JSON.parse(localStorage.getItem('gameSave'));
            btnContinue.classList.add ('button', 'button-continue');
            btnContinue.textContent = "Continue";        
            popapWrapper.appendChild(btnContinue);
                        
        } else {            
            puzzleWrapper.appendChild(createCells());
        };
*/
                
        puzzleWrapper.appendChild(createCells());   

        // звук клеток
        sound.setAttribute('src', 'src/assets/1596830637_clickb7.mp3');     
        document.body.appendChild(sound);

        //-------дополнительное поле----------
        additionalWrapper.classList.add('additional-wrapper');

        // --счет и время--

        //если есть в памяти, возьми оттуда
        if(JSON.parse(localStorage.gameInfo)){
            count = JSON.parse(localStorage.getItem('gameInfo')).score; 

            hour = JSON.parse(localStorage.getItem('gameInfo')).hour;
            min = JSON.parse(localStorage.getItem('gameInfo')).min;
            sec = JSON.parse(localStorage.getItem('gameInfo')).sec;

            additionalWrapper.innerHTML = `<div class="score">score: ${ count}</div>
            <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;             
                    
        } else {
            additionalWrapper.innerHTML = `<div class="score">score: ${ count}</div>
            <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`; 
        };

      
        //кнопка ПАУЗА
        btnPause.classList.add('pause', 'button');
        btnPause.textContent = "PAUSE";        
        additionalWrapper.appendChild(btnPause);

        //кнопка звука
        btnAllSound.classList.add ('button', 'allsound');
        btnAllSound.innerHTML = createIconHTML('volume_up');
        additionalWrapper.appendChild(btnAllSound);

        document.body.appendChild(additionalWrapper);
      

        //-------------popap---------------
        popapWrapper.classList.add('popap-wrapper');
        document.body.appendChild(popapWrapper);
        //элементы popap
        btnNewGame.classList.add ('button', 'button-newgame');
        btnNewGame.textContent = "New Game";        
        popapWrapper.appendChild(btnNewGame);

        //btnLoadGame.classList.add ('button', 'button-load');
        //btnLoadGame.textContent = "Load Game";        
        //popapWrapper.appendChild(btnLoadGame);

        btnProgress.classList.add ('button', 'button-progress');
        btnProgress.textContent = "Progress";        
        popapWrapper.appendChild(btnProgress);

        btnSelect3x3.classList.add ('button', 'button-select3x3');
        btnSelect3x3.textContent = "3x3";        
        popapWrapper.appendChild(btnSelect3x3);

        if(JSON.parse(localStorage.field)){
            btnContinue.classList.add ('button', 'button-continue');
            btnContinue.textContent = "Continue";        
            popapWrapper.appendChild(btnContinue);           
        }



        //---------------выигрыш-----------------------
        congratulation.classList.add('congratulation');
        // звук выигрыша
        soundWin.setAttribute('src', 'src/assets/903a9e120e7b9b3.mp3');
        document.body.appendChild(soundWin); 
};


function createCells() { 
    //console.log (JSON.parse(localStorage.field));
    let empty = {
        value: 0, 
        left: 0,   
        top: 0,
        element: {}
                          
    };
    let left;
    let top;
    let cells = [];
    let newCells;


    if (localStorage.getItem('field')){
        //array = JSON.parse(localStorage.field);
        //console.log('array ' + array);
        console.log('сохраненная игра'  + JSON.parse(localStorage.field));//так не хочет
        console.log(JSON.parse(localStorage.field));
       // empty = JSON.parse(localStorage.field).find(el => !el.element);
       // console.log (empty);

    } else {
        cells = [];

        /*empty = {
            value: 0, 
            left: 0,   
            top: 0,
            element: {}
                              
        }; */

        cells.push(empty);  
                
        newCells = [...Array(15).keys()];
        //.sort(() => Math.random() - 0.5);
        // ---- проверка на собираемость -----
        //isSolvable(newCells);   
    };
   
             
  
   

    
    //поменяться координатами
    function move (index) {
        console.log(empty);
        console.log('empty.left ' + empty.left);
        cellElement = document.createElement('div'); //клетка  
        cellElement.classList.add('puzzle-cell');
        
        const cell = cells[index];
        console.log('cells');
        console.log(cells);

        console.log('cell');
        console.log(cell);

        console.log(`cellsize ${cellSize}`);

        console.log('cell.element');
        console.log(cell.element);
        



        //ищем разницу с коорд.пустой клетки
        const leftVar = Math.abs(empty.left - cell.left);
        const topVar = Math.abs(empty.top - cell.top);
        //если рядом пустой клетки нет, ничего не делай
        if (leftVar + topVar > 1) {
            return;
        }      

        cell.element.style.left = `${empty.left * cellSize}px`;
        cell.element.style.top = `${empty.top * cellSize}px`;
        //в промеж.переменные записываем коорд-ты пустой клетки
        const emptyLeft = empty.left;
        const emptyTop = empty.top;
        //в коорд-ты пустой клетки записываем коорд-ты текущей клетки
        empty.left = cell.left;
        empty.top = cell.top;
        //в коорд-ты текущей клетки записываем коорд-ты пустой
        cell.left = emptyLeft;
        cell.top = emptyTop;

        //-----------проверка на выигрыш----------------
        const isFinished = cells.every(cell => {
            return cell.value === cell.top * 4 + cell.left;
        });

        if (isFinished) {
            finishGame();
        };

        addScore();  
    };

    if (localStorage.field){
        for (let p = 0; p < 16; p++) {  
            if(JSON.parse(localStorage.field)[p].value !== 0){
                cellElement = document.createElement('div'); //клетка  
                cellElement.classList.add('puzzle-cell');
                //разрешить перетаскивание мышью
                cellElement.setAttribute('draggable', 'true');

                //const value = JSON.parse(localStorage.field)[i-1].value + 1;
                //const value = JSON.parse(localStorage.field)[i-1].value;
                
                let value = JSON.parse(localStorage.field)[p].value;
                //console.log (value);

                cellElement.textContent = value;


                left = p % 4;            
                top = (p - left) / 4;
               
                
                cells.push(JSON.parse(localStorage.field)[p]);
                //console.log (cells);
                
                cellElement.style.left = `${left * cellSize}px`;
                cellElement.style.top = `${top * cellSize}px`;

                cell = cells[p];
                cell.element = cellElement;
                console.log (cell.element);

                puzzleWrapper.append(cellElement);   


            }  else {
                empty.left = JSON.parse(localStorage.field)[p].left;
                empty.top = JSON.parse(localStorage.field)[p].top;                
                cells.push(empty); 
            }    
            //console.log (`puzzleWrapper ${puzzleWrapper}`);          
            


     
                
    
            //---------------КЛИК------------------
            cellElement.addEventListener('click', () => {
                       
                move(p);  
                sound.play();      
            });
            window.onbeforeunload = () => {    
                delete localStorage.field;
                //delete localStorage.gameInfo;
                saveGame();
                cells = cells.sort((a,b) => a.left - b.left);
                cells = cells.sort((a,b) => a.top - b.top);
                let fieldSave = JSON.stringify(cells);
                localStorage.setItem('field', fieldSave);   
              
            };

        };
    

    } else {
        for (let i = 1; i < 16; i++) {

            const value = newCells[i-1] + 1;   
            
            const cellElement = document.createElement('div'); //клетка  
            cellElement.classList.add('puzzle-cell');
            //разрешить перетаскивание мышью
            cellElement.setAttribute('draggable', 'true');
            cellElement.textContent = value;

            left = i % 4;
            top = (i - left) / 4;

            cells.push ({
                value: value,
                left: left,
                top: top,
                element: cellElement           
            });

            cellElement.style.left = `${left * cellSize}px`;
            cellElement.style.top = `${top * cellSize}px`;  

            puzzleWrapper.append(cellElement);      
            //console.log (`puzzleWrapper новая игра${puzzleWrapper}`);    
    
                
            //---------------КЛИК------------------
            cellElement.addEventListener('click', () => {
                       
                move(i);  
                sound.play();      
            });
            window.onbeforeunload = () => {    
                delete localStorage.field;
                //delete localStorage.gameInfo;
                saveGame();
                cells = cells.sort((a,b) => a.left - b.left);
                cells = cells.sort((a,b) => a.top - b.top);
                let fieldSave = JSON.stringify(cells);
                localStorage.setItem('field', fieldSave);   
              
            };
            

        };

    };

















/*

    for (let i = 1; i < 16; i++) {       
    
        const cellElement = document.createElement('div'); //клетка  
        cellElement.classList.add('puzzle-cell');
        //разрешить перетаскивание мышью
        cellElement.setAttribute('draggable', 'true');


        if (localStorage.field){

            //const value = JSON.parse(localStorage.field)[i-1].value + 1;
            //const value = JSON.parse(localStorage.field)[i-1].value;
            const value = JSON.parse(localStorage.field)[i].value;
            //newCells[i-1] + 1;                
            cellElement.textContent = value;

            left = i % 4;            
            top = (i - left) / 4;

            
            
            cells.push(JSON.parse(localStorage.field)[i-1]);
            console.log (cells);
            
            cellElement.style.left = `${left * cellSize}px`;
            cellElement.style.top = `${top * cellSize}px`;
            

        } else {
            const value = newCells[i-1] + 1;                
            cellElement.textContent = value;

            left = i % 4;
            top = (i - left) / 4;

            cells.push ({
                value: value,
                left: left,
                top: top,
                element: cellElement           
            });

            cellElement.style.left = `${left * cellSize}px`;
            cellElement.style.top = `${top * cellSize}px`;  
        };    
*/
/*
        puzzleWrapper.append(cellElement);        
    
    
        //---------------КЛИК------------------
        cellElement.addEventListener('click', () => {
                   
            move(i);  
            sound.play();      
        });
        window.onbeforeunload = () => {    
            delete localStorage.field;
            cells = cells.sort((a,b) => a.left - b.left);
            cells = cells.sort((a,b) => a.top - b.top);
            let fieldSave = JSON.stringify(cells);
            localStorage.setItem('field', fieldSave);   
          
        };
    };
*/
    
        fragment.appendChild(cellElement); 
           

        return fragment;
};  





//считать ходы
function addScore(){
    score = document.querySelector('.score');
    
    count++;
    score.textContent = `score: ${count}`;      
}

// добавить ноль
function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

const timer = () =>{
    time = document.querySelector('.time');     
    sec++; 
    
    if (sec === 60){
        sec = 0;
        min += 1;
    };
    if (min === 60){
        min = 0;
        hour += 1;
    };

    time.textContent = `${addZero(hour)}: ${addZero(min)}: ${addZero(sec)}`;  
};

// подсчет инверсий в массиве ---- нужно четное число
const isSolvable = (arr) => {   
        
        let sum = 0;
        for (let i = 0; i < arr.length; i++){
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] > arr [j]) {
                    sum += 1; 
                };    
            };
        };
        if (sum % 2 === 0) {      
                        
            return sum;
        } else {        
            createCells();
        };        
};


// если закончил игру

const finishGame = () => {
   
    clearInterval(intervalID);
    congratulation.innerHTML = 
    `<div class="congratulation"><span>Congratulations!</span>
    <span>You won with <i>${ count + 1 }</i> score </span>
    <span>for time <i>0${hour}: 0${min}: ${sec}</i></span></div>`;


    setTimeout(() => {
       document.body.appendChild(congratulation); 
       soundWin.play();  
    }, 300)  


    congratulation.addEventListener ('click', () => {
       
        document.body.removeChild(congratulation);
        popapWrapper.style.display = 'flex';                 
        //popapWrapper.removeChild(btnContinue); 
                  
    });
    saveResult();
};

// -----------сохранить результат в таблице-------------

let result;
let countPlayer;

// если в памяти сохранены результаты, то возьми оттуда
if (localStorage.getItem('results')){
    result = JSON.parse(localStorage.getItem('results'));
    countPlayer = JSON.parse(localStorage.getItem('results')).length;
} else {
    result = [];
    countPlayer = 0;
};


const saveResult = () => {      

    countPlayer++;  
    let score =  count + 1;
    let stage = countPlayer;   

    const playerInfo = {
        stage: stage,    
        score: score    
    };

    //ограничение по количеству рекордов
    if (result.length < 10) {
        result.push(playerInfo);
        
    } else if (result.length === 10) {
        if(playerInfo.score <= result[result.length - 1].score) {
            result.pop();
            result.push(playerInfo);            
        };
    };    
    result.sort((a, b) => a.score - b.score);   

    let playerInformation = JSON.stringify(result);
    localStorage.setItem('results', playerInformation); 
};


// ----------- сохранить результат текущей игры -----

const saveGame = () => {
   
    
    let score =  count;
    //let time = `0${hour}: 0${min}: ${sec}`;
    /*let hour = hour;
    let min = min;
    let sec = sec;*/

    /*const gameInfo = {
        score: score,
        time: time
    };*/
    const gameInfo = {
        score: score,
        hour: hour,
        min: min,
        sec: sec
    };
    let gameInformation = JSON.stringify(gameInfo);
    localStorage.setItem('gameInfo', gameInformation);
}




// ++++++++++++++ Новая игра ++++++++++++++++++++

btnNewGame.addEventListener('click', () => {    
         
    setTimeout(() => {popapWrapper.style.display = 'none'},100);
    puzzleWrapper.innerHTML = '';
    delete localStorage.field;

    count = 0;
    sec = 0;
    min = 0;
    hour = 0;

    additionalWrapper.innerHTML = `<div class="score"><span>score: 0</span></div>
    <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
    additionalWrapper.appendChild(btnPause);
    additionalWrapper.appendChild(btnAllSound);

    if (intervalID) {
       clearInterval(intervalID);  
    };
    
    intervalID = setInterval(timer, 1000); 
    createCells();    
});
/*
// ++++++++++++++ Загрузить игру +++++++++++++++
btnLoadGame.addEventListener('click', () => {
    setTimeout(() => {popapWrapper.style.display = 'none'},100);


});
*/


// ++++++++++++++ Продолжить ++++++++++++++++++++

btnContinue.addEventListener('click', () => {
    setTimeout(() => {popapWrapper.style.display = 'none'},100);
    //intervalID = setInterval(timer, 1000);

    if (localStorage.getItem('gameInfo')) {
        count = JSON.parse(localStorage.getItem('gameInfo')).score;
        score = document.querySelector('.score');      
        score.textContent = `score: ${count}`; 
        

        time = document.querySelector('.time');   
        //time.textContent = `${addZero(hour)}: ${addZero(min)}: ${addZero(sec)}`;
       // time.textContent = JSON.parse(localStorage.getItem('gameInfo')).time;
        hour = JSON.parse(localStorage.getItem('gameInfo')).hour;
        min = JSON.parse(localStorage.getItem('gameInfo')).min;
        sec = JSON.parse(localStorage.getItem('gameInfo')).sec;
        time.textContent = `${addZero(hour)}: ${addZero(min)}: ${addZero(sec)}`;
        intervalID = setInterval(timer, 1000);




    } else {
        intervalID = setInterval(timer, 1000);
    };
    
    

});

// +++++++++++++++++ Пауза +++++++++++++++++++++++

btnPause.addEventListener('click', () => {    
  
    clearInterval(intervalID);
    //console.log(intervalID);
    popapWrapper.style.display = 'flex';
    btnContinue.classList.add ('button', 'button-continue');
    btnContinue.textContent = "Continue";        
    popapWrapper.appendChild(btnContinue);
});

// +++++++++++++++++ Звук +++++++++++++++++++++++

btnAllSound.addEventListener('click', () => { 
    
    console.log('btnAllSound.textContent ' + btnAllSound.textContent);
    console.log('btnAllSound.innerHTML ' + btnAllSound.innerHTML);

    if (btnAllSound.textContent === 'volume_up') {
        btnAllSound.innerHTML = createIconHTML('volume_off')
        sound.volume = 0;
        soundWin.volume = 0;
    }  else {
        btnAllSound.innerHTML = createIconHTML('volume_up')
        sound.volume = 1;
        soundWin.volume = 1;
    };
});


// +++++++++++++++++ Таблица лучших +++++++++++++++++++++++

btnProgress.addEventListener('click', () => {
    setTimeout(() => {popapWrapper.style.display = 'none'},100);  
    setTimeout(() => {resultWrapper.style.display = 'flex'},100);
        //resultWrapper.style.display = 'flex';

        resultWrapper.classList.add('result-wrapper');
        document.body.appendChild(resultWrapper);
        // проверь, есть ли в памяти
        let resultMessage;
        if (JSON.parse(localStorage.getItem('results'))){
            resultMessage = JSON.parse(localStorage.getItem('results'));
            console.log (resultMessage);
            resultMessage = resultMessage.map(item => {return `Stage ${item.stage}_____${item.score} <br>`}); 
        }        
        
        // если рекордов нет, то ничего не пиши (кроме заголовка)
        let resultMessageItem;
        if (resultMessage){
            resultMessageItem = resultMessage.join(' ');
        } else {
            resultMessageItem = '';
        }
              
        resultWrapper.innerHTML = `
        <div class="result-wrapper">
        <p>Top of results</p>
        <span>${resultMessageItem}</span>
        </div>`
            
});  


resultWrapper.addEventListener('click', () => {
    setTimeout(() => {resultWrapper.style.display = 'none'},100); 
    setTimeout(() => {popapWrapper.style.display = 'flex'},100);  
});



window.addEventListener("DOMContentLoaded", function() {
    init();        
});


