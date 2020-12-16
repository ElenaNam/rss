const renderFooter = () => {
    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('footer-wrapper');
    document.body.appendChild(footerWrapper);
  
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footerWrapper.appendChild(footer);
  
    const logo = document.createElement('div');
    logo.classList.add('logo-wrapper');
    logo.innerHTML = "<a><img src = 'img/rs_school_js.svg' alt = 'logo'/></a>";
    logo.children[0].setAttribute('href', 'https://rs.school/js/');
    footer.appendChild(logo); 
  
    const linkAuthor = document.createElement('a');
    linkAuthor.classList.add('footer-link');
    linkAuthor.setAttribute('href', 'https://github.com/ElenaNam?tab=repositories');
    linkAuthor.textContent = 'by ElenaNam';
    footer.appendChild(linkAuthor);
  };
  
  export default renderFooter;