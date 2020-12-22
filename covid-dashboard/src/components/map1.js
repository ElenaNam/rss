import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { arrData } from './countries';
import { dataGeo } from './countries_geo.js';
import { state } from './state';
//L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

let mapWrapper;

const renderMap = async () => { 
    console.log('map1 ')
    console.log(arrData)

    mapWrapper = document.createElement('div');
    mapWrapper.id = 'map';    
    
    let mapOptions = {
        center: [55.753215, 37.622504], 
        zoom: 2,
        worldCopyJump: true,       
    }
   
    let map = new L.map(mapWrapper, mapOptions);    
 
    const layer = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });  

    map.addLayer(layer);

//источник https://github.com/HandsOnDataViz/leaflet-map-polygon-hover/blob/main/script.js
    const geoJSONLayer = L.geoJSON(dataGeo, {
        style: style,
        onEachFeature: onEachFeature  
    })
    .addTo(map);

    function style(feature) {
        return {             
            fillColor: 'grey',
            weight: 1,
            opacity: 1,
            color: 'black',
            fillOpacity: 1
        }
    }

    function changeStyle(e) {
        resetStyle(e);
        let layer = e.target;
        layer.setStyle({
            weight: 2,
            color: 'grey',
            fillOpacity: 0.5
        }); 
    }
    function resetStyle(e){
        geoJSONLayer.setStyle(style);
    } 

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: changeStyle,
            mouseout: resetStyle          
        });
    }     


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
                    coordinates: [ lng, lat ]
                }
            }
        })
    }

      
    const geoJSONLayer1 = new L.GeoJSON(geoJson1, {        
 
        pointToLayer:  (feature = {}, latlng) => {
            //console.log('countryPointToLayer');
            const {properties = {} } = feature;
            let casesString;
            const {
                country,
                cases,
                deaths,
                recovered        
            } = properties

            casesString = `${cases}`;

            if ( cases > 1000 ) {
                casesString = `${casesString.slice(0, -3)}`
            } 

            const html = `
                <span class = 'icon-marker'>
                    <span class = "icon-marker-tooltip">
                        <h2>${country}</h2>
                        <ul>
                            <li>Заболевших: ${cases}</li>                           
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
    })

    geoJSONLayer1.addTo(map);
    
    setTimeout(() => {
        map.invalidateSize();
    }, 0);

    return map; 
}
//renderMap().then(map => mapWrapper.appendChild(map))



export { mapWrapper };
export default renderMap;
