import cards from './cards';
import rotateCard from './card';
import { container } from './mainpage';
import state from './state';


/* export let containerCategoryPage; */


const renderCategoryPage = (category, index) => {
  //console.log('страница категории state.page = ' + state.page);
/*   containerCategoryPage = document.createElement('div');
  containerCategoryPage.classList.add('container'); */
 /*  document.body.appendChild(containerCategoryPage);   */
  /* container.appendChild(containerCategoryPage);  */ 
  

  let cardWrapper;
  let front;
  let back;
  let cardSection;
  let cardName;
  let rotateBtn;  
  /* const index = cards[0].findIndex((el) => el === category); */

  cards[index].forEach((elem) => {
    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', '#');
    /* containerCategoryPage.appendChild(cardWrapper); */
    container.appendChild(cardWrapper);

    /* front */
    front = document.createElement('div');
    front.innerHTML = `<img src = ${elem.image} width = '300px' height = '260px'/>`;
    front.classList.add('front');
    cardWrapper.appendChild(front);

    cardSection = document.createElement('footer');
    cardSection.classList.add('category-section', 'front');
    cardWrapper.appendChild(cardSection);
    
    cardName = document.createElement('span');
    cardName.classList.add('card-name');
    cardName.textContent = `${elem.word}`;
    /* console.log(cardName); */
    cardSection.appendChild(cardName);

    /* back */

    back = document.createElement('div');
    back.innerHTML = `<img src = ${elem.image} width = '300px' height = '260px'/>`;
    back.classList.add('back');
    cardWrapper.appendChild(back);    

    cardSection = document.createElement('footer');
    cardSection.classList.add('category-section', 'back');
    cardWrapper.appendChild(cardSection);
    
    cardName = document.createElement('span');
    cardName.classList.add('card-name');
    cardName.textContent = `${elem.translation}`;
    /* console.log(cardName); */
    cardSection.appendChild(cardName);

    const sound = new Audio(`${elem.audioSrc}`);

    rotateBtn = document.createElement('button');
    rotateBtn.classList.add('rotate-button');   
    rotateBtn.innerHTML = '<img src = "img/rotate1.png"/>'; 
    cardWrapper.append(rotateBtn);

    rotateBtn.addEventListener('click', (e) => {  
      e.stopPropagation();
      console.log(e.currentTarget.parentNode.children[0]); 
      console.log(e.currentTarget.parentNode.children[2]); 
      

      e.currentTarget.parentNode.children[0].style.transform = 'rotateY(180deg)';
      e.currentTarget.parentNode.children[2].style.transform = 'rotateY(360deg)';

/*       front.style.transform = 'rotateY(180deg)';
      back.style.transform = 'rotateY(360deg)';  */


      sound.volume = 0;
      /* cardName.textContent = `${elem.translation}`; */

    })

    cardWrapper.addEventListener('click', (e) => {      
      console.log(e.target);                        
      sound.play();
    })

    cardWrapper.addEventListener('mouseleave', () => {
      //cardWrapper.children[0].style.transform = 'rotateY(360deg)';
      //cardWrapper.children[2].style.transform = 'rotateY(180deg)';  
      front.style.transform = 'rotateY(360deg)';
      back.style.transform = 'rotateY(180deg)';   
    })
  });
};

export default renderCategoryPage
