import './css/style.css';
import './css/header.css';
import './css/footer.css';
import renderHeader from './components/header';
import renderMainPage from './components/mainPage';
import renderFooter from './components/footer';

import getDataCountries from './components/countries';
//import getState from './components/state';


/* window.onload = setTimeout(() => {
  renderHeader();
  renderMainPage();
  renderFooter();
}, 1500); */


window.onload = async() => {
  await getDataCountries('https://corona.lmao.ninja/v2/countries');
  renderHeader();
  renderMainPage();
  renderFooter();
  //getState();
};