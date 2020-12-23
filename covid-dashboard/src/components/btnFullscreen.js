
const changeSizeScreen = (element, block) => {
    const btnFullscreen = document.createElement('button');
    btnFullscreen.classList.add('btn-fullscreen');
    btnFullscreen.innerHTML = '<img src = "img/fs1.png" alt = "fullscreen" width = "20px"/>';
    block.append(btnFullscreen);

    btnFullscreen.addEventListener('click', (e) => {
        e.preventDefault(); //ничего не изменилось
        //btnFullscreen.innerHTML = '';
        if (element.requestFullscreen) { 
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { 
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) { 
            element.webkitRequestFullScreen();
        } 
    }, false )
    
} 
export default changeSizeScreen;

/* 
function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        //!document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  } */