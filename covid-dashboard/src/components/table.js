//import * as state from "./state";
/* import {hello} from "./state"; */
//import getDataDiseased from './state';
//import a, { casesAll } from './variant';
import get, {casesAll, deadthsAll, recoveredAll} from './state';
get('https://disease.sh/v3/covid-19/historical/all?lastdays=366');

/* const arrData = setTimeout(() => {
     console.log(casesAll);
     console.log(deadthsAll);
     console.log(arrDataResult)
}, 1000) */


let table;
const renderTable = () => {
    table = document.createElement('table');
    table.classList.add('table');

    const caption = document.createElement('caption');
    caption.innerHTML = `В мире`;
    table.appendChild(caption);


    const tr1 = document.createElement('tr');  
    table.appendChild(tr1);
    const th1 = document.createElement('th');
    th1.innerHTML = 'Заболевших';
    tr1.appendChild(th1);
    const th2 = document.createElement('th');
    th2.innerHTML = 'Умерших';
    tr1.appendChild(th2);
    const th3 = document.createElement('th');
    th3.innerHTML = 'Выздоровевших';
    tr1.appendChild(th3);

    setTimeout(() => {
          const tr2 = document.createElement('tr');
          table.appendChild(tr2);
          const td1 = document.createElement('td');
          td1.innerHTML = `${casesAll}`;
          tr2.appendChild(td1);
          const td2 = document.createElement('td');
          td2.innerHTML = `${deadthsAll}`;
          tr2.appendChild(td2);
          const td3 = document.createElement('td');
          td3.innerHTML = `${recoveredAll}`;
          tr2.appendChild(td3);
    }, 1000)

}

export { table };
export default renderTable;