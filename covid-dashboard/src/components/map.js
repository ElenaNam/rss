import L from 'leaflet';
import "leaflet/dist/leaflet.css";

/* delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});  */


let mapWrapper;
const renderMap = () => { 
    mapWrapper = document.createElement('div');
    mapWrapper.id = 'map';    
    
     let mapOptions = {
        center: [55.753215, 37.622504], 
        zoom: 2,
        /* minZoom: 2, */
        worldCopyJump: true,       
    }
   
    let map = new L.map(mapWrapper, mapOptions);    
    //let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');  

 
    let layer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 2, 
	maxZoom: 18,
	ext: 'png'
    });  
    let layer1 = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 2,
	maxZoom: 18,
	ext: 'png'
    });

/*     const onGetSuccess = (data) => {
      covidJson = data;
      let layer = L.geoJson(covidJson, {
        onEachFeature: function(feature, l) {
            l.bindPopup('country')
        }
      })
    }
 */
    // вариант с дивом
    let roundIcon = L.divIcon({className: 'round'});

    let marker = new L.Marker([17.385044, 78.486671], {icon: roundIcon});
    marker.addTo(map).bindPopup('City');


    marker.on('mouseover', function () {
        this.openPopup();
    });
    marker.on('mouseout', function () {
        this.closePopup();
    });


/*     fetch("https://api.covid19api.com/countries")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((d) => {
        console.log(`${d.Country}`);
      });     
    }); */







let xhrCountries = new XMLHttpRequest();
xhrCountries.open('GET', 'https://corona.lmao.ninja/v2/countries');
xhrCountries.setRequestHeader('Content-Type', 'application/json');
xhrCountries.responseType = 'json';
xhrCountries.onload = function() {
    if (xhrCountries.status !== 200) return   

    let layerCountries = L.geoJSON(xhrCountries.response, {
            onEachFeature: function(feature, l) {
            l.bindPopup(feature.property.country);
        }
    }).addTo(map);
    Array.from(xhrCountries.response).forEach((d) => {
        //if(d.country) console.log(`${d.country}`);
    }); 


   // console.log(layerCountries);
    //console.log(xhrCountries.response.country);

};
xhrCountries.send();


/*      //let firstUrl = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366'
     var firstUrl = 'https://corona.lmao.ninja/v2/countries';
     $.get(
         firstUrl,
         {},
         onGetSuccess
     ); */


    map.addLayer(layer);
    map.addLayer(layer1);
    
    setTimeout(() => {
        map.invalidateSize();
    }, 0);








    
    /* mapWrapper.append(map); */ //нужно или нет?
}
export { mapWrapper };

export default renderMap;
