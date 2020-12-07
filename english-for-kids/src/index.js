import './style.css';
/* import { state } from './components/state'; */
import renderHeader from './components/header';
/* import renderMainPage, {container} from './components/mainpage'; */
import renderMainPage from './components/mainpage'; 
/* import {container} from './components/mainpage'; */

import renderFooter from './components/footer';

window.onload = () => {
  renderHeader();
  renderMainPage();
  renderFooter();
};
