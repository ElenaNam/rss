import './style.css';
import renderHeader from './components/header';
import renderMainPage from './components/mainpage';
import renderFooter from './components/footer';

document.title = 'English for kids';

window.onload = () => {
  renderHeader();
  renderMainPage();
  renderFooter();
};
