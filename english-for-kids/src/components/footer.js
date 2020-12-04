const renderFooter = () => {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');
  document.body.appendChild(footerWrapper);

  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footerWrapper.appendChild(footer);

  const logo = document.createElement('div');
  logo.classList.add('logo-wrapper');
  logo.innerHTML = "<img src = 'img/rs_school_js.png' alt = 'logo' width = 100px'/>"; 
  footer.appendChild(logo);

  const linkCourse = document.createElement('a');
  linkCourse.classList.add('footer-link');
  linkCourse.setAttribute('href', 'https://rs.school/js/');
  linkCourse.textContent = 'Курс «JavaScript/Front-end»'
  footer.appendChild(linkCourse);

  const footerInformation = document.createElement('div');
  footerInformation.classList.add('footer-information'); 
  footer.appendChild(footerInformation);

  const year = document.createElement('div');
  logo.classList.add('year-wrapper');
  year.innerHTML = "<img src = 'img/2020.png' alt = '2020' width = 50px'/>"; 
  footerInformation.appendChild(year);
  
  const linkAuthor = document.createElement('a');
  linkAuthor.classList.add('footer-link', 'footer-link-color');
  linkAuthor.setAttribute('href', 'https://github.com/ElenaNam?tab=repositories');
  linkAuthor.textContent = 'by ElenaNam';
  footerInformation.appendChild(linkAuthor);

};

export default renderFooter;
