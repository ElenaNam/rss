const wrapper = document.createElement('div'); //фон
const popapWrapper = document.createElement('div'); //popap
const resultWrapper = document.createElement('div'); //popap
const puzzleWrapper = document.createElement('div');//поле
const additionalWrapper = document.createElement('div');//доп.поле
const cellElement = document.createElement('div'); //клетка 
const congratulation = document.createElement('div');
const sound = document.createElement('audio');
const soundWin = document.createElement('audio');
let intervalID;

let count = 0;  //счетчик кликов
let sec= 0;
let min = 0;
let hour = 0;


const btnPause = document.createElement('button');
// кнопки в popap
const btnNewGame =  document.createElement('button');
const btnSound = document.createElement('button');
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
        // счет и время
        additionalWrapper.innerHTML = `<div class="score">score: ${ count}</div>
        <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;       
        //кнопка ПАУЗА
        btnPause.classList.add('pause', 'button');
        btnPause.textContent = "PAUSE";        
        additionalWrapper.appendChild(btnPause);

        document.body.appendChild(additionalWrapper);
      

        //-------------popap---------------
        popapWrapper.classList.add('popap-wrapper');
        document.body.appendChild(popapWrapper);
        //элементы popap
        btnNewGame.classList.add ('button', 'button-newgame');
        btnNewGame.textContent = "New Game";        
        popapWrapper.appendChild(btnNewGame);

        btnProgress.classList.add ('button', 'button-progress');
        btnProgress.textContent = "Progress";        
        popapWrapper.appendChild(btnProgress);

        btnSelect3x3.classList.add ('button', 'button-select3x3');
        btnSelect3x3.textContent = "3x3";        
        popapWrapper.appendChild(btnSelect3x3);

        //---------------выигрыш-----------------------
        congratulation.classList.add('congratulation');
        // звук выигрыша
        soundWin.setAttribute('src', 'src/assets/903a9e120e7b9b3.mp3');
        document.body.appendChild(soundWin); 
};

function createCells() { 

    const cells = [];
    const empty = {
        value: 0,    
        top: 0,
        left: 0
    }; 

    cells.push(empty);

    //поменяться координатами
    function move (index) {
        
        const cell = cells[index];

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
/*

    if (localStorage.getItem('gameSave')){
        let gameSv = JSON.parse(localStorage.getItem('gameSave'));
        console.log (gameSv);

        btnContinue.classList.add ('button', 'button-continue');
        btnContinue.textContent = "Continue";        
        popapWrapper.appendChild(btnContinue);
                    
    } 

*/

    const newCells = [...Array(15).keys()];
    //.sort(() => Math.random() - 0.5);
    // ---- проверка на собираемость -----
    //isSolvable(newCells);

    for (let i = 1; i < 16; i++) {
        
        console.log ('cellSize в цикле ' + cellSize);
        
        const cellElement = document.createElement('div'); //клетка  
        cellElement.classList.add('puzzle-cell');
        //разрешить перетаскивание мышью
        cellElement.setAttribute('draggable', 'true');

        const value = newCells[i-1] + 1;                
        cellElement.textContent = value;

        const left = i % 4;
        const top = (i - left) / 4;

        cells.push ({
            value: value,
            left: left,
            top: top,
            element: cellElement           
        });

        cellElement.style.left = `${left * cellSize}px`;
        cellElement.style.top = `${top * cellSize}px`;  

        puzzleWrapper.append(cellElement);

        //---------------КЛИК------------------
        cellElement.addEventListener('click', () => {
                   
            move(i);  
            sound.play();      
        });
/*

        //------------- DRAG N DROP-------------                   
        cellElement.addEventListener('dragstart', function(e){
            //e.dataTransfer.setData('class', e.target.className);
                                    
            setTimeout(() => {
                this.style.display = 'none';
            }, 0)
            console.log ('dragstart');
                            
        });


       cellElement.addEventListener('dragend', function(e){
            //cellElement.style.position = 'absolute';
            //cellElement.style.top = e.pageY + 'px';
            //cellElement.style.left = e.pageX + 'px';

            setTimeout(() => {
                this.style.display = 'flex';
            }, 0)
            console.log ('dragend');
                            
        });
            //когда пятнашка находится над пустым местом
        puzzleWrapper.addEventListener('dragover', function(e){
            e.preventDefault();
            console.log('dragover');
        }); 
        puzzleWrapper.addEventListener('dragenter', function(e){
            e.preventDefault();
            console.log ('dragenter')
                            
        });
                                
            //
        puzzleWrapper.addEventListener('drop', function(e){
            //cellContainer.appendChild(cell[j]);            
            //puzzleWrapper.setAttribute('droppable', 'true');
            //let itemClass = e.dataTransfer.getData('class');
            //console.log(itemClass);
            //e.target.appendChild(document.querySelector(itemClass));


            //cellElement.style.position = 'absolute';
            //cellElement.style.top = e.pageY + 'px';
            //cellElement.style.left = e.pageX + 'px';
            //setTimeout(() => {
               // this.style.display = 'flex';
            //}, 0)
            e.stopPropagation();
            e.preventDefault();
            this.append(cellElement);


            //puzzleWrapper.appendChild(cellElement);
            
            //e.target.appendChild(cellElement);
            console.log('drop');
        }); 
*/

    };
        fragment.appendChild(cellElement);    

        return fragment;
};  


//считать ходы
function addScore(){
    const score = document.querySelector('.score');
    count++;
    score.textContent = `score: ${count}`;      
}

// добавить ноль
function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

const timer = () =>{
    let time = document.querySelector('.time');     
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



// ++++++++++++++ Новая игра ++++++++++++++++++++

btnNewGame.addEventListener('click', () => {    
         
    setTimeout(() => {popapWrapper.style.display = 'none'},100);
    puzzleWrapper.innerHTML = '';

    count = 0;
    sec = 0;
    min = 0;
    hour = 0;

    additionalWrapper.innerHTML = `<div class="score"><span>score: 0</span></div>
    <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
    additionalWrapper.appendChild(btnPause);

    if (intervalID) {
       clearInterval(intervalID);  
    };
    
    intervalID = setInterval(timer, 1000); 
    createCells();    
});

// ++++++++++++++ Продолжить ++++++++++++++++++++

btnContinue.addEventListener('click', () => {
    setTimeout(() => {popapWrapper.style.display = 'none'},100);
    intervalID = setInterval(timer, 1000);

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
    //popapWrapper.style.display = 'flex'; 
});



window.addEventListener("DOMContentLoaded", function() {
    init();        
});


window.onbeforeunload = () => {    
    wrapper.style.opacity = '.7';  
    
    //let gameSave = JSON.stringify(cell.element);
    //localStorage.setItem('gameSave', gameSave);     
  
};


