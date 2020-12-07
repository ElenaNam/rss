import cards from './cards';
const rotateCard = (target, i) => {  //class='card-wrapper'
  target.children[0].style.transform = 'rotateY(180deg)';
  target.children[1].style.transform = 'rotateY(360deg)';

  target.addEventListener('mouseleave', () => {  
      /* .card:hover .front {transform: rotateY(180deg);}
        .card:hover .back {transform: rotateY(360deg);} */
        console.log('мышь ушла');

      })
 


  
}


export default rotateCard;