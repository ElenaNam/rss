const wrapper = document.createElement('div'); //фон
const popapWrapper = document.createElement('div'); //popap
const puzzleWrapper = document.createElement('div');//поле
const additionalWrapper = document.createElement('div');//доп.поле
const cellSize = 99; //размер клетки
const cellElement = document.createElement('div'); //клетка 
const congratulation = document.createElement('div');
const sound = document.createElement('audio');
const soundWin = document.createElement('audio');

let count = 0;  //счетчик кликов
let sec= 0;
let min = 0;
let hour = 0;

//const btnPlay = document.createElement('button');
const btnPause = document.createElement('button');

const btnNewGame =  document.createElement('button');
const btnSound = document.createElement('button');
const btnProgress =  document.createElement('button');
const btnSelect3x3 =  document.createElement('button');
const btnContinue =  document.createElement('button');


const fragment = document.createDocumentFragment();


function init() {
        //фон        
        wrapper.classList.add('wrapper');
        document.body.appendChild(wrapper);

        //поле        
        puzzleWrapper.classList.add('puzzle-wrapper');
        document.body.appendChild(puzzleWrapper);

        //клетки      
        puzzleWrapper.appendChild(createCells());

        //дополнительное поле
        additionalWrapper.classList.add('additional-wrapper');
        additionalWrapper.innerHTML = `<div class="score">score: ${ count}</div>
        <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
        
        
        //кнопка play
        //btnPlay.classList.add('play', 'button');
        //btnPlay.textContent = "PLAY";        
        //additionalWrapper.appendChild(btnPlay);
        btnPause.classList.add('pause', 'button');
        btnPause.textContent = "PAUSE";        
        additionalWrapper.appendChild(btnPause);

        document.body.appendChild(additionalWrapper);
      

        //popap
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

        congratulation.classList.add('congratulation');

        sound.setAttribute('src', 'src/assets/1596830637_clickb7.mp3');     
        document.body.appendChild(sound);

        soundWin.setAttribute('src', 'src/assets/903a9e120e7b9b3.mp3');
        document.body.appendChild(soundWin);

        



        //анимация фона
       /* const blinkBg = () => {
            wrapper.style.opacity = '1';
            const selectOpacityBg = () => {
                if (wrapper.style.opacity > 0.7){
                  wrapper.style.opacity -= 0.1;  
                }                
            }
            setTimeout(selectOpacityBg, 1000);            
        }*/


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

        const isFinished = cells.every(cell => {
            return cell.value === cell.top * 4 + cell.left;
        });

        if (isFinished) {
            console.log ("Вы выиграли!");
            //clearInterval(intervalID);
            congratulation.innerHTML = 
            `<div class="congratulation"><span>Congratulations!</span>
            <span>You won with ${ count + 1 } score </span>
            <span>for time 0${hour}: 0${min}: ${sec}</span></div>`;


            setTimeout(() => {
               document.body.appendChild(congratulation); 
               soundWin.play();  
            }, 300)            

            congratulation.addEventListener ('click', () => {
               
                document.body.removeChild(congratulation);
                popapWrapper.style.display = 'flex';
                
                /*count = 0;
                sec = 0;
                min = 0;
                hour = 0;

                additionalWrapper.innerHTML = `<div class="score"><span>score: 0</span></div>
                <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
                additionalWrapper.appendChild(btnPause);
                */
            })

        }       

        addScore();  

    }
    const newCells = [...Array(15).keys()];
    //.sort(() => Math.random() - 0.5);
    for (let i = 1; i < 16; i++) {
        const cellElement = document.createElement('div'); //клетка  
        const value = newCells[i-1] + 1;                
        cellElement.textContent = value;
        cellElement.classList.add('puzzle-cell');
        //разрешить перетаскивание мышью
        cellElement.setAttribute('draggable', 'true'); 

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

        //КЛИК
        cellElement.addEventListener('click', () => {
                   
            move(i);  
            sound.play();        

        });
/*
        // DRAG N DROP                   
        cellElement.addEventListener('dragstart', function(e){
            e.dataTransfer.setData('text/html', 'dragstart');
                                    
            setTimeout(() => {
                this.style.display = 'none';
            }, 0)
                            
        });

       /*cellElement.addEventListener('dragend', function(e){
            //cellElement.style.position = 'absolute';
            cellElement.style.top = e.pageY + 'px';
            cellElement.style.left = e.pageX + 'px';

            setTimeout(() => {
                this.style.display = 'flex';
            }, 0)
                            
        });*/
            //когда пятнашка находится над пустым местом
 /*       puzzleWrapper.addEventListener('dragover', function(e){
            e.preventDefault();
            console.log('dragover');
        }); 
                                
            //
        puzzleWrapper.addEventListener('drop', function(e){
            //cellContainer.appendChild(cell[j]);            
            //puzzleWrapper.setAttribute('droppable', 'true');

            cellElement.style.position = 'absolute';
            cellElement.style.top = e.pageY + 'px';
            cellElement.style.left = e.pageX + 'px';
            setTimeout(() => {
                this.style.display = 'flex';
            }, 0)


            //puzzleWrapper.appendChild(cellElement);
            
            e.target.appendChild(cellElement);
            console.log('drop');
        }); */


    };
        fragment.appendChild(cellElement);        
        
        return fragment;
};  


//считать ходы
function addScore(){
    const score = document.querySelector('.score');
    count++;
    score.textContent = `score: ${count}`;  
    console.log (`Сделано ${count} ходов`);      
}
// Add Zeros 
function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

const timer = () =>{
    let time = document.querySelector('.time');
    //time.classList.add('.time');    
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

const intervalID = setInterval(timer, 1000); 

btnNewGame.addEventListener('click', () => {
    console.log ('клик по кнопке Новая игра');        
    setTimeout(() => {popapWrapper.style.display = 'none'},100);
    

    //ИСПРАВИТЬ ОШИБКУ В КОНСОЛИ!!
    //puzzleWrapper.removeChild(puzzleWrapper.childNodes);
   
   // puzzleWrapper.removeChild(cellElement);
    //puzzleWrapper.remove();
    //puzzleWrapper.appendChild(createCells());
    //cellElement.parentNode.removeChild(cellElement);   
    //puzzleWrapper.replaceChild(createCells());
    count = 0;
    sec = 0;
    min = 0;
    hour = 0;

    additionalWrapper.innerHTML = `<div class="score"><span>score: 0</span></div>
    <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
    additionalWrapper.appendChild(btnPause);

    setInterval(timer, 1000); 
    createCells();    
});

btnContinue.addEventListener('click', () => {
    setTimeout(() => {popapWrapper.style.display = 'none'},100);

})

btnPause.addEventListener('click', () => {
  
    clearInterval(intervalID);
    popapWrapper.style.display = 'flex';
    btnContinue.classList.add ('button', 'button-continue');
    btnContinue.textContent = "Continue";        
    popapWrapper.appendChild(btnContinue);
});


window.addEventListener("DOMContentLoaded", function() {
    init();        
});