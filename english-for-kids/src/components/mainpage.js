import renderHeader from './header';
import cards from './cards';
import createVariables from './variables';
import renderCategoryPage from './categorypage';



const renderMainPage = () => {  
/*   const pageWrapper = document.createElement('div');
  pageWrapper.classList.add('page-wrapper');
  document.body.appendChild(pageWrapper); */
  
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  let cardWrapper;
  let cardImage;
  let cardSection; 
  let cardName;

  for (let i = 1; i < cards.length; i++) {
    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', '#');
    container.appendChild(cardWrapper);


    cardImage = document.createElement('div');   
    cardImage.innerHTML = `<img src = ${cards[i][0].image} width = '300px' height = '280px'/>`; 
    cardImage.classList.add('card-image');
    cardWrapper.appendChild(cardImage);

    cardSection = document.createElement('footer');
    cardSection.classList.add('category-section');
    cardWrapper.appendChild(cardSection);

    cardName = document.createElement('span');
    cardName.classList.add('card-name');
    cardName.textContent = `${cards[0][i -1]}`
    cardSection.appendChild(cardName);


    cardWrapper.addEventListener('click', (e) => {      
      console.log (e.currentTarget);
      console.log (container);
      /* container.remove();  */
      /* container.classList.remove('container'); */
      container.style.display = 'none';
      setTimeout(renderCategoryPage, 100);        
    })
  }


};

export default renderMainPage;
