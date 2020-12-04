import './style.css';
import renderHeader from './components/header';
import renderMainPage from './components/mainpage';
import renderCategoryPage from './components/categorypage';
import renderFooter from './components/footer';


window.onload = () => {
  renderHeader();
  renderMainPage();  
  /* renderCategoryPage('Action (set B)'); */ 
  renderFooter();
};
