const renderHeader = () => { 
    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header-wrapper');
    document.body.appendChild(headerWrapper);

    const header = document.createElement('div');
    header.classList.add('header');
    headerWrapper.appendChild(header);

    const headerSection = document.createElement('div');
    headerSection.classList.add('header-section');
    header.appendChild(headerSection);

    const imgHeader = document.createElement('div');
    imgHeader.classList.add('header-img');
    imgHeader.innerHTML = '<img src = "/img/logo.png" alt = "molecule" width = "100%" height = "100%"/>';
    headerSection.appendChild(imgHeader);
    
    const titleHeader = document.createElement('div');
    titleHeader.classList.add('header-title');
    //titleHeader.innerHTML = 'CORONAVIRUS (COVID-19)';
    titleHeader.innerHTML = '<span>CORONAVIRUS</span><span>(COVID-19)</span>';
    headerSection.appendChild(titleHeader);

    const subtitleHeader = document.createElement('span');
    subtitleHeader.classList.add('header-subtitle');
    subtitleHeader.innerHTML = 'Актуально на 00 декабря 2020г';
    header.appendChild(subtitleHeader);




}

export default renderHeader;