import cards from './cards';
const rotateCard = (target, i) => {  //class='card-wrapper'
  target.style.transform = 'rotateY(180deg)'; 
  /* console.log(target); */
  //target.classList.add('card-wrapper-active'); 
  
  /* console.log(cards[i]); */ //нужный массив есть
  cards[i].forEach((el) => {

    //если в массиве есть объект с нужным словом, возьми перевод
    if (el.word === target.children[1].children[0].textContent) {
      target.children[1].children[0].textContent = `${el.translation}`;
    } 

    target.addEventListener('mouseleave', () => {  
        console.log('blur');    
        //target.classList.remove('card-wrapper-active');
        target.style.transform = 'rotateY(180deg)'; 
        target.removeAttribute('style');
        target.style.border = '2px solid red';
      })
 
   
    /* console.log(target.children[1].children[0]); */
   /*  console.log(`${card.translation}`); */

  })
}


export default rotateCard;