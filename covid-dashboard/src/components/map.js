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
        minZoom: 2,       
    }
   
    let map = new L.map(mapWrapper, mapOptions);    
    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');  
    map.addLayer(layer);
    
    setTimeout(() => {
        map.invalidateSize();
    }, 0);

    let roundIcon = L.icon ({
        iconUrl: 'img/circle.png',
        shadowUrl: 'img/circle_shadow.png',
        iconSize: [20, 20],
        shadowSize: [20, 20],
        iconAnchor: [30, 49],
        shadowAnchor: [25, 49],
        popupAnchor: [-10, -50],
    })

    let marker = new L.Marker([17.385044, 78.486671], {icon: roundIcon});
    marker.addTo(map).bindPopup('City');





    marker.on('mouseover', function () {
        this.openPopup();
    });
    marker.on('mouseout', function () {
        this.closePopup();
    });




    
    /* mapWrapper.append(map); */ //нужно или нет?
}
export { mapWrapper };

export default renderMap;
