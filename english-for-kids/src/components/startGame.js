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


export const startGame = () => {
  // startGameBtn.parentElement.replaceChild(repeatWrapper, startGameBtn);
  container.innerHTML = '';
  container.appendChild(repeatWrapper);

  let cardWrapper;
  let sound;
  let soundNextLink;
  let starWin;
  let star;

  starWrapper.innerHTML = '';
  container.prepend(starWrapper);

  // отсортируй массив с объектами данных и создай карточки (div)

  cards[state.page].sort(() => Math.random() - 0.5).forEach((el, i) => {
    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', '#');
    cardWrapper.innerHTML = `<img src = ${cards[state.page][i].image} width = '100%' height = '100%'/>`;
    sound = new Audio(`${el.audioSrc}`);
    cardWrapper.appendChild(sound);
    container.appendChild(cardWrapper);
    // console.log(cardWrapper.parentNode.children);
  });
  sound.play();

  const arrayCardWrappers = Array.from(cardWrapper.parentNode.children);
  console.log(Array.from(cardWrapper.parentNode.children));
  console.log(arrayCardWrappers);

  Array.from(cardWrapper.parentNode.children).forEach((el, j) => { // массив с карточками (div)
    console.log(cardWrapper.parentNode.children.length);

    el.addEventListener('click', (e) => {
      // console.log(el);
      // если выбранная карточка соответствует звуку (первому по умолчанию или последующему), то
      // измени ее внешний вид, издай радостный звук, подари желтую звезду и
      // через секунду давай следующий звук

      if (el.classList.contains('card-wrapper') && el.children[1].getAttribute('src') == sound.getAttribute('src') || el.children[1].getAttribute('src') == soundNextLink) {
        if (el.children[0].style.opacity !== '0.2') {
          el.children[0].style.opacity = '0.2';
          // el.children[0].style.pointerEvents = "none";
          starWin = document.createElement('div');
          starWin.classList.add('star');
          starWin.innerHTML = '<img src = "img/star-win.svg"/>';
          starWrapper.appendChild(starWin);          
          new Audio('audio/correct.mp3').play();
          console.log(Array.from(cardWrapper.parentNode.children)[0]);
          console.log(el.parentNode.children.length);
          console.log(j);

          if(j === 2) {
            console.log('конец игры');
            container.innerHTML = '';
            const resultWrapper = document.createElement('div');
            resultWrapper.classList.add('result-wrapper');

            if(state.error > 0){ 
              console.log('state.error ' + state.error);   
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
              renderHeader();
              renderMainPage();
            }, 2000)

          } else {
            soundNextLink = e.currentTarget.previousElementSibling.children[1].getAttribute('src');
            setTimeout(() => {
              new Audio(`${soundNextLink}`).play();
            }, 1000);
          }
        }
      } else {
        star = document.createElement('div');
        star.classList.add('star');
        star.innerHTML = '<img src = "img/star.svg"/>';
        starWrapper.appendChild(star);
        new Audio('audio/error.mp3').play();
        state.error = +1;
      }
    });
    repeatBtn.addEventListener('click', (e) => {
      console.log(e.currentTarget.parentNode);
      sound.play();
    });
  });
};

const startGameBtn = document.createElement('button');
startGameBtn.classList.add('startgame-button');
startGameBtn.textContent = 'Start Game';

startGameBtn.addEventListener('click', () => {
  startGame();
});



export default startGameBtn;
