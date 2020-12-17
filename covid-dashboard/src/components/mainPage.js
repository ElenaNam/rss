import renderMap, { mapWrapper } from './map';


const renderMainPage = () => { 
    const mainPageWrapper = document.createElement('div');
    mainPageWrapper.classList.add('main-page-wrapper');
    document.body.appendChild(mainPageWrapper);
    console.log(mapWrapper);
    renderMap();
    mainPageWrapper.appendChild(mapWrapper);
}

export default renderMainPage;