const wrapper = document.createElement('div'); //фон
const puzzleWrapper = document.createElement('div');//поле
const additionalWrapper = document.createElement('div');//доп.поле
const cellSize = 99; //размер клетки
const cellElement = document.createElement('div'); //клетка 

let count = 0;  //счетчик кликов
let sec= 0;
let min = 0;
let hour = 0;

const btnPlay = document.createElement('button'); // кнопка Play


//const cellContainer = document.createElement('div'); //строка
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
        additionalWrapper.innerHTML = `<div class="score">score:  <span>${count}</span></div>
        <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
        
        
        //кнопка play
        btnPlay.classList.add('play');
        btnPlay.textContent = "PLAY";        
        additionalWrapper.appendChild(btnPlay);

        document.body.appendChild(additionalWrapper);
        //additionalWrapper.appendChild(addScore());

        



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

        addScore();  

    }
    
    for (let i = 1; i < 16; i++) {
        const cellElement = document.createElement('div'); //клетка                    
        cellElement.textContent = i;
        cellElement.classList.add('puzzle-cell');
        //разрешить перетаскивание мышью
        cellElement.setAttribute('draggable', 'true'); 

        const left = i % 4;
        const top = (i - left) / 4;

        cells.push ({
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
    
    console.log('новая игра'); 
    
};


btnPlay.addEventListener('click', () => {
    //нажимаем play и запускаем таймер
    if (btnPlay.textContent === "PLAY"){
        btnPlay.textContent = "PAUSE";
        btnPlay.style.fontSize = '1.8rem';
        
        setInterval(timer, 1000); 
        
        
    
    //нажимаем на паузу, таймер останавливается
    } else if (btnPlay.textContent === "PAUSE"){
        btnPlay.textContent = "PLAY";
        var intervalID = setInterval(timer, 1000);
        clearInterval(intervalID);
    };

     
    //начинается новая игра
});
      


window.addEventListener("DOMContentLoaded", function() {
    init();    
});