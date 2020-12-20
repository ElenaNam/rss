import get, {casesAll, deadthsAll, recoveredAll, casesAllDay, deadthsAllDay, recoveredAllDay} from './diseased';
import getDataCountries, { worldPopulationCount } from './countries';



let state = {};
const getState = setTimeout (() =>  {  
  //console.log('state ' + worldPopulationCount);
  state = { 
    //за весь период в абс.цифрах 
  casesAllAbsoluteCountAlltime: casesAll,
  deadthsAllAbsoluteCountAlltime: deadthsAll,
  recoveredAllAbsoluteCountAlltime: recoveredAll,
    //за весь период на 100тыс населения
  casesAll100Alltime: Math.ceil(casesAll / worldPopulationCount * 100000), // неточные данные, не учитываются все страны
  deadthsAll100Alltime: Math.ceil(deadthsAll / worldPopulationCount * 100000),
  recoveredAll100Alltime: Math.ceil(recoveredAll / worldPopulationCount * 100000),
    //за последний день в абс.цифрах
  casesAllAbsoluteCountLastDay: casesAllDay,
  deadthsAllAbsoluteCountLastDay: deadthsAllDay,
  recoveredAllAbsoluteCountLastDay: recoveredAllDay,
    //за последний день на 100тыс населения
  casesAll100LastDay: Math.ceil(casesAllDay / worldPopulationCount * 100000),
  deadthsAll100LastDay: Math.ceil(deadthsAllDay / worldPopulationCount * 100000),
  recoveredAll100LastDay: Math.ceil(recoveredAllDay / worldPopulationCount * 100000),
  }
  console.log('заболевших всего в абс.цифрах ' + state.casesAllAbsoluteCountAlltime)
  console.log('умерших всего в абс.цифрах ' + state.deadthsAllAbsoluteCountAlltime)
  console.log('выздоровевших всего в абс.цифрах ' + state.recoveredAllAbsoluteCountAlltime)

  console.log('заболевших всего на 100тыс ' + state.casesAll100Alltime)
  console.log('умерших всего на 100тыс ' + state.deadthsAll100Alltime)
  console.log('выздоровевших всего на 100тыс ' + state.recoveredAll100Alltime)

  console.log('заболевших за день в абс.цифрах ' + state.casesAllAbsoluteCountLastDay)
  console.log('умерших за день  в абс.цифрах ' + state.deadthsAllAbsoluteCountLastDay)
  console.log('выздоровевших за день  в абс.цифрах' + state.recoveredAllAbsoluteCountLastDay)

  console.log('заболевших за день на 100тыс ' + state.casesAll100LastDay)
  console.log('умерших за день  на 100тыс ' + state.deadthsAll100LastDay)
  console.log('выздоровевших за день  на 100тыс' + state.recoveredAll100LastDay)




}, 900)


export { state };
export default getState;