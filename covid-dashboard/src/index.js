import './css/style.css';
import './css/header.css';
import './css/footer.css';
import renderHeader from './components/header';
import renderMainPage from './components/mainPage';
import renderFooter from './components/footer';
//import renderMap from './components/map';

import getDataCountries from './components/countries';
import get from './components/diseased';


/* window.onload = setTimeout(() => {
  renderHeader();
  renderMainPage();
  renderFooter();
}, 1500); */


window.onload = () => {
  getDataCountries('https://corona.lmao.ninja/v2/countries');
  get('https://disease.sh/v3/covid-19/historical/all?lastdays=366');
  //renderMap();

  renderHeader();
  renderMainPage();
  renderFooter();
};