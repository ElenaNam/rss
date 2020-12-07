
import cards from './cards';
import state from './state';
import { container } from './mainpage';


export const startGame = () => {    
  startGameBtn.parentElement.replaceChild(repeatWrapper, startGameBtn); 
  container.innerHTML = '';
  let cardWrapper;
  let sound;
  cards[state.page].sort(() => Math.random() - 0.5).forEach((el, i) => {
    //console.log(el);
    cardWrapper = document.createElement('a');
      cardWrapper.classList.add('card-wrapper');
      cardWrapper.setAttribute('href', '#');
      cardWrapper.innerHTML = `<img src = ${el.image} width = '100%' height = '100%'/>`;
      sound = new Audio(`${el.audioSrc}`);
      //cardWrapper.style.border = '2px solid yellow';
      container.appendChild(cardWrapper);    
  })
  sound.play();
  



}

const startGameBtn = document.createElement('button');
startGameBtn.classList.add('startgame-button');
startGameBtn.textContent = 'Start Game';

startGameBtn.addEventListener('click', startGame);


const repeatWrapper = document.createElement('div');
repeatWrapper.classList.add('repeat-button__wrapper');

const repeatBtn = document.createElement('button');
repeatBtn.classList.add('repeat-button');
repeatBtn.innerHTML = '<img src = "img/rotate2.png"/>';
repeatWrapper.append(repeatBtn);


export default startGameBtn;
