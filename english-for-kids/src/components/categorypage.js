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

    const sound = new Audio(`${elem.audioSrc}`);

    rotateBtn = document.createElement('button');
    rotateBtn.classList.add('rotate-button');   
    rotateBtn.innerHTML = '<img src = "img/rotate1.png"/>';   
    cardSection.append(rotateBtn);

    rotateBtn.addEventListener('click', (e) => {  
      e.stopPropagation();
      Array.from(e.currentTarget.parentNode.parentNode.children).forEach((el) => {
        if(el.classList.contains('front')) {
          el.setAttribute('style', 'transform: rotateY(180deg)');
        } else if(el.classList.contains('back')) {
          el.setAttribute('style', 'transform: rotateY(360deg)');
        }
      })
      sound.volume = 0;
    })

    cardWrapper.addEventListener('click', (e) => {    
      sound.play();
    })

    cardWrapper.addEventListener('mouseleave', (e) => {
      Array.from(e.currentTarget.children).forEach((el) => {
        if(el.classList.contains('front')) {
          el.removeAttribute('style', 'transform: rotateY(180deg)');         
          e.currentTarget.children[3].lastChild.removeAttribute('style', 'display:none');
        } else if(el.classList.contains('back')) {
          el.removeAttribute('style', 'transform: rotateY(360deg)');
          console.log('при mouseleave back кнопка - ');          
          console.log(e.currentTarget.children[3].lastChild);
        }
      })  
    })
  });
};

export default renderCategoryPage
