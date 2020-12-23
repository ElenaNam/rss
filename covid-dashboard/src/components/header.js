const renderHeader = () => { 
    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header-wrapper');
    document.body.appendChild(headerWrapper);

    const header = document.createElement('div');
    header.classList.add('header');
    headerWrapper.appendChild(header);

    const headerSectionImg = document.createElement('div');
    //headerSectionImg.classList.add('header-section-img');

    const arrImg = [
        'img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/5.png',
    ]
/*     arrImg.forEach(img => {
        //headerSectionImg.style.display = 'none';
        //headerSectionImg.classList.add('header-section-img');
        headerSectionImg.innerHTML += `
        <img src = ${img} alt = 'image' width = '170px'/>
        `
    });
    console.log(Array.from(headerSectionImg.children))
         Array.from(headerSectionImg.children).forEach(element => {
            let timer = setInterval(() => {
            element.style.display = 'block';
            //headerSectionImg.classList.add('header-section-img');
            
        }, 3000);
        setTimeout(() => { clearInterval(timer); element.style.display= 'none'; }, 5000);                 
    });   */  
    





    header.appendChild(headerSectionImg);

    const headerSection = document.createElement('div');
    headerSection.classList.add('header-section');
    header.appendChild(headerSection);



    const imgHeader = document.createElement('div');
    imgHeader.classList.add('header-img');
    imgHeader.innerHTML = '<img src = "img/logo.png" alt = "molecule" width = "100%" height = "100%"/>';
    headerSection.appendChild(imgHeader);
    
    const titleHeader = document.createElement('div');
    titleHeader.classList.add('header-title');
    //titleHeader.innerHTML = 'CORONAVIRUS (COVID-19)';
    titleHeader.innerHTML = '<span>CORONAVIRUS</span><span>(COVID-19)</span>';
    headerSection.appendChild(titleHeader);

    const subtitleHeader = document.createElement('span');
    subtitleHeader.classList.add('header-subtitle');   
    const dateToday =  new Date().toLocaleDateString();    
    subtitleHeader.innerHTML = `Актуально на ${dateToday}`;
    header.appendChild(subtitleHeader);




}

export default renderHeader;