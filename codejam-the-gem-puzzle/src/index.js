const wrapper = document.createElement('div'); //фон
const puzzleWrapper = document.createElement('div');//поле
const cellSize = 95; //размер клетки
const cellElement = document.createElement('div'); //клетка   

//const cellContainer = document.createElement('div'); //строка
const fragment = document.createDocumentFragment();

/*let cells = [
    ['1','2','3','4'],
    ['5','6','7','8'],
    ['9','10','11','12'],
    ['13','14','15']
  ];*/

/*let cells = [
    '1','2','3','4',
    '5','6','7','8',
    '9','10','11','12',
    '13','14','15',''
];*/



function init() {
        //фон        
        wrapper.classList.add('wrapper');
        document.body.appendChild(wrapper);

        //поле        
        puzzleWrapper.classList.add('puzzle-wrapper');
        document.body.appendChild(puzzleWrapper);

        //клетки
           
        //puzzleWrapper.appendChild(createCells());
        puzzleWrapper.appendChild(createCells());

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
        //
        //cellElement.classList.remove('puzzle-cell');
        move(i);     
                               
        });
    };

                    //                     
                    /*cellElement.addEventListener('dragstart', function(){
                            //                            
                        setTimeout(() => {
                            this.style.display = 'none';
                        }, 0)
                            
                    });

                    cellElement.addEventListener('dragend', function(){
                            //
                        setTimeout(() => {
                            this.style.display = 'flex';
                        }, 0)
                            
                    });

                        //когда пятнашка находится над пустым местом
                    puzzleWrapper.addEventListener('dragover', function(e){
                        e.preventDefault();
                        console.log('dragover');
                    }); 
                                
                        //
                    puzzleWrapper.addEventListener('drop', function(){
                        //cellContainer.appendChild(cell[j]);
                        //puzzleWrapper.appendChild(cellElement);
                        console.log('drop');
                    }); 
*/


  
        fragment.appendChild(cellElement);
        return fragment;
};       
      


window.addEventListener("DOMContentLoaded", function() {
    init();    
});