import {state} from './state';
//import get, {casesAll, deadthsAll, recoveredAll} from './diseased';
import getDataCountries from './countries';

const arrData = setTimeout(() => {   
     //console.log ('state ' + state.casesAllAbsoluteCountAlltime);
     //console.log ('state ' + state.deadthsAllAbsoluteCountAlltime);
     //console.log ('state ' + state.recoveredAllAbsoluteCountAlltime);
}, 1000) 


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
          td1.innerHTML = `${state.casesAllAbsoluteCountAlltime}`;
          tr2.appendChild(td1);
          const td2 = document.createElement('td');
          td2.innerHTML = `${state.deadthsAllAbsoluteCountAlltime}`;
          tr2.appendChild(td2);
          const td3 = document.createElement('td');
          td3.innerHTML = `${state.recoveredAllAbsoluteCountAlltime}`;
          tr2.appendChild(td3);
    }, 1000)

}

export { table };
export default renderTable;