import renderMap, { mapWrapper } from './map1';
import createChart, { chartWrapper } from './chart';
import renderTable, { table }  from './table';
import getListCountries, { listWrapper }from './list';


/* const renderMainPage = setTimeout(() => { 
    const mainPageWrapper = document.createElement('div');
    mainPageWrapper.classList.add('main-page-wrapper');
    document.body.appendChild(mainPageWrapper);
    
    renderMap();
    mainPageWrapper.appendChild(mapWrapper);

    const column2 = document.createElement('div');
    column2.classList.add('column-2');  

    renderTable();    
    column2.appendChild(table);
    getListCountries();
    column2.appendChild(listWrapper);
    mainPageWrapper.appendChild(column2);

}, 1000) */


const renderMainPage = async () => { 
    const mainPageWrapper = document.createElement('div');
    mainPageWrapper.classList.add('main-page-wrapper');
    document.body.appendChild(mainPageWrapper);

    const column1 = document.createElement('div');
    column1.classList.add('column-1');  
    
    //renderMap().then(map => mainPageWrapper.appendChild(mapWrapper));
    renderMap();
    column1.appendChild(mapWrapper);

    createChart();
    column1.appendChild(chartWrapper);

    mainPageWrapper.appendChild(column1);

    const column2 = document.createElement('div');
    column2.classList.add('column-2');  

    renderTable();    
    column2.appendChild(table);
    getListCountries();
    column2.appendChild(listWrapper);
    mainPageWrapper.appendChild(column2);

}

export default renderMainPage;