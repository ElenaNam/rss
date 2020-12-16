const renderMainPage = () => { 
    const mainPageWrapper = document.createElement('div');
    mainPageWrapper.classList.add('main-page-wrapper');
    document.body.appendChild(mainPageWrapper);
}

export default renderMainPage;