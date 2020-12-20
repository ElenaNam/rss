let casesAll; 
let deadthsAll;
let recoveredAll;
const arrDataResult = [];

function get(url) {
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

get('https://disease.sh/v3/covid-19/historical/all?lastdays=366').then(function(response) {
    
    const objData = response;
    //console.log(Object.keys(objData))
     for(let key in objData) {
       
        let last = Object.values(objData[key])[Object.keys(objData[key]).length-1]; 
        arrDataResult.push(last); 
    }  
    const arrData = Object.keys(objData);
       
    casesAll = +arrDataResult[0];
    deadthsAll = +arrDataResult[1];
    recoveredAll = +arrDataResult[2]; 
  }, function(error) {
    console.error("Failed!", error);
});




export { casesAll };
export { deadthsAll };
export { recoveredAll };  
export default get;



