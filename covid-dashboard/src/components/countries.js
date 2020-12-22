 
let worldPopulationCount = 0;
let arrData = [];

/* function getDataCountries(url) {
    return new Promise((resolve, reject) => {  
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'json';  
      xhr.onload = function() {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          reject(Error(xhr.statusText));
        }        
      }; 
      xhr.onerror = function() {
        reject(Error("Network Error"));
      };
      xhr.send();
    });
} */
// то же самое
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
    //console.log(response)
    arrData = data;
    console.log('arrData получен из json ')
    console.log(arrData); 
    worldPopulationCount = arrData.reduce((acc, el) => acc + el.population, 0)
    //console.log(worldPopulationCount);       

  }, function(error) {
    console.error("Failed!", error);
});


export { arrData };
export { worldPopulationCount };
export default getDataCountries;
 