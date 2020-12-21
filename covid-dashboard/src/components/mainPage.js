import renderMap, { mapWrapper } from './map';
import renderTable, { table }  from './table';
import getListCountries, { listWrapper }from './list';



const renderMainPage = async () => { 
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

}

export default renderMainPage;