const wrapper = document.createElement('div'); //фон
const puzzleWrapper = document.createElement('div');//поле

//const cellContainer = document.createElement('div'); //строка
const fragment = document.createDocumentFragment();

/*let cells = [
    ['1','2','3','4'],
    ['5','6','7','8'],
    ['9','10','11','12'],
    ['13','14','15']
  ];*/

let cells = [
    '1','2','3','4',
    '5','6','7','8',
    '9','10','11','12',
    '13','14','15'
];

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


    cells.forEach(cell => {           
             

                    const cellElement = document.createElement('div'); //клетка
                    cellElement.classList.add('puzzle-cell');
                    cellElement.textContent = cell;
                        
                        
                    //разрешить перетаскивание мышью
                    cellElement.setAttribute('draggable', 'true'); 
                    //                     
                    cellElement.addEventListener('dragstart', function(){
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
                        puzzleWrapper.appendChild(cell);
                        console.log('drop');
                    }); 

                        //КЛИК
                    cellElement.addEventListener('click', function(){
                            //
                        cellElement.classList.remove('puzzle-cell');
                        
                            
                    });

                                                   
                        
                    /*} else {
                        cellElement.classList.add('puzzle-cell--empty');
                     
                        //когда пятнашка находится над пустым местом
                        cellElement.addEventListener('dragover', function(e){
                            e.preventDefault();
                            console.log('dragover');
                        }); 

                        //
                        cellElement.addEventListener('drop', function(){
                            cellContainer.appendChild(cell[j]);
                            console.log('drop');
                        }); 

                    }*/
                    //cellContainer.appendChild(cellElement); 
            //puzzleWrapper.appendChild(cell); 

               // }        
                
 
            //fragment.appendChild(cellContainer);  
            fragment.appendChild(cellElement);

    })        
    return fragment;
};



    


window.addEventListener("DOMContentLoaded", function() {
    init();
    createCells(); 
});