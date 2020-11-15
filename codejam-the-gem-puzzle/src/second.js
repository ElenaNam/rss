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



