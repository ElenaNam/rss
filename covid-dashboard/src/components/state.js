import get, {casesAll, deadthsAll, recoveredAll} from './diseased';
//import getDataCountries from './countries'
let state = {};
const getState = setTimeout (() =>  {
  state = {
  simple: 'пример',
  casesAllAbsoluteCountAlltime: casesAll,
  deadthsAllAbsoluteCountAlltime: deadthsAll,
  recoveredAllAbsoluteCountAlltime: recoveredAll,
  casesAll100Alltime: 0,
  deadthsAll100Alltime: 0,
  recoveredAll100Alltime: 0,
  casesAllAbsoluteCountLastDay: 0,
  deadthsAllAbsoluteCountLastDay: 0,
  recoveredAllAbsoluteCountLastDay: 0,
  casesAll100LastDay: 0,
  deadthsAll100LastDay: 0,
  recoveredAll100LastDay: 0,
  }
}, 900)
/* const state = {
  simple: 'пример',
  casesAllAbsoluteCountAlltime: casesAll,
  deadthsAllAbsoluteCountAlltime: deadthsAll,
  recoveredAllAbsoluteCountAlltime: recoveredAll,
  casesAll100Alltime: 0,
  deadthsAll100Alltime: 0,
  recoveredAll100Alltime: 0,
  casesAllAbsoluteCountLastDay: 0,
  deadthsAllAbsoluteCountLastDay: 0,
  recoveredAllAbsoluteCountLastDay: 0,
  casesAll100LastDay: 0,
  deadthsAll100LastDay: 0,
  recoveredAll100LastDay: 0,
} */

export { state };
export default getState;