import cards from './cards';
import { container } from './mainpage';
import startGameBtn from './startGame';

const renderCategoryPage = (category, index, mode) => {
  let cardWrapper;
  let front;
  let back;
  let cardSection;
  let cardName;
  let rotateBtn;
  console.log(mode);

  if (mode === true) {
    cards[index].forEach((elem) => {
      cardWrapper = document.createElement('a');
      cardWrapper.classList.add('card-wrapper');
      cardWrapper.setAttribute('href', '#');
      cardWrapper.style.backgroundColor = 'yellow';
      cardWrapper.innerHTML = `<img src = ${elem.image} width = '100%' height = '100%'/>`;
      cardWrapper.style.border = '2px solid yellow';
      container.appendChild(cardWrapper);
    });

    container.appendChild(startGameBtn);
  } else {
    cards[index].forEach((elem) => {
      cardWrapper = document.createElement('a');
      cardWrapper.classList.add('card-wrapper');
      cardWrapper.setAttribute('href', '#');
      cardWrapper.style.backgroundColor = 'rgb(170, 38, 130)';
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
      cardSection.appendChild(cardName);

      const sound = new Audio(`${elem.audioSrc}`);

      rotateBtn = document.createElement('button');
      rotateBtn.classList.add('rotate-button');
      rotateBtn.innerHTML = '<img src = "img/rotate1.png"/>';
      cardSection.append(rotateBtn);

      rotateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        Array.from(e.currentTarget.parentNode.parentNode.children).forEach((el) => {
          if (el.classList.contains('front')) {
            el.setAttribute('style', 'transform: rotateY(180deg)');
          } else if (el.classList.contains('back')) {
            el.setAttribute('style', 'transform: rotateY(360deg)');
          }
        });
        sound.volume = 0;
      });
      cardWrapper.addEventListener('click', () => {
        sound.play();
      });
      cardWrapper.addEventListener('mouseleave', (e) => {
        Array.from(e.currentTarget.children).forEach((el) => {
          if (el.classList.contains('front')) {
            el.removeAttribute('style', 'transform: rotateY(180deg)');
            e.currentTarget.children[3].lastChild.removeAttribute('style', 'display:none');
          } else if (el.classList.contains('back')) {
            el.removeAttribute('style', 'transform: rotateY(360deg)');
          }
        });
        sound.volume = 1;
      });
    });
  }
};

export default renderCategoryPage;
