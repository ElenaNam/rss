import {state} from './state';
//import get, {casesAll, deadthsAll, recoveredAll} from './diseased';
import getDataCountries from './countries';
/* import changeSizeScreen from './btnFullscreen'; */
import changeSizeScreen1 from './btnFullScreenVar';

const arrData = setTimeout(() => {   
     //console.log ('state ' + state.casesAllAbsoluteCountAlltime);
     //console.log ('state ' + state.deadthsAllAbsoluteCountAlltime);
     //console.log ('state ' + state.recoveredAllAbsoluteCountAlltime);
}, 1000) 


let table;
const renderTable = () => {
    table = document.createElement('table');
    setTimeout(() => {
        table.classList.add('table');
        const caption = document.createElement('caption');
        if(state.country === '') {
            caption.innerHTML = `В мире`;
        } else {
            caption.innerHTML = state.country;        }
              
        
        table.appendChild(caption);
        changeSizeScreen1(table, caption);
        
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

        const tf = document.createElement('tfoot');
        const tr3 = document.createElement('tr');
        const tr4 = document.createElement('tr');
        tf.appendChild(tr3);
        tf.appendChild(tr4);

        const tdPeriod = document.createElement('td');
        tdPeriod.setAttribute('colspan', '3');                
        tdPeriod.innerHTML = `<span id = 'span-period'>за весь период</span>`;  
        const arrowTable = document.createElement('div');
        arrowTable.classList.add('arrow', 'arrow-table');   
        arrowTable.innerHTML = '<img src = "img/arrows.png" alt = "arrow" width = "30px"/>'   
        tdPeriod.appendChild(arrowTable);
        tr3.appendChild(tdPeriod);

        const tdValue = document.createElement('td');
        tdValue.setAttribute('colspan', '3');   
        tdValue.innerHTML = `<span id = 'span-value'>в абсолютных цифрах</span>`;  
        const arrowTable1 = document.createElement('div');
        arrowTable1.classList.add('arrow', 'arrow-table');   
        arrowTable1.innerHTML = '<img src = "img/arrows.png" alt = "arrow" width = "30px"/>'    
        tdValue.appendChild(arrowTable1);      
        tr4.appendChild(tdValue);

        table.appendChild(tf);
        console.log(document.getElementById('span-period').innerHTML);

        tdPeriod.addEventListener('click', () => {
            if(document.getElementById('span-period').innerHTML === 'за весь период') {               
                document.getElementById('span-period').innerHTML = 'за последний день';       

            } else {               
                document.getElementById('span-period').innerHTML = 'за весь период';
            }            
        }) 

        tdValue.addEventListener('click', () => {
            if(document.getElementById('span-value').innerHTML === 'в абсолютных цифрах') {
               
                document.getElementById('span-value').innerHTML = 'на 100тыс населения';            

            } else {
                
                document.getElementById('span-value').innerHTML = 'в абсолютных цифрах';
            }            
        })     
        


    }, 1000)

}

export { table };
export default renderTable;