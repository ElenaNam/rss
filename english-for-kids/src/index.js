import './style.css';
import renderHeader from './components/header';
import renderMainPage from './components/mainpage';

import renderFooter from './components/footer';

window.onload = () => {
  renderHeader();
  renderMainPage();
  renderFooter();
};
