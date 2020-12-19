import renderMap, { mapWrapper } from './map';
import renderTable, { table }  from './table';


const renderMainPage = () => { 
    const mainPageWrapper = document.createElement('div');
    mainPageWrapper.classList.add('main-page-wrapper');
    document.body.appendChild(mainPageWrapper);
    //console.log(mapWrapper);
    renderMap();
    mainPageWrapper.appendChild(mapWrapper);
    renderTable();
    mainPageWrapper.appendChild(table);
}

export default renderMainPage;