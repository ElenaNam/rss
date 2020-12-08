import cards from './cards';

const rotateCard = (target, i) => { // class='card-wrapper'
  target.style.transform = 'rotateY(180deg)';
 
  // target.classList.add('card-wrapper-active');

  /* console.log(cards[i]); */ // нужный массив есть
  cards[i].forEach((el) => {
    // если в массиве есть объект с нужным словом, возьми перевод
    if (el.word === target.children[1].children[0].textContent) {
      target.children[1].children[0].textContent = `${el.translation}`;
    }

    target.addEventListener('mouseleave', () => {
      console.log('blur');
      // target.classList.remove('card-wrapper-active');
      target.style.transform = 'rotateY(180deg)';
      target.removeAttribute('style');
      if (el.translation === target.children[1].children[0].textContent) {
        target.children[1].children[0].textContent = `${el.word}`;
      }
    });

    /* console.log(target.children[1].children[0]); */
    /*  console.log(`${card.translation}`); */
  });
};

export default rotateCard;


export const startGame = () => {    
  
  //startGameBtn.parentElement.replaceChild(repeatWrapper, startGameBtn); 
  container.innerHTML = '';
  container.appendChild(repeatWrapper); 
  
  let cardWrapper;
  let sound;
  let soundNext;
  let starWin;
  let star;
  
  starWrapper.innerHTML = '';
  container.prepend(starWrapper);

  cards[state.page].sort(() => Math.random() - 0.5).forEach((el, i) => {
/*     console.log(cards[state.page][i].audioSrc);
    console.log(el);
    console.log(i); */
    //console.log(el);
    //console.log(el.nextElementSibling);

    cardWrapper = document.createElement('a');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('href', '#');
    cardWrapper.innerHTML = `<img src = ${cards[state.page][i].image} width = '100%' height = '100%'/>`;
    
    sound = new Audio(`${el.audioSrc}`);
    //soundNext = new Audio(`${el.audioSrc}`);
    cardWrapper.appendChild(sound);
    container.appendChild(cardWrapper);  
    console.log(cardWrapper.parentNode.children);
      
    cardWrapper.addEventListener('click', (e) => {  
      Array.from(cardWrapper.parentNode.children).forEach((el) => {
        if(el.classList.contains('card-wrapper')) {
          console.log('----------');
          console.log(el);
        }
        
      })

      
      //console.log(e.currentTarget.children);
      if (el.audioSrc == sound.getAttribute('src')) {
        starWin = document.createElement('div');
        starWin.classList.add('star');
        starWin.innerHTML = '<img src = "img/star-win.svg"/>';
        starWrapper.appendChild(starWin);
        new Audio('audio/success.mp3').play();

        //console.log(el);
        //console.log(e.currentTarget.nextElementSibling);
        //console.log(e.currentTarget.previousElementSibling.children[1].getAttribute('src'));
        let soundNextLink = e.currentTarget.previousElementSibling.children[1].getAttribute('src');
        //console.log('soundNextLink ' + soundNextLink);
        
        

        //cards[state.page][i+1]
        i = i + 1;
        setTimeout(() => {
          //soundNext.play();
            //new Audio(`${el.audioSrc}`).play()
            //new Audio(`${e.currentTarget.previousElementSibling.children[1].src}`).play()
            //new Audio(`${e.currentTarget.previousSibling.children[1].getAttribute('src')}`).play();
            new Audio(`${soundNextLink}`).play();
            //sound.play();
            //console.log(`${cards[state.page][i]}`);
            //console.log(new Audio(`${cards[state.page][i].audioSrc}`));
        }, 2000);
            
      } else {
        star = document.createElement('div');
        star.classList.add('star');
        star.innerHTML = '<img src = "img/star.svg"/>';
        starWrapper.appendChild(star);
        new Audio('audio/failure.mp3').play();
      }
        //i = i -1;
        //new Audio(`${el.audioSrc}`).play();
    })
  })
  sound.play();   
  repeatBtn.addEventListener('click', () => {
      sound.play();
  })
}