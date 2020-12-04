/* const cardWrapper = document.createElement('div');
cardWrapper.classList.add('card-wrapper');
container.appendChild(cardWrapper);

const card = document.createElement('div');
card.classList.add('card');
cardWrapper.appendChild(card);

const front = document.createElement('div');
front.classList.add('card-front');
card.appendChild(front);

const back = document.createElement('div');
back.classList.add('card-back');
card.appendChild(back);

const rotate = document.createElement('div');
rotate.classList.add('card-rotate');
card.appendChild(rotate); */
import cards from './cards';

const renderCategoryPage = () => {  
  
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);
    
    let cardWrapper;
    let cardImage;
    let cardSection; 
    let cardName;
  
    for (let i = 0; i < cards[1].length; i++) {
      cardWrapper = document.createElement('a');
      cardWrapper.classList.add('card-wrapper');
      cardWrapper.setAttribute('href', '#');
      container.appendChild(cardWrapper);
  
  
      cardImage = document.createElement('div');   
      cardImage.innerHTML = `<img src = ${cards[1][i].image} width = '300px' height = '280px'/>`; 
      cardImage.classList.add('card-image');
      cardWrapper.appendChild(cardImage);
  
      cardSection = document.createElement('footer');
      cardSection.classList.add('category-section');
      cardWrapper.appendChild(cardSection);
  
      cardName = document.createElement('span');
      cardName.classList.add('card-name');
      cardName.textContent = `${cards[1][i].word}`
      cardSection.appendChild(cardName);
    }
  };

export default renderCategoryPage;