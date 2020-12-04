import renderHeader from './header';
import cards from './cards';

const renderMainPage = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  let cardWrapper;
  let category;
  let cardSection;
  let categoryName;


  for (let i = 1; i < cards.length; i++) {
    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', '#');
    container.appendChild(cardWrapper);


    category = document.createElement('div');   
    category.innerHTML = `<img src = ${cards[i][0].image} width = '300px' height = '280px'/>`; 
    category.classList.add('category');
    cardWrapper.appendChild(category);

    cardSection = document.createElement('div');
    cardSection.classList.add('category-section');
    cardWrapper.appendChild(cardSection);

    categoryName = document.createElement('span');
    categoryName.classList.add('category-name');
    categoryName.textContent = `${cards[0][i -1]}`
    cardSection.appendChild(categoryName);
  }
};

export default renderMainPage;
