import cards from './cards';
import state from './state';
import renderMainPage, { container } from './mainpage';
import renderCategoryPage from './categorypage';

const { document } = global;
let headerWrapper;

const renderHeader = () => {
  
  if (!headerWrapper) {
    headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header-wrapper');
    document.body.appendChild(headerWrapper);
  }


  /* burger-menu */
  const burgerWrapper = document.createElement('div');
  burgerWrapper.classList.add('burger-wrapper');
  headerWrapper.appendChild(burgerWrapper);

  const burgerMenuBtn = document.createElement('a');
  burgerMenuBtn.classList.add('burger-menu_button');
  burgerWrapper.appendChild(burgerMenuBtn);

  const lines = document.createElement('span');
  lines.classList.add('burger-menu_lines');
  burgerMenuBtn.appendChild(lines);

  const nav = document.createElement('nav');
  nav.classList.add('burger-nav');
  burgerWrapper.appendChild(nav);

  let navLink;

  cards[0].unshift('Main Page');
  cards[0].forEach((link, j) => {
    navLink = document.createElement('a');
    navLink.classList.add('burger-nav_link');

    if (j === state.page) {
      navLink.classList.add('burger-nav_link-active');
    }
    navLink.setAttribute('href', '#');
    navLink.textContent = link;
    nav.append(navLink);

    navLink.addEventListener('click', (e) => {
      burgerWrapper.classList.remove('burger-menu_active');
      container.innerHTML = '';

      Array.from(e.currentTarget.parentNode.children).forEach((item, i) => {
        if (item === e.currentTarget) {
          item.classList.add('burger-nav_link-active');
          state.page = i;
        } else {
          item.classList.remove('burger-nav_link-active');
        }
      });

      if (e.target.textContent === 'Main Page') {
        state.page = 0;
        renderMainPage();
      } else {
        renderCategoryPage(e.target.textContent, state.page);
      }
    });
  });

  const burgerOverlay = document.createElement('div');
  burgerOverlay.classList.add('burger-menu_overlay');
  burgerWrapper.appendChild(burgerOverlay);

  burgerMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();

    Array.from(navLink.parentNode.children).forEach((item, v) => {
      if (v === state.page) {
        item.classList.add('burger-nav_link-active');
      } else {
        item.classList.remove('burger-nav_link-active');
      }
    });

    burgerWrapper.classList.toggle('burger-menu_active');
    document.body.classList.toggle('lock');
  });
  burgerOverlay.addEventListener('click', () => {
    burgerWrapper.classList.toggle('burger-menu_active');
  });

  /* SELECTOR */
  const selectorWrapper = document.createElement('div');
  selectorWrapper.classList.add('selector-wrapper');
  headerWrapper.appendChild(selectorWrapper);

  const input = document.createElement('input');
  input.classList.add('input');
  input.setAttribute('type', 'checkbox');
  input.id = 'selector';
  selectorWrapper.appendChild(input);

  const label = document.createElement('label');
  label.classList.add('label');
  label.setAttribute('for', 'selector');
  label.textContent = 'Train';
  selectorWrapper.appendChild(label);

  label.addEventListener('click', () => {
    
    if (label.textContent === 'Train') {
      label.textContent = 'Play';
      label.style.color = 'yellow';
      state.play = true;
    } else {
      label.textContent = 'Train';
      label.style.color = 'rgb(170, 38, 130)';
      label.style.fontWeight = 'bold';
      state.play = false;
    }
    console.log('header ' + state.play);
    renderMainPage(state.play);
  });
};
export default renderHeader;
