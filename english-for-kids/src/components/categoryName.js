import state from './state';
import cards from './cards';

const showCategoryName = (index) => {
    const categoryNameWrapper = document.createElement('div');
    categoryNameWrapper.classList.add('category-name-wrapper');
    categoryNameWrapper.innerHTML = `<span>${cards[0][index]}</span>`;
    return categoryNameWrapper;
}

export default showCategoryName;

