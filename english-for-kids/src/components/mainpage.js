/* import { container } from 'webpack'; */
import cards from './cards';
import renderCategoryPage from './categorypage';
import state from './state';

let container;

const renderMainPage = () => {
  if (!container) {
    container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);
  }

  let cardWrapper;
  let cardImage;
  let cardSection;
  let cardName;

  cards.forEach((el, i) => {
    if (el !== cards[0]) {
      /* console.log(i); */
      cardWrapper = document.createElement('a');
      cardWrapper.classList.add('card-wrapper');
      cardWrapper.setAttribute('href', '#');
      container.appendChild(cardWrapper);

      cardImage = document.createElement('div');
      cardImage.innerHTML = `<img src = ${el[0].image} width = '300px' height = '260px'/>`;
      cardImage.classList.add('front');
      cardWrapper.appendChild(cardImage);

      cardSection = document.createElement('footer');
      cardSection.classList.add('category-section');
      cardWrapper.appendChild(cardSection);

      cardName = document.createElement('span');
      cardName.classList.add('card-name');
      cardName.textContent = `${cards[0][i]}`;
      cardSection.appendChild(cardName);

      cardWrapper.addEventListener('click', (e) => {
        container.innerHTML = '';
        state.page = i;
        renderCategoryPage(e.currentTarget.children[1].children[0].textContent, i);
      });
    }
  });
};
export { container };
export default renderMainPage;
