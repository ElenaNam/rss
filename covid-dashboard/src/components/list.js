import getDataCountries, { arrData } from './countries';
import renderTable from './table'

import { state } from './state';
import changeSizeScreen1 from './btnFullScreenVar';

let listWrapper;

const getListCountries = async () => {

    let value;
    let arrCountriesSort = [];

    listWrapper = document.createElement('div');
    listWrapper.classList.add('list-wrapper');

    const listHeader = document.createElement('div');
    listHeader.classList.add('list-header');
    listWrapper.appendChild(listHeader);

    const search = document.createElement('input');
    search.setAttribute('type', 'text');
    search.setAttribute('placeholder', 'Найти');
    search.classList.add('list-search');
    listHeader.appendChild(search);
    changeSizeScreen1(listWrapper, listHeader);

    const listCountries = document.createElement('ul');
    listCountries.classList.add('list-countries');
    listWrapper.appendChild(listCountries);

/*     const response = await  getDataCountries('https://corona.lmao.ninja/v2/countries'); //https://cors-anywhere.herokuapp.com/
    //console.log(response);
    const arrCountries = response; */


    //const arrCountriesSort = arrCountries./* splice(0, 9). */sort((a, b) => b.cases - a.cases);
    //const arrCountriesSort = arrData.sort((a, b) => b.cases - a.cases);
    const createList = async() => {        

        arrCountriesSort = arrData.sort((a, b) => {
            if (value === 'cases') {
                return b.cases - a.cases;
            } else if (value === 'deaths') {
                return b.deaths - a.deaths;
            } else if (value === 'recovered') {
                return b.recovered - a.recovered;
            } else {
                return b.cases - a.cases;
            }
        }); 

        arrCountriesSort.forEach((element, i) => {

            let val;
            if (value === 'cases') {
                val = element.cases;
            } else if (value === 'deaths') {
                val = element.deaths;
            } else if (value === 'recovered') {
                val = element.recovered;
            } else {
                val = element.cases;
            }

            listCountries.innerHTML +=`
            <li class = "list-item-country">
            <img src = ${element.countryInfo.flag} alt = 'flag' width = '30px' />
            <span>${element.country}</span>
            <span>${val}</span></li>
            `
            if (i % 2 === 0) listCountries.children[i].style.backgroundColor = '#f2f2f2';  

          
            listCountries.addEventListener('click', (e) => { 
                if (element.country === e.target.parentNode.children[1].textContent ) {
                    //console.log(element.country); 
                    state.country = element.country;
                    console.log(state.country);
                    renderTable();

                }     
            }, true)    
             
        });
    }
    createList();

   //listCountries.addEventListener('click', (e) => { 
        //state.country = element;
        //console.log(state.country)        
        //console.log(e.target.children[1].innerHTML)        
     //console.log(el.children[1].innerHTML);          
    //}) 

/*     const createListInput = () => {
        
    } */

    search.addEventListener('input', (e) => {
        const target = e.target.value.toLowerCase();
        listCountries.innerHTML ='';
        arrCountriesSort.filter((elem) => {
            const country = elem.country.toLowerCase();
            if(country.indexOf(target) > -1) {

                let val;
                if (value === 'cases') {
                    val = elem.cases;
                } else if (value === 'deaths') {
                    val = elem.deaths;
                } else if (value === 'recovered') {
                    val = elem.recovered;
                } else {
                    val = elem.cases;
                }

                listCountries.innerHTML +=`
                <li class = "list-item-country">
                <img src = ${elem.countryInfo.flag} alt = 'flag' width = '30px' />
                <span>${elem.country}</span>
                <span>${val}</span></li>`                  
                
                /* клик по измененному списку */
                Array.from(listCountries.children).forEach((el) => {    
                    el.addEventListener('click', () => {         
                     console.log(el.children[1].innerHTML); 
                     state.country = el.children[1].innerHTML;         
                    }) 
                })         
               
            }  
        })
       
    })
           /* клик по изначально сформированному списку */
/*     Array.from(listCountries.children).forEach((el) => {    
        el.addEventListener('click', () => { 
            state.country = el;
            console.log(state.country)        
            console.log(el)        
         //console.log(el.children[1].innerHTML);          
        }) 
    })  */

    const showState = document.createElement('div');  
    showState.classList.add('list-cases');
    showState.innerHTML = `<span id = 'span-cases'>заболевших</span>`; 
    var stateHeader = showState.children[0]; 

    const arrowList = document.createElement('div');
    arrowList.classList.add('arrow', 'arrow-list');   
    arrowList.innerHTML = '<img src = "img/arrows1.png" alt = "arrow" width = "30px"/>'

    showState.appendChild(arrowList);    
    listWrapper.appendChild(showState); 



    // переключатель заболевших/умерших/выздоровевших

    arrowList.addEventListener('click', () => {
        
        if(stateHeader.innerHTML === 'заболевших') {           
            stateHeader.innerHTML = 'умерших'; 
            value = 'deaths';           

        } else if(stateHeader.innerHTML === 'умерших') {            
            stateHeader.innerHTML = 'выздоровевших';
            value = 'recovered';
        } else {
            stateHeader.innerHTML = 'заболевших';
            value = 'cases';
        }  
        listCountries.innerHTML = "";
        createList(); 
    }) 


/* 
    if(stateHeader && stateHeader.innerHTML === 'заболевших') {
        value = 'cases';
    } else if (stateHeader && stateHeader.innerHTML === 'умерших') {
        value = 'deaths';
    } else if (stateHeader && stateHeader.innerHTML === 'выздоровевших') {
        value = 'recovered';
    } else {
        value = 'cases';
    }
 */


}

export { listWrapper }
export default getListCountries;