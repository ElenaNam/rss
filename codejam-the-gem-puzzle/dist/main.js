/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2RlamFtLXRoZS1nZW0tcHV6emxlLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFDbkQsb0RBQW9EO0FBQ3BELHdEQUF3RDtBQUN4RCxvQkFBb0I7QUFDcEIsa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRUFBbUUsT0FBTztBQUMxRSxtQ0FBbUMsS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJOzs7QUFHMUQ7QUFDQTtBQUNBLHVDO0FBQ0E7QUFDQTtBQUNBLHVDO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QztBQUNBOztBQUVBO0FBQ0EsNkM7QUFDQTs7QUFFQTtBQUNBLHlDO0FBQ0E7O0FBRUE7O0FBRUEsdUU7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0M7QUFDQSxpQjtBQUNBO0FBQ0EsOEM7QUFDQSxTQUFTOzs7QUFHVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0M7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyxzQkFBc0I7QUFDM0Qsb0NBQW9DLHFCQUFxQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxZQUFZO0FBQzdDLDhCQUE4QixLQUFLLEtBQUssSUFBSSxJQUFJLElBQUk7OztBQUdwRDtBQUNBLHlEO0FBQ0EsK0I7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJO0FBQ2xFO0FBQ0E7QUFDQSxhQUFhOztBQUViLFM7O0FBRUEsbUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0IsMERBQTBEO0FBQzFELHdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7O0FBR1Qsb0NBQW9DLGdCQUFnQjtBQUNwRCxtQ0FBbUMsZUFBZTs7QUFFbEQ7O0FBRUE7QUFDQTs7QUFFQSxvQjtBQUNBLHlCOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViLFNBQVMsRUFBRTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxFOztBQUVUO0FBQ0E7QUFDQSxpRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOzs7QUFHYjs7QUFFQTtBQUNBO0FBQ0EsU0FBUyxFQUFFOzs7QUFHWDtBQUNBLDBDOztBQUVBO0FBQ0EsRTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsTUFBTSxFO0FBQ3hDLDRCQUE0QixNQUFNLFM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0M7QUFDQSxVOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLGNBQWMsSUFBSSxhQUFhLElBQUksYUFBYSxFO0FBQzFFOztBQUVBLDRDOztBQUVBO0FBQ0EsOEM7QUFDQSxzQkFBc0Isb0NBQW9DOzs7QUFHMUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IsS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJO0FBQ3REOztBQUVBLDZCO0FBQ0Esa0I7QUFDQSxDQUFDOztBQUVEO0FBQ0Esc0JBQXNCLG9DQUFvQzs7QUFFMUQsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QztBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQSxXO0FBQ0EsQ0FBQyxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8v0YTQvtC9XHJcbmNvbnN0IHBvcGFwV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAvL3BvcGFwXHJcbmNvbnN0IHB1enpsZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsvL9C/0L7Qu9C1XHJcbmNvbnN0IGFkZGl0aW9uYWxXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7Ly/QtNC+0L8u0L/QvtC70LVcclxuY29uc3QgY2VsbFNpemUgPSA5OTsgLy/RgNCw0LfQvNC10YAg0LrQu9C10YLQutC4XHJcbmNvbnN0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8v0LrQu9C10YLQutCwIFxyXG5jb25zdCBjb25ncmF0dWxhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5jb25zdCBzb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XHJcbmNvbnN0IHNvdW5kV2luID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcclxuXHJcbmxldCBjb3VudCA9IDA7ICAvL9GB0YfQtdGC0YfQuNC6INC60LvQuNC60L7QslxyXG5sZXQgc2VjPSAwO1xyXG5sZXQgbWluID0gMDtcclxubGV0IGhvdXIgPSAwO1xyXG5cclxuLy9jb25zdCBidG5QbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbmNvbnN0IGJ0blBhdXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG5jb25zdCBidG5OZXdHYW1lID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5jb25zdCBidG5Tb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5jb25zdCBidG5Qcm9ncmVzcyA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuY29uc3QgYnRuU2VsZWN0M3gzID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5jb25zdCBidG5Db250aW51ZSA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcblxyXG5jb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIC8v0YTQvtC9ICAgICAgICBcclxuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXInKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICAgICAgICAvL9C/0L7Qu9C1ICAgICAgICBcclxuICAgICAgICBwdXp6bGVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3B1enpsZS13cmFwcGVyJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwdXp6bGVXcmFwcGVyKTtcclxuXHJcbiAgICAgICAgLy/QutC70LXRgtC60LggICAgICBcclxuICAgICAgICBwdXp6bGVXcmFwcGVyLmFwcGVuZENoaWxkKGNyZWF0ZUNlbGxzKCkpO1xyXG5cclxuICAgICAgICAvL9C00L7Qv9C+0LvQvdC40YLQtdC70YzQvdC+0LUg0L/QvtC70LVcclxuICAgICAgICBhZGRpdGlvbmFsV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdhZGRpdGlvbmFsLXdyYXBwZXInKTtcclxuICAgICAgICBhZGRpdGlvbmFsV3JhcHBlci5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInNjb3JlXCI+c2NvcmU6ICR7IGNvdW50fTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lXCI+PHNwYW4+MCR7aG91cn06IDAke21pbn06IDAke3NlY308L3NwYW4+PC9kaXY+YDtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvL9C60L3QvtC/0LrQsCBwbGF5XHJcbiAgICAgICAgLy9idG5QbGF5LmNsYXNzTGlzdC5hZGQoJ3BsYXknLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgLy9idG5QbGF5LnRleHRDb250ZW50ID0gXCJQTEFZXCI7ICAgICAgICBcclxuICAgICAgICAvL2FkZGl0aW9uYWxXcmFwcGVyLmFwcGVuZENoaWxkKGJ0blBsYXkpO1xyXG4gICAgICAgIGJ0blBhdXNlLmNsYXNzTGlzdC5hZGQoJ3BhdXNlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ0blBhdXNlLnRleHRDb250ZW50ID0gXCJQQVVTRVwiOyAgICAgICAgXHJcbiAgICAgICAgYWRkaXRpb25hbFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuUGF1c2UpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFkZGl0aW9uYWxXcmFwcGVyKTtcclxuICAgICAgXHJcblxyXG4gICAgICAgIC8vcG9wYXBcclxuICAgICAgICBwb3BhcFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wYXAtd3JhcHBlcicpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wYXBXcmFwcGVyKTtcclxuICAgICAgICAvL9GN0LvQtdC80LXQvdGC0YsgcG9wYXBcclxuICAgICAgICBidG5OZXdHYW1lLmNsYXNzTGlzdC5hZGQgKCdidXR0b24nLCAnYnV0dG9uLW5ld2dhbWUnKTtcclxuICAgICAgICBidG5OZXdHYW1lLnRleHRDb250ZW50ID0gXCJOZXcgR2FtZVwiOyAgICAgICAgXHJcbiAgICAgICAgcG9wYXBXcmFwcGVyLmFwcGVuZENoaWxkKGJ0bk5ld0dhbWUpO1xyXG5cclxuICAgICAgICBidG5Qcm9ncmVzcy5jbGFzc0xpc3QuYWRkICgnYnV0dG9uJywgJ2J1dHRvbi1wcm9ncmVzcycpO1xyXG4gICAgICAgIGJ0blByb2dyZXNzLnRleHRDb250ZW50ID0gXCJQcm9ncmVzc1wiOyAgICAgICAgXHJcbiAgICAgICAgcG9wYXBXcmFwcGVyLmFwcGVuZENoaWxkKGJ0blByb2dyZXNzKTtcclxuXHJcbiAgICAgICAgYnRuU2VsZWN0M3gzLmNsYXNzTGlzdC5hZGQgKCdidXR0b24nLCAnYnV0dG9uLXNlbGVjdDN4MycpO1xyXG4gICAgICAgIGJ0blNlbGVjdDN4My50ZXh0Q29udGVudCA9IFwiM3gzXCI7ICAgICAgICBcclxuICAgICAgICBwb3BhcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuU2VsZWN0M3gzKTtcclxuXHJcbiAgICAgICAgY29uZ3JhdHVsYXRpb24uY2xhc3NMaXN0LmFkZCgnY29uZ3JhdHVsYXRpb24nKTtcclxuXHJcbiAgICAgICAgc291bmQuc2V0QXR0cmlidXRlKCdzcmMnLCAnc3JjL2Fzc2V0cy8xNTk2ODMwNjM3X2NsaWNrYjcubXAzJyk7ICAgICBcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNvdW5kKTtcclxuXHJcbiAgICAgICAgc291bmRXaW4uc2V0QXR0cmlidXRlKCdzcmMnLCAnc3JjL2Fzc2V0cy85MDNhOWUxMjBlN2I5YjMubXAzJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzb3VuZFdpbik7XHJcblxyXG4gICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgIC8v0LDQvdC40LzQsNGG0LjRjyDRhNC+0L3QsFxyXG4gICAgICAgLyogY29uc3QgYmxpbmtCZyA9ICgpID0+IHtcclxuICAgICAgICAgICAgd3JhcHBlci5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcGFjaXR5QmcgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod3JhcHBlci5zdHlsZS5vcGFjaXR5ID4gMC43KXtcclxuICAgICAgICAgICAgICAgICAgd3JhcHBlci5zdHlsZS5vcGFjaXR5IC09IDAuMTsgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHNlbGVjdE9wYWNpdHlCZywgMTAwMCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSovXHJcblxyXG5cclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNlbGxzKCkge1xyXG4gICAgXHJcbiAgICBjb25zdCBjZWxscyA9IFtdO1xyXG4gICAgY29uc3QgZW1wdHkgPSB7XHJcbiAgICAgICAgdmFsdWU6IDAsICAgIFxyXG4gICAgICAgIHRvcDogMCxcclxuICAgICAgICBsZWZ0OiAwXHJcbiAgICB9OyAgXHJcbiAgICBjZWxscy5wdXNoKGVtcHR5KTtcclxuXHJcbiAgICAvL9C/0L7QvNC10L3Rj9GC0YzRgdGPINC60L7QvtGA0LTQuNC90LDRgtCw0LzQuFxyXG4gICAgZnVuY3Rpb24gbW92ZSAoaW5kZXgpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjZWxsID0gY2VsbHNbaW5kZXhdOyAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvL9C40YnQtdC8INGA0LDQt9C90LjRhtGDINGBINC60L7QvtGA0LQu0L/Rg9GB0YLQvtC5INC60LvQtdGC0LrQuFxyXG4gICAgICAgIGNvbnN0IGxlZnRWYXIgPSBNYXRoLmFicyhlbXB0eS5sZWZ0IC0gY2VsbC5sZWZ0KTtcclxuICAgICAgICBjb25zdCB0b3BWYXIgPSBNYXRoLmFicyhlbXB0eS50b3AgLSBjZWxsLnRvcCk7XHJcbiAgICAgICAgLy/QtdGB0LvQuCDRgNGP0LTQvtC8INC/0YPRgdGC0L7QuSDQutC70LXRgtC60Lgg0L3QtdGCLCDQvdC40YfQtdCz0L4g0L3QtSDQtNC10LvQsNC5XHJcbiAgICAgICAgaWYgKGxlZnRWYXIgKyB0b3BWYXIgPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2VsbC5lbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtlbXB0eS5sZWZ0ICogY2VsbFNpemV9cHhgO1xyXG4gICAgICAgIGNlbGwuZWxlbWVudC5zdHlsZS50b3AgPSBgJHtlbXB0eS50b3AgKiBjZWxsU2l6ZX1weGA7XHJcbiAgICAgICAgLy/QsiDQv9GA0L7QvNC10LYu0L/QtdGA0LXQvNC10L3QvdGL0LUg0LfQsNC/0LjRgdGL0LLQsNC10Lwg0LrQvtC+0YDQtC3RgtGLINC/0YPRgdGC0L7QuSDQutC70LXRgtC60LhcclxuICAgICAgICBjb25zdCBlbXB0eUxlZnQgPSBlbXB0eS5sZWZ0O1xyXG4gICAgICAgIGNvbnN0IGVtcHR5VG9wID0gZW1wdHkudG9wO1xyXG4gICAgICAgIC8v0LIg0LrQvtC+0YDQtC3RgtGLINC/0YPRgdGC0L7QuSDQutC70LXRgtC60Lgg0LfQsNC/0LjRgdGL0LLQsNC10Lwg0LrQvtC+0YDQtC3RgtGLINGC0LXQutGD0YnQtdC5INC60LvQtdGC0LrQuFxyXG4gICAgICAgIGVtcHR5LmxlZnQgPSBjZWxsLmxlZnQ7XHJcbiAgICAgICAgZW1wdHkudG9wID0gY2VsbC50b3A7XHJcbiAgICAgICAgLy/QsiDQutC+0L7RgNC0LdGC0Ysg0YLQtdC60YPRidC10Lkg0LrQu9C10YLQutC4INC30LDQv9C40YHRi9Cy0LDQtdC8INC60L7QvtGA0LQt0YLRiyDQv9GD0YHRgtC+0LlcclxuICAgICAgICBjZWxsLmxlZnQgPSBlbXB0eUxlZnQ7XHJcbiAgICAgICAgY2VsbC50b3AgPSBlbXB0eVRvcDtcclxuXHJcbiAgICAgICAgY29uc3QgaXNGaW5pc2hlZCA9IGNlbGxzLmV2ZXJ5KGNlbGwgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gY2VsbC52YWx1ZSA9PT0gY2VsbC50b3AgKiA0ICsgY2VsbC5sZWZ0O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAoXCLQktGLINCy0YvQuNCz0YDQsNC70LghXCIpO1xyXG4gICAgICAgICAgICAvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XHJcbiAgICAgICAgICAgIGNvbmdyYXR1bGF0aW9uLmlubmVySFRNTCA9IFxyXG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cImNvbmdyYXR1bGF0aW9uXCI+PHNwYW4+Q29uZ3JhdHVsYXRpb25zITwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4+WW91IHdvbiB3aXRoICR7IGNvdW50ICsgMSB9IHNjb3JlIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4+Zm9yIHRpbWUgMCR7aG91cn06IDAke21pbn06ICR7c2VjfTwvc3Bhbj48L2Rpdj5gO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbmdyYXR1bGF0aW9uKTsgXHJcbiAgICAgICAgICAgICAgIHNvdW5kV2luLnBsYXkoKTsgIFxyXG4gICAgICAgICAgICB9LCAzMDApICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBjb25ncmF0dWxhdGlvbi5hZGRFdmVudExpc3RlbmVyICgnY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb25ncmF0dWxhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBwb3BhcFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLypjb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZWMgPSAwO1xyXG4gICAgICAgICAgICAgICAgbWluID0gMDtcclxuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxXcmFwcGVyLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwic2NvcmVcIj48c3Bhbj5zY29yZTogMDwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lXCI+PHNwYW4+MCR7aG91cn06IDAke21pbn06IDAke3NlY308L3NwYW4+PC9kaXY+YDtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxXcmFwcGVyLmFwcGVuZENoaWxkKGJ0blBhdXNlKTtcclxuICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0gICAgICAgXHJcblxyXG4gICAgICAgIGFkZFNjb3JlKCk7ICBcclxuXHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXdDZWxscyA9IFsuLi5BcnJheSgxNSkua2V5cygpXTtcclxuICAgIC8vLnNvcnQoKCkgPT4gTWF0aC5yYW5kb20oKSAtIDAuNSk7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDE2OyBpKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAvL9C60LvQtdGC0LrQsCAgXHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBuZXdDZWxsc1tpLTFdICsgMTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgY2VsbEVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZTtcclxuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwdXp6bGUtY2VsbCcpO1xyXG4gICAgICAgIC8v0YDQsNC30YDQtdGI0LjRgtGMINC/0LXRgNC10YLQsNGB0LrQuNCy0LDQvdC40LUg0LzRi9GI0YzRjlxyXG4gICAgICAgIGNlbGxFbGVtZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTsgXHJcblxyXG4gICAgICAgIGNvbnN0IGxlZnQgPSBpICUgNDtcclxuICAgICAgICBjb25zdCB0b3AgPSAoaSAtIGxlZnQpIC8gNDtcclxuXHJcbiAgICAgICAgY2VsbHMucHVzaCAoe1xyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgIGxlZnQ6IGxlZnQsXHJcbiAgICAgICAgICAgIHRvcDogdG9wLFxyXG4gICAgICAgICAgICBlbGVtZW50OiBjZWxsRWxlbWVudFxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XHJcbiAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUudG9wID0gYCR7dG9wICogY2VsbFNpemV9cHhgO1xyXG5cclxuICAgICAgICBwdXp6bGVXcmFwcGVyLmFwcGVuZChjZWxsRWxlbWVudCk7XHJcblxyXG4gICAgICAgIC8v0JrQm9CY0JpcclxuICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtb3ZlKGkpOyAgXHJcbiAgICAgICAgICAgIHNvdW5kLnBsYXkoKTsgICAgICAgIFxyXG5cclxuICAgICAgICB9KTtcclxuLypcclxuICAgICAgICAvLyBEUkFHIE4gRFJPUCAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9odG1sJywgJ2RyYWdzdGFydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAvKmNlbGxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgLy9jZWxsRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICAgIGNlbGxFbGVtZW50LnN0eWxlLnRvcCA9IGUucGFnZVkgKyAncHgnO1xyXG4gICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS5sZWZ0ID0gZS5wYWdlWCArICdweCc7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgfSwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pOyovXHJcbiAgICAgICAgICAgIC8v0LrQvtCz0LTQsCDQv9GP0YLQvdCw0YjQutCwINC90LDRhdC+0LTQuNGC0YHRjyDQvdCw0LQg0L/Rg9GB0YLRi9C8INC80LXRgdGC0L7QvFxyXG4gLyogICAgICAgcHV6emxlV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkcmFnb3ZlcicpO1xyXG4gICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICBwdXp6bGVXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgLy9jZWxsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGxbal0pOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3B1enpsZVdyYXBwZXIuc2V0QXR0cmlidXRlKCdkcm9wcGFibGUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS50b3AgPSBlLnBhZ2VZICsgJ3B4JztcclxuICAgICAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUubGVmdCA9IGUucGFnZVggKyAncHgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgfSwgMClcclxuXHJcblxyXG4gICAgICAgICAgICAvL3B1enpsZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZHJvcCcpO1xyXG4gICAgICAgIH0pOyAqL1xyXG5cclxuXHJcbiAgICB9O1xyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTsgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxufTsgIFxyXG5cclxuXHJcbi8v0YHRh9C40YLQsNGC0Ywg0YXQvtC00YtcclxuZnVuY3Rpb24gYWRkU2NvcmUoKXtcclxuICAgIGNvbnN0IHNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XHJcbiAgICBjb3VudCsrO1xyXG4gICAgc2NvcmUudGV4dENvbnRlbnQgPSBgc2NvcmU6ICR7Y291bnR9YDsgIFxyXG4gICAgY29uc29sZS5sb2cgKGDQodC00LXQu9Cw0L3QviAke2NvdW50fSDRhdC+0LTQvtCyYCk7ICAgICAgXHJcbn1cclxuLy8gQWRkIFplcm9zIFxyXG5mdW5jdGlvbiBhZGRaZXJvKG51bWJlcikge1xyXG4gICAgcmV0dXJuIChwYXJzZUludChudW1iZXIsIDEwKSA8IDEwID8gJzAnIDogJycpICsgbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCB0aW1lciA9ICgpID0+e1xyXG4gICAgbGV0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xyXG4gICAgLy90aW1lLmNsYXNzTGlzdC5hZGQoJy50aW1lJyk7ICAgIFxyXG4gICAgc2VjKys7IFxyXG4gICAgXHJcbiAgICBpZiAoc2VjID09PSA2MCl7XHJcbiAgICAgICAgc2VjID0gMDtcclxuICAgICAgICBtaW4gKz0gMTtcclxuICAgIH07XHJcbiAgICBpZiAobWluID09PSA2MCl7XHJcbiAgICAgICAgbWluID0gMDtcclxuICAgICAgICBob3VyICs9IDE7XHJcbiAgICB9O1xyXG5cclxuICAgIHRpbWUudGV4dENvbnRlbnQgPSBgJHthZGRaZXJvKGhvdXIpfTogJHthZGRaZXJvKG1pbil9OiAke2FkZFplcm8oc2VjKX1gOyAgIFxyXG59O1xyXG5cclxuY29uc3QgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKHRpbWVyLCAxMDAwKTsgXHJcblxyXG5idG5OZXdHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2cgKCfQutC70LjQuiDQv9C+INC60L3QvtC/0LrQtSDQndC+0LLQsNGPINC40LPRgNCwJyk7ICAgICAgICBcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge3BvcGFwV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnfSwxMDApO1xyXG4gICAgXHJcblxyXG4gICAgLy/QmNCh0J/QoNCQ0JLQmNCi0Kwg0J7QqNCY0JHQmtCjINCSINCa0J7QndCh0J7Qm9CYISFcclxuICAgIC8vcHV6emxlV3JhcHBlci5yZW1vdmVDaGlsZChwdXp6bGVXcmFwcGVyLmNoaWxkTm9kZXMpO1xyXG4gICBcclxuICAgLy8gcHV6emxlV3JhcHBlci5yZW1vdmVDaGlsZChjZWxsRWxlbWVudCk7XHJcbiAgICAvL3B1enpsZVdyYXBwZXIucmVtb3ZlKCk7XHJcbiAgICAvL3B1enpsZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY3JlYXRlQ2VsbHMoKSk7XHJcbiAgICAvL2NlbGxFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2VsbEVsZW1lbnQpOyAgIFxyXG4gICAgLy9wdXp6bGVXcmFwcGVyLnJlcGxhY2VDaGlsZChjcmVhdGVDZWxscygpKTtcclxuICAgIGNvdW50ID0gMDtcclxuICAgIHNlYyA9IDA7XHJcbiAgICBtaW4gPSAwO1xyXG4gICAgaG91ciA9IDA7XHJcblxyXG4gICAgYWRkaXRpb25hbFdyYXBwZXIuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJzY29yZVwiPjxzcGFuPnNjb3JlOiAwPC9zcGFuPjwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInRpbWVcIj48c3Bhbj4wJHtob3VyfTogMCR7bWlufTogMCR7c2VjfTwvc3Bhbj48L2Rpdj5gO1xyXG4gICAgYWRkaXRpb25hbFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuUGF1c2UpO1xyXG5cclxuICAgIHNldEludGVydmFsKHRpbWVyLCAxMDAwKTsgXHJcbiAgICBjcmVhdGVDZWxscygpOyAgICBcclxufSk7XHJcblxyXG5idG5Db250aW51ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge3BvcGFwV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnfSwxMDApO1xyXG5cclxufSlcclxuXHJcbmJ0blBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIFxyXG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcclxuICAgIHBvcGFwV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgYnRuQ29udGludWUuY2xhc3NMaXN0LmFkZCAoJ2J1dHRvbicsICdidXR0b24tY29udGludWUnKTtcclxuICAgIGJ0bkNvbnRpbnVlLnRleHRDb250ZW50ID0gXCJDb250aW51ZVwiOyAgICAgICAgXHJcbiAgICBwb3BhcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuQ29udGludWUpO1xyXG59KTtcclxuXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBpbml0KCk7ICAgICAgICBcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==