const Puzzle = {

    properties: {
        value: ''

    },

    init() {
        //фон
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        document.body.appendChild(wrapper);

        //поле
        const puzzleWrapper = document.createElement('div');
        puzzleWrapper.classList.add('puzzle-wrapper');
        document.body.appendChild(puzzleWrapper);

        //клетки    
        puzzleWrapper.appendChild(this.createCells());

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


    },

    createCells() {
        const fragment = document.createDocumentFragment();
        let cells = [
          ['1','2','3','4'],
          ['5','6','7','8'],
          ['9','10','11','12'],
          ['13','14','15','']
        ];
        
        /*let cells = [
            '1','2','3','4',
            '5','6','7','8',
            '9','10','11','12',
            '13','14','15',''
        ];*/

        cells.forEach(cell => {
            //const cellElement = document.createElement('div');
            const cellContainer = document.createElement('div'); 
            cellContainer.classList.add('cell-container');
            
                for (let j = 0; j < cell.length; j++){
                    const cellElement = document.createElement('div'); 
                    cellElement.textContent = cell[j];
                    
                    if (cell[j].length > 0){
                        cellElement.classList.add('puzzle-cell'); 
                    } else {
                        cellElement.classList.add('puzzle-cell--empty'); 
                    }
                    cellContainer.appendChild(cellElement); 

                }


            
                
               


                

/*
                cellElement.textContent = cell; 
                //проверка на пустую строку
                if (cell){
                    cellElement.classList.add('puzzle-cell'); 
                } else {
                    cellElement.classList.add('puzzle-cell--empty'); 
                }
 */            
            
            

                              
          
            

            fragment.appendChild(cellContainer);  

        })        
        return fragment;
    }
}

window.addEventListener("DOMContentLoaded", function() {
    Puzzle.init();
});