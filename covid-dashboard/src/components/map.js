import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { dataGeo } from './countries_geo.js';
import { arrData } from './countries';
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';


let mapWrapper;
const renderMap = async() => { 
    mapWrapper = document.createElement('div');
    mapWrapper.id = 'map';    
    
    let mapOptions = {
        center: [55.753215, 37.622504], 
        zoom: 2,
        /* minZoom: 2, */
        worldCopyJump: true,       
    }
   
    let map = new L.map(mapWrapper, mapOptions);     

 
    const layer = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });  
    const layer1 = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
// слой с границами стран
    const geoJSONLayer = L.geoJSON(dataGeo, {
        //l.bindPopup(feature);
        style: function (feature) {
            return {
                color: 'gold'
            };
        }
    })
    .addTo(map);
    
 // слой с данными о болезни
 //источник https://www.colbyfayock.com/2020/03/how-to-create-a-coronavirus-covid-19-dashboard-map-app-with-gatsby-and-leaflet
    const geoJson1 = {
        type: 'FeatureCollection',
        features: arrData.map((country = {}) => {
            const { countryInfo = {} } = country;
            const { lat, long: lng } = countryInfo;
            return {
                type: 'Feature',
                properties: {
                    ...country,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [ lng, lat]
                }
            }
        })
    }

    function countryPointToLayer (feature = {}, latlng) {
        const {properties = {} } = feature;
        let updatedFormatted;
        let casesString;
        const {
            country,
            updated,
            cases,
            deaths,
            recovered        
        } = properties

        casesString = `${cases}`;

        if ( cases > 1000 ) {
            casesString = `${casesString.slice(0, -3)}k+`
        } 
        if ( updated ) {
            updatedFormatted = new Date(updated).toLocaleString()
        }

        const html = `
        <span class = 'icon-marker'>
            <span class = "icon-marker-tooltip">
                <h2>${country}</h2>
                <ul>
                    <li>Заболели: ${cases}</li>
                    <li>Умерли: ${deaths}</li>
                    <li>Выздоровели: ${recovered}</li>
                    <li>Last Update: ${updatedFormatted}</li>
                </ul>
            </span>
            ${ casesString }
        </span>
        `;

        return L.marker( latlng, {
            icon: L.divIcon({
                className: 'icon',
                html
            }),
            riseOnHover: true
        })    
    }

    const geoJSONLayer1 = new L.GeoJSON(geoJson1, {
        pointToLayer: countryPointToLayer
    });
    geoJSONLayer1.addTo(map);


    // вариант с дивом
    let roundIcon = L.divIcon({className: 'round'});

/*     let marker = new L.Marker([17.385044, 78.486671], {icon: roundIcon});
    marker.addTo(map).bindPopup('City'); */


/*     marker.on('mouseover', function (e) {
        e.target.
        this.openPopup();
    });
    marker.on('mouseout', function (e) {
        this.closePopup();
    }); */



    map.addLayer(layer);
    //map.addLayer(layer1);
    //L.control.geocoder().addTo(map);
    
    setTimeout(() => {
        map.invalidateSize();
    }, 0);
    
    /* mapWrapper.append(map); */ //нужно или нет?
}
export { mapWrapper };

export default renderMap;
