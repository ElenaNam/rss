 
let worldPopulationCount = 0;
let casesAll = 0;
let deathsAll = 0;
let recoveredAll = 0;
let casesAllDay = 0;
let deathsAllDay = 0;
let recoveredAllDay = 0;
let casesAll100 = 0;
let deathsAll100 = 0;
let recoveredAll100 = 0;
let casesAll100Day = 0;
let deathsAll100Day = 0;
let recoveredAll100Day = 0;

let arrData = [];


async function getDataCountries(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (e) {
    console.log('Ошибка ' + e);
  }
}

getDataCountries('https://corona.lmao.ninja/v2/countries').then(function(data) {
    arrData = data;

    //данные для мира
    worldPopulationCount = arrData.reduce((acc, el) => acc + el.population, 0);

    casesAll = arrData.reduce((acc, el) => acc + el.cases, 0);
    deathsAll = arrData.reduce((acc, el) => acc + el.deaths, 0);
    recoveredAll = arrData.reduce((acc, el) => acc + el.recovered, 0);

    casesAllDay = arrData.reduce((acc, el) => acc + el.todayCases, 0);
    deathsAllDay = arrData.reduce((acc, el) => acc + el.todayDeaths, 0);
    recoveredAllDay = arrData.reduce((acc, el) => acc + el.todayRecovered, 0);
    
    casesAll100 = arrData.reduce((acc, el) => acc + Math.ceil(el.casesPerOneMillion / 10), 0);
    deathsAll100 = arrData.reduce((acc, el) => acc + Math.ceil(el.deathsPerOneMillion / 10), 0);
    recoveredAll100 = arrData.reduce((acc, el) => acc + Math.ceil(el.recoveredPerOneMillion / 10), 0);
    //casesAll100Day = arrData.reduce((acc, el) => acc + Math.ceil((el.todayCases * 100000) / el.population), 0);
    casesAll100Day = Math.ceil((casesAll * 100000) / worldPopulationCount);
    deathsAll100Day = Math.ceil((deathsAll * 100000) / worldPopulationCount);
    recoveredAll100Day = Math.ceil((recoveredAll * 100000) / worldPopulationCount);


    console.log('данные для мира')
    console.log('_______________')
    console.log('количество населения в мире ' + worldPopulationCount);
    console.log('всего в абсолютных цифрах')
    console.log('-------------------------')
    console.log(casesAll);
    console.log(deathsAll);
    console.log(recoveredAll);
    console.log('за день в абсолютных цифрах')
    console.log('-------------------------')
    console.log(casesAllDay);
    console.log(deathsAllDay);
    console.log(recoveredAllDay);
    console.log('всего на 100 тыс')
    console.log('-------------------------')
    console.log(casesAll100);
    console.log(deathsAll100);
    console.log(recoveredAll100);
    console.log('за день на 100 тыс')
    console.log('-------------------------')
    console.log(casesAll100Day);
    console.log(deathsAll100Day);
    console.log (recoveredAll100Day);
    
/*     for (let key in arrData) {
      console.log(key)
    } */
    //console.log(worldPopulationCount);       

  }, function(error) {
    console.error("Failed!", error);
});


export { arrData };
export { worldPopulationCount };
export {casesAll} 
export {deathsAll }
export {recoveredAll }
export {casesAllDay }
export {deathsAllDay }
export {recoveredAllDay }
export {casesAll100} 
export {deathsAll100 }
export {recoveredAll100 }
export {casesAll100Day}
export {deathsAll100Day }
export {recoveredAll100Day }

export default getDataCountries;
 
