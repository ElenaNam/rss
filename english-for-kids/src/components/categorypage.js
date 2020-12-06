import cards from './cards';
import { container } from './mainpage';


/* export let containerCategoryPage; */


const renderCategoryPage = (category) => {
/*   containerCategoryPage = document.createElement('div');
  containerCategoryPage.classList.add('container'); */
 /*  document.body.appendChild(containerCategoryPage);   */
  /* container.appendChild(containerCategoryPage);  */ 
  

  let cardWrapper;
  let cardImage;
  let cardSection;
  let cardName;

  const index = cards[0].findIndex((el) => el === category);

  cards[index + 1].forEach((elem) => {
    /* console.log(elem.word); */
    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', '#');
    /* containerCategoryPage.appendChild(cardWrapper); */
    container.appendChild(cardWrapper);

    cardImage = document.createElement('div');
    cardImage.innerHTML = `<img src = ${elem.image} width = '300px' height = '260px'/>`;
    cardImage.classList.add('card-image');
    cardWrapper.appendChild(cardImage);

    const sound = new Audio(`${elem.audioSrc}`);

    cardSection = document.createElement('footer');
    cardSection.classList.add('category-section');
    cardWrapper.appendChild(cardSection);

    cardName = document.createElement('span');
    cardName.classList.add('card-name');
    cardName.textContent = `${elem.word}`;
    cardSection.appendChild(cardName);

    let rotateBtn = document.createElement('button');
    rotateBtn.classList.add('rotate-button');   
    rotateBtn.innerHTML = '<img src = "img/rotate1.png"/>'; 
    cardSection.appendChild(rotateBtn);

    cardWrapper.addEventListener('click', (e) => {
      console.log(e.currentTarget);                        
      sound.play();
    })


  });
};

export default renderCategoryPage
