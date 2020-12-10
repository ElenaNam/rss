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

const fillArrUniqValue = (array) => {
  const resultArr = [];
  let value;
  for (let i = 0; resultArr.length < array.length; i += 1) {
    value = Math.floor(Math.random(array.length) * array.length);
    if (resultArr.indexOf(value) === -1) {
      resultArr.push(value);
    }
  }
  return resultArr;
};

export const startGame = () => {
  container.innerHTML = '';
  container.appendChild(repeatWrapper);

  let cardWrapper;
  let sound;
  let soundNextLink;
  let starWin;
  let star;

  state.audioCurrent = '';

  starWrapper.innerHTML = '';
  container.prepend(starWrapper);
  const arrAudio = [];

  /* отсортируй массив с объектами данных и создай карточки (div) */

  cards[state.page].sort(() => Math.random() - 0.5).forEach((el, i) => {
    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', 'javascript://');
    cardWrapper.style.backgroundColor = 'yellow';
    cardWrapper.style.border = '2px solid yellow';
    cardWrapper.innerHTML = `<img src = ${cards[state.page][i].image} width = '100%' height = '100%'/>`;
    sound = new Audio(`${el.audioSrc}`);
    arrAudio.push(el.audioSrc);
    cardWrapper.appendChild(sound);
    container.appendChild(cardWrapper);
  });

  const arrAudioRandom = fillArrUniqValue(arrAudio);

  state.audioCurrent = cards[state.page][arrAudioRandom[0]].audioSrc;

  new Audio(state.audioCurrent).play();

  Array.from(cardWrapper.parentNode.children).forEach((el) => {
    el.addEventListener('click', () => {
      if (el.classList.contains('card-wrapper') && el.children[1].getAttribute('src') === state.audioCurrent) {
        if (el.children[0].style.opacity !== '0.2') {
          el.children[0].style.opacity = '0.2';
          starWin = document.createElement('div');
          starWin.classList.add('star');
          starWin.innerHTML = '<img src = "img/star-win.svg"/>';
          starWrapper.appendChild(starWin);
          new Audio('audio/correct.mp3').play();

          if (arrAudioRandom.length === 1) { /* если карточки кончились */
            container.innerHTML = '';
            const resultWrapper = document.createElement('div');
            resultWrapper.classList.add('result-wrapper');

            if (state.error > 0) {
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
            }, 2000);
          } else { /* если карточки еще не кончились */
            soundNextLink = cards[state.page][arrAudioRandom[arrAudioRandom.length - 1]].audioSrc;
            arrAudioRandom.pop();
            state.audioCurrent = soundNextLink;

            setTimeout(() => {
              new Audio(state.audioCurrent).play();
            }, 1000);
          }
        }
      } else if (el.classList.contains('card-wrapper') && el.children[0].style.opacity !== '0.2') {
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
  });
};

const startGameBtn = document.createElement('button');
startGameBtn.classList.add('startgame-button');
startGameBtn.textContent = 'Start Game';

startGameBtn.addEventListener('click', () => {
  startGame();
});

export default startGameBtn;
