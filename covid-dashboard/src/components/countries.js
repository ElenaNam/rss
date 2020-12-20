 
let worldPopulationCount = 0;

function getDataCountries(url) {
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
}

getDataCountries('https://corona.lmao.ninja/v2/countries').then(function(response) {
    //console.log(response)
    const arrData = response;
    worldPopulationCount = arrData.reduce((acc, el) => acc + el.population, 0)
    //console.log(worldPopulationCount);       

  }, function(error) {
    console.error("Failed!", error);
});

export { worldPopulationCount };
export default getDataCountries;
 