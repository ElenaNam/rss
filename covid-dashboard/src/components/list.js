import getDataCountries from './countries';
import { state } from './state';
import changeSizeScreen from './btnFullscreen';
let listWrapper;

const getListCountries = async () => {

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
    changeSizeScreen(listWrapper, listHeader);

    const listCountries = document.createElement('ul');
    listCountries.classList.add('list-countries');
    listWrapper.appendChild(listCountries);

    const response = await  getDataCountries('https://corona.lmao.ninja/v2/countries'); //https://cors-anywhere.herokuapp.com/
    //console.log(response);
    const arrCountries = response;



    const arrCountriesSort = arrCountries./* splice(0, 9). */sort((a, b) => b.cases - a.cases);
    const createList = () => {
        arrCountriesSort.forEach((element, i) => {
            let value;
            if(document.getElementById('span-cases') && document.getElementById('span-cases').innerHTML === 'заболевших') {
                value = element.cases;
            } else if (document.getElementById('span-cases') && document.getElementById('span-cases').innerHTML === 'умерших') {
                value = element.deaths;
            } else if (document.getElementById('span-cases') && document.getElementById('span-cases').innerHTML === 'выздоровевших') {
                value = element.recovered;
            } else {
                value = element.cases;
            }


            listCountries.innerHTML +=`
            <li class = "list-item-country">
            <img src = ${element.countryInfo.flag} alt = 'flag' width = '30px' />
            <span>${element.country}</span>
            <span>${value}</span></li>
            `
            if (i % 2 === 0) listCountries.children[i].style.backgroundColor = '#f2f2f2';    
        });
    }
    createList();

    const createListInput = () => {
        
    }

    search.addEventListener('input', (e) => {
        const target = e.target.value.toLowerCase();
        listCountries.innerHTML ='';
        arrCountriesSort.filter((elem) => {
            const country = elem.country.toLowerCase();
            if(country.indexOf(target) > -1) {
                let value;
                if(document.getElementById('span-cases').innerHTML === 'заболевших') {
                    value = elem.cases;
                } else if (document.getElementById('span-cases').innerHTML === 'умерших') {
                    value = elem.deaths;
                } else if (document.getElementById('span-cases').innerHTML === 'выздоровевших') {
                    value = elem.recovered;
                }

                listCountries.innerHTML +=`
                <li class = "list-item-country">
                <img src = ${elem.countryInfo.flag} alt = 'flag' width = '30px' />
                <span>${elem.country}</span>
                <span>${value}</span></li>`  
                //if (i % 2 === 0) listCountries.children[i].style.backgroundColor = '#f2f2f2';
                
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
    Array.from(listCountries.children).forEach((el) => {    
        el.addEventListener('click', () => {         
         console.log(el.children[1].innerHTML);          
        }) 
    }) 



    const casesCount = document.createElement('div');  
    casesCount.classList.add('list-cases');
    casesCount.innerHTML = `<span id = 'span-cases'>заболевших</span>`;  
    const arrowList = document.createElement('div');
    arrowList.classList.add('arrow', 'arrow-list');   
    arrowList.innerHTML = '<img src = "img/arrows.png" alt = "arrow" width = "30px"/>'
    casesCount.appendChild(arrowList);    
    listWrapper.appendChild(casesCount); 

    arrowList.addEventListener('click', () => {
        if(document.getElementById('span-cases').innerHTML === 'заболевших') {           
            document.getElementById('span-cases').innerHTML = 'умерших'; 

        } else if(document.getElementById('span-cases').innerHTML === 'умерших') {            
            document.getElementById('span-cases').innerHTML = 'выздоровевших';
        } else {
            document.getElementById('span-cases').innerHTML = 'заболевших';
        }  
        listCountries.innerHTML = "";
        //createList(); 
    }) 
}

export { listWrapper }
export default getListCountries;