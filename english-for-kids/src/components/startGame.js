
import cards from './cards';
import state from './state';
import { container } from './mainpage';

const starWrapper = document.createElement('div');
starWrapper.classList.add('star-wrapper');



export const startGame = () => {    
  
  //startGameBtn.parentElement.replaceChild(repeatWrapper, startGameBtn); 
  container.innerHTML = '';
  container.appendChild(repeatWrapper); 
  
  let cardWrapper;
  let sound;
  
  starWrapper.innerHTML = '';
  container.prepend(starWrapper);

  const starWin = document.createElement('div');
  starWin.classList.add('star');
  starWin.innerHTML = '<img src = "img/star-win.svg"/>';

  const star = document.createElement('div');
  star.classList.add('star');
  star.innerHTML = '<img src = "img/star.svg"/>';


  cards[state.page].sort(() => Math.random() - 0.5).forEach((el, i) => {
    console.log(cards[state.page][i].audioSrc);
    console.log(el);
    console.log(i);
    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', '#');
    cardWrapper.innerHTML = `<img src = ${el.image}/>`;
    
    sound = new Audio(`${el.audioSrc}`);  
    container.appendChild(cardWrapper);  
    //console.log(cardWrapper);
      
    cardWrapper.addEventListener('click', (e) => {  
      
      console.log(e.currentTarget.children);
      if (el.audioSrc == sound.getAttribute('src')) {
        console.log ('верно');
        starWrapper.appendChild(starWin);
        new Audio('audio/success.mp3').play();
        //cards[state.page][i+1]
        i = i + 1;
        setTimeout(() => {
            //new Audio(`${el.audioSrc}`).play()
            new Audio(`${cards[state.page][i].audioSrc}`).play()
        }, 2000);
            
      } else {
        console.log ('ошибка');
        starWrapper.appendChild(star);
        new Audio('audio/failure.mp3').play();
      }
        //i = i -1;
        //new Audio(`${el.audioSrc}`).play();
    })
  })
  sound.play();
  repeatBtn.addEventListener('click', () => {
      sound.play();
  })
}

const startGameBtn = document.createElement('button');
startGameBtn.classList.add('startgame-button');
startGameBtn.textContent = 'Start Game';

startGameBtn.addEventListener('click', () => {
    
    startGame()
});


const repeatWrapper = document.createElement('div');
repeatWrapper.classList.add('repeat-button__wrapper');

const repeatBtn = document.createElement('button');
repeatBtn.classList.add('repeat-button');
repeatBtn.innerHTML = '<img src = "img/rotate2.png"/>';
repeatWrapper.append(repeatBtn);


export default startGameBtn;
