
const changeSizeScreen = (element, block) => {
    const btnFullscreen = document.createElement('button');
    btnFullscreen.classList.add('fullscreen');
    btnFullscreen.innerHTML = '<img src = "img/fs1.png" alt = "fullscreen" width = "20px"/>';
    block.append(btnFullscreen);

    btnFullscreen.addEventListener('click', () => {
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