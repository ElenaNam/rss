 
const arrDataRes = [];

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

getDataCountries('https://restcountries.eu/rest/v2/all?fields=name;population;flag').then(function(response) {
    
    const objData = response;
    console.log(Object.keys(objData))
      for(let key in objData) {
       
        let last = Object.values(objData[key])[Object.keys(objData[key]).length-1]; 
        arrDataResult.push(last); 
    }  
    const arrData = Object.keys(objData);
       

  }, function(error) {
    console.error("Failed!", error);
});




export default getDataCountries;
 