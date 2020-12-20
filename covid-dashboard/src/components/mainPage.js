import renderMap, { mapWrapper } from './map';
import renderTable, { table }  from './table';
import getListCountries, { listWrapper }from './list';



const renderMainPage = async () => { 
    const mainPageWrapper = document.createElement('div');
    mainPageWrapper.classList.add('main-page-wrapper');
    document.body.appendChild(mainPageWrapper);
    //console.log(mapWrapper);
    renderMap();
    mainPageWrapper.appendChild(mapWrapper);
    renderTable();
    mainPageWrapper.appendChild(table);
    getListCountries();
    mainPageWrapper.appendChild(listWrapper);

}

export default renderMainPage;