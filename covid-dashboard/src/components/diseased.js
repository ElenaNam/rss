let casesAll; 
let deadthsAll;
let recoveredAll;
let casesAllDay;
let deadthsAllDay;
let recoveredAllDay;
const arrDataResult = [];
const arrDataResultDay = [];


/*function get(url) {
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

async function get(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (e) {
    console.log('Ошибка ' + e);
  }
}


get('https://disease.sh/v3/covid-19/historical/all?lastdays=366').then(function(data) {
    
    const objData = data;
    //console.log(Object.keys(objData))
     for(let key in objData) {
       
        let last = Object.values(objData[key])[Object.keys(objData[key]).length-1]; 
        let beforeDay = Object.values(objData[key])[Object.keys(objData[key]).length-2]; 
        arrDataResult.push(last); 
        arrDataResultDay.push(last - beforeDay);
        //console.log(arrDataResultDay);
    }  
    //const arrData = Object.keys(objData);
       
    casesAll = +arrDataResult[0];
    deadthsAll = +arrDataResult[1];
    recoveredAll = +arrDataResult[2]; 

    casesAllDay = +arrDataResultDay[0];
    deadthsAllDay = +arrDataResultDay[1];
    recoveredAllDay = +arrDataResultDay[2]; 

  }, function(error) {
    console.error("Failed!", error);
});


export { casesAll };
export { deadthsAll };
export { recoveredAll };  
export { casesAllDay };
export { deadthsAllDay };
export { recoveredAllDay };  
export default get;



