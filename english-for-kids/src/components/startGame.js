import cards from './cards';
import state from './state';
import renderMainPage, { container } from './mainpage';
import renderHeader from './header';

const starWrapper = document.createElement('div');
starWrapper.classList.add('star-wrapper');
const repeatWrapper = document.createElement('div');
repeatWrapper.classList.add('repeat-button__wrapper');

const repeatBtn = document.createElement('button');
repeatBtn.classList.add('repeat-button');
repeatBtn.innerHTML = '<img src = "img/rotate2.png"/>';
repeatWrapper.append(repeatBtn); 


//let repeatBtn;




export const startGame = () => {

  container.innerHTML = '';
  container.appendChild(repeatWrapper);
  state.count += 1;
  console.log(state.count);


  let cardWrapper;
  let sound;
  let soundNextLink;
  let starWin;
  let star;

/*   if(!repeatBtn) {
    repeatBtn = document.createElement('button');
    repeatBtn.classList.add('repeat-button');
    repeatBtn.innerHTML = '<img src = "img/rotate2.png"/>';
    repeatWrapper.append(repeatBtn);
  } */
  state.audioCurrent = '';
  console.log('state.audioCurrent в начале новой игры ' + state.audioCurrent);

  starWrapper.innerHTML = '';
  container.prepend(starWrapper);
  

  // отсортируй массив с объектами данных и создай карточки (div)

  cards[state.page].sort(() => Math.random() - 0.5).forEach((el, i) => {
    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', '#');
    cardWrapper.style.backgroundColor = 'yellow';
    cardWrapper.style.border = '2px solid yellow';
    cardWrapper.innerHTML = `<img src = ${cards[state.page][i].image} width = '100%' height = '100%'/>`;
    sound = new Audio(`${el.audioSrc}`);
    state.audioCurrent = sound.src;
    console.log('при созданиии карточек ' + state.audioCurrent);
    cardWrapper.appendChild(sound);
    container.appendChild(cardWrapper);

  });
  sound.play();
  
  console.log('первый звук ' + state.audioCurrent);


  Array.from(cardWrapper.parentNode.children).forEach((el, j) => { // массив с карточками (div)   
    console.log(j);
    el.addEventListener('click', (e) => {

      if (el.classList.contains('card-wrapper') && (el.children[1].getAttribute('src') === sound.getAttribute('src') || el.children[1].getAttribute('src') === soundNextLink)) {

        if (el.children[0].style.opacity !== '0.2') {
          el.children[0].style.opacity = '0.2';
          starWin = document.createElement('div');
          starWin.classList.add('star');
          starWin.innerHTML = '<img src = "img/star-win.svg"/>';
          starWrapper.appendChild(starWin);          
          new Audio('audio/correct.mp3').play();

          if(j === 2) {// если карточки кончились
            container.innerHTML = '';
            const resultWrapper = document.createElement('div');
            resultWrapper.classList.add('result-wrapper');

            if(state.error > 0){ 
              resultWrapper.innerHTML = `
              <span>Сделано ошибок: ${state.error}!</span>
              <img src = "img/failure.png"/>`;              
            } else {
              resultWrapper.innerHTML = `
              <span>Ура! Победа!</span>
              <img src = "img/smailWin.png" width = '385px'/>`; 
            }
            container.append(resultWrapper);
            setTimeout(() => {              
              state.play = false;
              state.page = 0;
              state.error = 0;
              /* state.audioCurrent = ''; */
              renderHeader();
              renderMainPage();
            }, 2000)

          } else { //если карточки еще не кончились 
            soundNextLink = e.currentTarget.previousElementSibling.children[1].getAttribute('src');           
            state.audioCurrent = soundNextLink;
            setTimeout(() => {
              //new Audio(`${soundNextLink}`).play();
              new Audio(state.audioCurrent).play();             
              console.log('следующий звук ' + state.audioCurrent);
            }, 1000);
          }
        }
      } else if (el.classList.contains('card-wrapper')){
        star = document.createElement('div');
        star.classList.add('star');
        star.innerHTML = '<img src = "img/star.svg"/>';
        starWrapper.appendChild(star);
        new Audio('audio/error.mp3').play();        
        state.error += 1;
      }
    });
  });
  repeatBtn.addEventListener('click', () => {    
    new Audio(state.audioCurrent).play();  
    console.log('текущий не по клику но в цикле ' + state.audioCurrent);
  });
};

const startGameBtn = document.createElement('button');
startGameBtn.classList.add('startgame-button');
startGameBtn.textContent = 'Start Game';

startGameBtn.addEventListener('click', () => {
  startGame();
});



export default startGameBtn;
