const renderFooter = () => {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');
  document.body.appendChild(footerWrapper);

  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footerWrapper.appendChild(footer);

  const logo = document.createElement('div');
  logo.classList.add('logo-wrapper');
  logo.innerHTML = "<a><img src = 'img/rs_school_js.png' alt = 'logo'/></a>";
  logo.children[0].setAttribute('href', 'https://rs.school/js/');
  footer.appendChild(logo);

  const linkCourseWrapper = document.createElement('div');
  linkCourseWrapper.classList.add('footer-link-course-wrapper');
  footer.appendChild(linkCourseWrapper);

  const linkCourse = document.createElement('a');
  linkCourse.classList.add('footer-link', 'footer-link-course');
  linkCourse.setAttribute('href', 'https://rs.school/js/');
  linkCourse.textContent = 'Курс «JavaScript/Front-end»';
  linkCourseWrapper.appendChild(linkCourse);

  const footerInformation = document.createElement('div');
  footerInformation.classList.add('footer-information');
  footer.appendChild(footerInformation);

  const yearWrapper = document.createElement('div'); 
  yearWrapper.classList.add('year-wrapper');
  footerInformation.appendChild(yearWrapper);



  const year = document.createElement('div');
  /* logo.classList.add('year-wrapper'); */
  year.innerHTML = "<img src = 'img/2020.png' alt = '2020'/>";
  yearWrapper.appendChild(year);

  const linkAuthor = document.createElement('a');
  linkAuthor.classList.add('footer-link', 'footer-link-color');
  linkAuthor.setAttribute('href', 'https://github.com/ElenaNam?tab=repositories');
  linkAuthor.textContent = 'by ElenaNam';
  footerInformation.appendChild(linkAuthor);
};

export default renderFooter;
