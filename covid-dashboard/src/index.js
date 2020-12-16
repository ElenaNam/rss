import './css/style.css';
import './css/header.css';
import './css/footer.css';
import renderHeader from './components/header';
import renderFooter from './components/footer';


document.title = 'Covid-19 tracker';

window.onload = () => {
  renderHeader();
  renderFooter();
};