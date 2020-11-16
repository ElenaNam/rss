const findCellSize = () => {
    const cellElement = document.createElement('div'); //клетка 
    cellElement.classList.add('puzzle-cell');
    //разрешить перетаскивание мышью
    cellElement.setAttribute('draggable', 'true');

    //получить размер клетки из css

    cellSize = parseInt (window.getComputedStyle(cellElement).getPropertyValue("width").replace('px', ''))
    + parseInt (window.getComputedStyle(cellElement).getPropertyValue("margin").replace('px', ''));

    console.log ('cellSize в функции findCellSize ' + cellSize);
    
    return cellSize;
};







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





/*

    if (localStorage.getItem('gameSave')){
        let gameSv = JSON.parse(localStorage.getItem('gameSave'));
        console.log (gameSv);

        btnContinue.classList.add ('button', 'button-continue');
        btnContinue.textContent = "Continue";        
        popapWrapper.appendChild(btnContinue);
                    
    } 

*/


function createCells() { 
    console.log (`cells в createCells ${cells}`);

    // если в памяти сохранены результаты, то возьми оттуда
    let array;
    let empty;
    if (localStorage.getItem('field')){

/*                 // проверь, есть ли в памяти
                let resultMessage;
                if (JSON.parse(localStorage.getItem('results'))){
                    resultMessage = JSON.parse(localStorage.getItem('results'));
                    resultMessage = resultMessage.map(item => {return `Stage ${item.stage}_____${item.score} <br>`}); 
                }        */

        array = JSON.parse(localStorage.getItem('field')); 
        //let newCells = [];
        console.log ('array в if ' + array); 
        console.log (typeof array);

        console.log(array.length);
        console.log(localStorage.field);


        array.map(item => {
            console.log ('item.value в array ' + item.value)
            /* if (item.value === 0) {
                item = empty;
            } */
            newCells.push(+item.value);            
        });
        console.log ('newCells в if ' + newCells); 
    } else {
        //cells = [];
     
        empty = {
        value: 0,    
        top: 0,
        left: 0        
        }; 

        cells.push(empty);    
        newCells = [...Array(15).keys()];
        //.sort(() => Math.random() - 0.5);
        // ---- проверка на собираемость -----
        //isSolvable(newCells);

    } 
        

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
        //насколько клетка смещается влево-вправо (0||99||198||297)
        cell.element.style.left = `${empty.left * cellSize}px`;
        console.log ('cell.element.style.left ' + cell.element.style.left);
        //насколько клетка смещается вниз-вверх (0||99||198||297)
        cell.element.style.top = `${empty.top * cellSize}px`;
        console.log ('cell.element.style.top ' + cell.element.style.top);

           //-------------ОБМЕН КООРДИНАТАМИ----------------    
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
  


    for (let i = 1; i < 16; i++) {       
    
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
        console.log (cells);
        

        cellElement.style.left = `${left * cellSize}px`;
        //console.log ('cellElement.style.left ' + cellElement.style.left);
        cellElement.style.top = `${top * cellSize}px`;  
        //console.log ('cellElement.style.top ' + cellElement.style.top);

        puzzleWrapper.append(cellElement);        
    

    
        //---------------КЛИК------------------
        cellElement.addEventListener('click', () => {
                   
            move(i);  
            sound.play();      
        });
        //---------Уход со страницы------------
        window.onbeforeunload = () => {    
            wrapper.style.opacity = '.7';
            //localStorage.removeItem('field');
            delete localStorage.field;
            let fieldSave = JSON.stringify(cells);
            //localStorage.setItem('field', fieldSave);   
          
        };
    };
        console.log (cellElement);
        fragment.appendChild(cellElement);
        console.log (fragment);           

        return fragment;
};  


    // если в памяти сохранены результаты, то возьми оттуда
    if (localStorage.getItem('field')){
        cells = JSON.parse(localStorage.getItem('field'));  




        function createCells() { 
            console.log (JSON.parse(localStorage.field));
        
        
            if (localStorage.field){
                //array = JSON.parse(localStorage.field);
                //console.log('array ' + array);
                console.log('сохраненная игра'  + JSON.parse(localStorage.field));//так не хочет
                console.log(JSON.parse(localStorage.field));
        
            };
           
                     
          
                /*const newCells = [...Array(15).keys()];
                //.sort(() => Math.random() - 0.5);
                // ---- проверка на собираемость -----
                //isSolvable(newCells);
            */
        
           
                cells = [];
                //const cells = [];
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
        
            
            const newCells = [...Array(15).keys()];
            //.sort(() => Math.random() - 0.5);
            // ---- проверка на собираемость -----
            //isSolvable(newCells);
            
        
            for (let i = 1; i < 16; i++) {       
            
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
                window.onbeforeunload = () => {    
                    delete localStorage.field;
                    let fieldSave = JSON.stringify(cells);
                    localStorage.setItem('field', fieldSave);   
                  
                };
            };
            
                fragment.appendChild(cellElement); 
                   
        
                return fragment;
        };  
        