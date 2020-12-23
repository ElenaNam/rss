
const changeSizeScreen1 = ((element, block) => {
    const btnFullscreen = document.createElement('button');
    btnFullscreen.classList.add('btn-fullscreen');
    btnFullscreen.innerHTML = '<img src = "img/fs1.png" alt = "fullscreen" width = "20px"/>';
    block.append(btnFullscreen);

    btnFullscreen.addEventListener('click', () => {
        if (btnFullscreen.children[0].getAttribute('src') === "img/fs1.png") {
            btnFullscreen.children[0].setAttribute('src', "img/fs2.png");       

            element.classList.add('element-fullscreen', 'visible');
            element.parentNode.parentNode.classList.add('hidden');
            console.log(element.parentNode.parentNode)
            console.log('фулскрин вкл')

        } else if (btnFullscreen.children[0].getAttribute('src') === "img/fs2.png") {
            btnFullscreen.children[0].setAttribute('src', "img/fs1.png"); 
            console.log('фулскрин выкл')
            element.parentNode.parentNode.classList.remove('hidden');
            element.classList.remove('element-fullscreen', 'visible');
        }
    })    
})

export default changeSizeScreen1;