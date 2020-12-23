//import {casesAll, deadthsAll, recoveredAll, casesAllDay, deadthsAllDay, recoveredAllDay} from './diseased';
import getDataCountries, {arrData, casesAll, deathsAll, recoveredAll, casesAllDay, deathsAllDay, recoveredAllDay,
    casesAll100, deathsAll100,  recoveredAll100,  casesAll100Day, deathsAll100Day, recoveredAll100Day } from './countries'
import {state} from './state';
import changeSizeScreen1 from './btnFullScreenVar';


let table;
const renderTable = () => {
    table = document.createElement('table');
    setTimeout(() => {
        table.classList.add('table');
        const caption = document.createElement('caption');
        if(state.country === '') {
            caption.innerHTML = `В мире`;
        } else {
            caption.innerHTML = state.country;
        }
              
        
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
        tr2.style.backgroundColor = '#EFEBEB';
        tr2.style.fontWeight = 'bold';
        table.appendChild(tr2);
        const td1 = document.createElement('td');
        //td1.innerHTML = `${state.casesAllAbsoluteCountAlltime}`;
        td1.innerHTML = `${casesAll}`;        
        tr2.appendChild(td1);
        const td2 = document.createElement('td');
        //td2.innerHTML = `${state.deadthsAllAbsoluteCountAlltime}`;
        td2.innerHTML = `${deathsAll}`;
        tr2.appendChild(td2);
        const td3 = document.createElement('td');
        //td3.innerHTML = `${state.recoveredAllAbsoluteCountAlltime}`;
        td3.innerHTML = `${recoveredAll}`;
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
        arrowTable.innerHTML = '<img src = "img/arrows1.png" alt = "arrow" width = "30px"/>'   
        tdPeriod.appendChild(arrowTable);
        tr3.appendChild(tdPeriod);

        const tdValue = document.createElement('td');
        tdValue.setAttribute('colspan', '3');   
        tdValue.innerHTML = `<span id = 'span-value'>в абсолютных цифрах</span>`;  
        const arrowTable1 = document.createElement('div');
        arrowTable1.classList.add('arrow', 'arrow-table');   
        arrowTable1.innerHTML = '<img src = "img/arrows1.png" alt = "arrow" width = "30px"/>'    
        tdValue.appendChild(arrowTable1);      
        tr4.appendChild(tdValue);

        table.appendChild(tf);
        let period = document.getElementById('span-period')
        let value = document.getElementById('span-value')
        //console.log('period ' + period);

        tdPeriod.addEventListener('click', () => {
            if(period.innerHTML === 'за весь период' && value.innerHTML === 'в абсолютных цифрах') {               
                period.innerHTML = 'за последний день';
                td1.innerHTML = `${casesAllDay}`;      //354285    
                td2.innerHTML = `${deathsAllDay}`;       //7369    
                td3.innerHTML = `${recoveredAllDay}`;       

            } else if (period.innerHTML === 'за весь период' && value.innerHTML === 'на 100тыс населения') {               
                period.innerHTML = 'за последний день';
                td1.innerHTML = `${casesAll100Day}`;   //1010     
                td2.innerHTML = `${deathsAll100Day}`;      //23   
                td3.innerHTML = `${recoveredAll100Day}`; 
            } else if (period.innerHTML === 'за последний день' && value.innerHTML === 'в абсолютных цифрах') {               
                period.innerHTML = 'за весь период';
                td1.innerHTML = `${casesAll}`;     //78697495  
                td2.innerHTML = `${deathsAll}`;       //1730411
                td3.innerHTML = `${recoveredAll}`; 
            } else if (period.innerHTML === 'за последний день' && value.innerHTML === 'на 100тыс населения') {               
                period.innerHTML = 'за весь период';
                td1.innerHTML = `${casesAll100}`;    //324797    
                td2.innerHTML = `${deathsAll100}`;      //5554     
                td3.innerHTML = `${recoveredAll100}`; 
            }             
        }) 

        tdValue.addEventListener('click', (e) => {            
            if(value.innerHTML === 'в абсолютных цифрах' && period.innerHTML === 'за весь период') {               
                value.innerHTML = 'на 100тыс населения'; 
                td1.innerHTML = `${casesAll100}`;   //324797    
                td2.innerHTML = `${deathsAll100}`;    //5554   
                td3.innerHTML = `${recoveredAll100}`; 
            } else if (value.innerHTML === 'в абсолютных цифрах' && period.innerHTML === 'за последний день') {                
                value.innerHTML = 'на 100тыс населения';
                td1.innerHTML = `${casesAll100Day}`;      //1010 
                td2.innerHTML = `${deathsAll100Day}`;      //23 
                td3.innerHTML = `${recoveredAll100Day}`;                 
            } else if (value.innerHTML === 'на 100тыс населения' && period.innerHTML === 'за весь период') {                
                value.innerHTML = 'в абсолютных цифрах';
                td1.innerHTML = `${casesAll}`;       //78697495
                td2.innerHTML = `${deathsAll}`;       //1730411
                td3.innerHTML = `${recoveredAll}`;               
            } else if (value.innerHTML === 'на 100тыс населения' && period.innerHTML === 'за последний день') {                
                value.innerHTML = 'в абсолютных цифрах';
                td1.innerHTML = `${casesAllDay}`;   //354285     
                td2.innerHTML = `${deathsAllDay}`;    //7369   
                td3.innerHTML = `${recoveredAllDay}`;                    
            }          
        }) 
    }, 1000)

}

export { table };
export default renderTable;