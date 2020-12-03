
const { document } = global;
const renderHeader = () => {
  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper');
  document.body.appendChild(headerWrapper); 

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

  const menuLinks = ['Home page', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion'];
  menuLinks.forEach((link) => {
    const navLink = document.createElement('a');
    navLink.classList.add('burger-nav_link');
    navLink.setAttribute('href', '#');
    navLink.textContent = link;
    nav.appendChild(navLink);
  });

  const burgerOverlay = document.createElement('div');
  burgerOverlay.classList.add('burger-menu_overlay');
  burgerWrapper.appendChild(burgerOverlay);

  burgerMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    burgerWrapper.classList.toggle('burger-menu_active');
    document.body.classList.toggle('lock');
  });
  burgerOverlay.addEventListener('click', () => {
    burgerWrapper.classList.toggle('burger-menu_active');
  });

/*   nav.addEventListener('click', (e) => {
    e.preventDefault();
    burgerWrapper.classList.remove('burger-menu_active');
  }); */
  let arrLinks = nav.childNodes;
  arrLinks.forEach((el) => {
    el.addEventListener('click', (e) => {
      console.log('sdfaaasdfsfsfasf');
      console.log(e.target);
      /* e.preventDefault(); */
      burgerWrapper.classList.remove('burger-menu_active');
    });
  })

  /* SELECTOR */
  const selectorWrapper = document.createElement('div');
  selectorWrapper.classList.add('selector-wrapper');
  headerWrapper.appendChild(selectorWrapper);

  const input = document.createElement('input');
  input.classList.add('input');
  input.setAttribute('type', 'checkbox');
  input.id = 'selector'
  selectorWrapper.appendChild(input);

  const label = document.createElement('label');
  label.classList.add('label');
  label.setAttribute('for', 'selector');
  label.textContent = 'Train';
  selectorWrapper.appendChild(label);

  label.addEventListener('click', () => {
    if(label.textContent === 'Train') {
      label.textContent = 'Play';
      label.style.color = 'crimson';
    } else {
      label.textContent = 'Train';
      label.style.color = 'wheat';
    }
  })








};
export default renderHeader;
