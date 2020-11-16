/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
// const { doc } = require('prettier');

const wrapper = document.createElement('div'); // фон
const popapWrapper = document.createElement('div'); // popap
const resultWrapper = document.createElement('div'); // popap
const puzzleWrapper = document.createElement('div');// поле
const additionalWrapper = document.createElement('div');// доп.поле
let cellElement = document.createElement('div'); // клетка
const congratulation = document.createElement('div');
const sound = document.createElement('audio');
const soundWin = document.createElement('audio');

let intervalID;
let score = document.querySelector('.score');
let time = document.querySelector('.time');

let count = 0; // счетчик кликов
let sec = 0;
let min = 0;
let hour = 0;

const btnPause = document.createElement('button');
const btnAllSound = document.createElement('button');
// кнопки в popap
const btnNewGame = document.createElement('button');
const btnProgress = document.createElement('button');
const btnSelect3x3 = document.createElement('button');
const btnContinue = document.createElement('button');

const fragment = document.createDocumentFragment();

// размер клетки
let cellSize;

if (window.innerWidth > 480) {
    cellSize = 99;
} else if (window.innerWidth <= 480) {
    cellSize = 78;
}

/*
window.addEventListener('resize', () => {
    if (window.innerWidth > 480){
        cellSize = 99;
    } else if (window.innerWidth <= 480) {
        cellSize = 78;
    };

})
*/

// --------- иконки ------------------
const createIconHTML = (iconName) => `<i class = material-icons>${iconName}</i>`;

function init() {
    // ---------фон----------
    wrapper.classList.add('wrapper');
    document.body.appendChild(wrapper);

    // --------поле игры------------
    puzzleWrapper.classList.add('puzzle-wrapper');
    document.body.appendChild(puzzleWrapper);
    puzzleWrapper.appendChild(createCells());

    // звук клеток
    sound.setAttribute('src', 'src/assets/1596830637_clickb7.mp3');
    document.body.appendChild(sound);

    // -------дополнительное поле----------
    additionalWrapper.classList.add('additional-wrapper');

    // --счет и время--

    // если есть в памяти, возьми оттуда
    if (JSON.parse(localStorage.gameInfo)) {
        count = JSON.parse(localStorage.getItem('gameInfo')).score;

        hour = JSON.parse(localStorage.getItem('gameInfo')).hour;
        min = JSON.parse(localStorage.getItem('gameInfo')).min;
        sec = JSON.parse(localStorage.getItem('gameInfo')).sec;

        additionalWrapper.innerHTML = `<div class="score">score: ${count}</div>
            <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
    } else {
        additionalWrapper.innerHTML = `<div class="score">score: ${count}</div>
            <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
    }

    // кнопка ПАУЗА
    btnPause.classList.add('pause', 'button');
    btnPause.textContent = 'PAUSE';
    additionalWrapper.appendChild(btnPause);

    // кнопка звука
    btnAllSound.classList.add('button', 'allsound');
    btnAllSound.innerHTML = createIconHTML('volume_up');
    additionalWrapper.appendChild(btnAllSound);

    document.body.appendChild(additionalWrapper);

    // -------------popap---------------
    popapWrapper.classList.add('popap-wrapper');
    document.body.appendChild(popapWrapper);
    // элементы popap
    btnNewGame.classList.add('button', 'button-newgame');
    btnNewGame.textContent = 'New Game';
    popapWrapper.appendChild(btnNewGame);

    btnProgress.classList.add('button', 'button-progress');
    btnProgress.textContent = 'Progress';
    popapWrapper.appendChild(btnProgress);
    /*
        btnSelect3x3.classList.add ('button', 'button-select3x3');
        btnSelect3x3.textContent = "3x3";
        popapWrapper.appendChild(btnSelect3x3);
*/
    if (JSON.parse(localStorage.field)) {
        btnContinue.classList.add('button', 'button-continue');
        btnContinue.textContent = 'Continue';
        popapWrapper.appendChild(btnContinue);
    }

    // ---------------выигрыш-----------------------
    congratulation.classList.add('congratulation');
    // звук выигрыша
    soundWin.setAttribute('src', 'src/assets/903a9e120e7b9b3.mp3');
    document.body.appendChild(soundWin);
}

function createCells() {
    const empty = {
        value: 0,
        left: 0,
        top: 0,
        element: {},
    };

    let left;
    let top;
    let cells = [];
    let newCells = [];

    if (!localStorage.getItem('field')) {
        cells = [];
        cells.push(empty);

        newCells = [...Array(15).keys()].sort(() => Math.random() - 0.5);

        // console.log(`newCells до проверки ${newCells}`);

        // ---- проверка на собираемость -----
        // isSolvable(newCells);

        // console.log(`newCells после цикла while  ${newCells}`);
    }

    // поменяться координатами
    function move(index) {
        // console.log(empty);
        // console.log('empty.left ' + empty.left);
        cellElement = document.createElement('div'); // клетка
        cellElement.classList.add('puzzle-cell');

        const cell = cells[index];
        /*         console.log('cells');
        console.log(cells);

        console.log('cell');
        console.log(cell);

        console.log(`cellsize ${cellSize}`);

        console.log('cell.element');
        console.log(cell.element);     */

        // ищем разницу с коорд.пустой клетки
        const leftVar = Math.abs(empty.left - cell.left);
        const topVar = Math.abs(empty.top - cell.top);
        // если рядом пустой клетки нет, ничего не делай
        if (leftVar + topVar > 1) {
            return;
        }

        cell.element.style.left = `${empty.left * cellSize}px`;
        cell.element.style.top = `${empty.top * cellSize}px`;
        // в промеж.переменные записываем коорд-ты пустой клетки
        const emptyLeft = empty.left;
        const emptyTop = empty.top;
        // в коорд-ты пустой клетки записываем коорд-ты текущей клетки
        empty.left = cell.left;
        empty.top = cell.top;
        // в коорд-ты текущей клетки записываем коорд-ты пустой
        cell.left = emptyLeft;
        cell.top = emptyTop;

        // -----------проверка на выигрыш----------------
        const isFinished = cells.every((cell) => cell.value === cell.top * 4 + cell.left);

        if (isFinished) {
            finishGame();
        }
        addScore();
    }

    if (localStorage.field) {
        for (let p = 0; p < 16; p++) {
            if (JSON.parse(localStorage.field)[p].value !== 0) {
                cellElement = document.createElement('div'); // клетка
                cellElement.classList.add('puzzle-cell');
                // разрешить перетаскивание мышью
                cellElement.setAttribute('draggable', 'true');

                const { value } = JSON.parse(localStorage.field)[p];

                cellElement.textContent = value;

                left = p % 4;
                top = (p - left) / 4;

                cells.push(JSON.parse(localStorage.field)[p]);

                cellElement.style.left = `${left * cellSize}px`;
                cellElement.style.top = `${top * cellSize}px`;

                cell = cells[p];
                cell.element = cellElement;
                // console.log(cell.element);

                puzzleWrapper.append(cellElement);
            } else {
                empty.left = JSON.parse(localStorage.field)[p].left;
                empty.top = JSON.parse(localStorage.field)[p].top;
                cells.push(empty);
            }

            // ---------------КЛИК------------------
            cellElement.addEventListener('click', () => {
                move(p);
                sound.play();
            });
            // ----------УХОД СО СТРАНИЦЫ-----------
            window.onbeforeunload = () => {
                delete localStorage.field;
                // delete localStorage.gameInfo;
                saveGame();
                cells = cells.sort((a, b) => a.left - b.left);
                cells = cells.sort((a, b) => a.top - b.top);
                const fieldSave = JSON.stringify(cells);
                localStorage.setItem('field', fieldSave);
            };
        }
    } else {
        for (let i = 1; i < 16; i++) {
            const value = newCells[i - 1] + 1;

            const cellElement = document.createElement('div'); // клетка
            cellElement.classList.add('puzzle-cell');
            // разрешить перетаскивание мышью
            cellElement.setAttribute('draggable', 'true');
            cellElement.textContent = value;

            left = i % 4;
            top = (i - left) / 4;

            cells.push({
                value,
                left,
                top,
                element: cellElement,
            });

            cellElement.style.left = `${left * cellSize}px`;
            cellElement.style.top = `${top * cellSize}px`;

            puzzleWrapper.append(cellElement);

            // ---------------КЛИК------------------
            cellElement.addEventListener('click', () => {
                move(i);
                sound.play();
            });

            // ----------УХОД СО СТРАНИЦЫ-----------
            window.onbeforeunload = () => {
                delete localStorage.field;
                // delete localStorage.gameInfo;
                saveGame();
                cells = cells.sort((a, b) => a.left - b.left);
                cells = cells.sort((a, b) => a.top - b.top);
                const fieldSave = JSON.stringify(cells);
                localStorage.setItem('field', fieldSave);
            };
        }
    }
    fragment.appendChild(cellElement);
    return fragment;
}

// считать ходы
function addScore() {
    score = document.querySelector('.score');
    count++;
    score.textContent = `score: ${count}`;
}

// добавить ноль
function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

const timer = () => {
    time = document.querySelector('.time');
    sec++;

    if (sec === 60) {
        sec = 0;
        min += 1;
    }
    if (min === 60) {
        min = 0;
        hour += 1;
    }

    time.textContent = `${addZero(hour)}: ${addZero(min)}: ${addZero(sec)}`;
};

// подсчет инверсий в массиве ---- нужно четное число
const isSolvable = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                sum += 1;
            }
        }
    }
    console.log(`sum ${sum}`);
    if (sum % 2 === 0) {
        // puzzleWrapper.innerHTML = '';
        console.log(`arr ${arr}`);

        // return arr;
        return;
    }

    createCells();

    // return arr;
};

// если закончил игру

const finishGame = () => {
    clearInterval(intervalID);
    congratulation.innerHTML = `<div class="congratulation"><span>Congratulations!</span>
    <span>You won with <i>${count + 1}</i> score </span>
    <span>for time <i>0${hour}: 0${min}: ${sec}</i></span></div>`;

    setTimeout(() => {
        document.body.appendChild(congratulation);
        soundWin.play();
    }, 300);

    congratulation.addEventListener('click', () => {
        document.body.removeChild(congratulation);
        popapWrapper.style.display = 'flex';
        // popapWrapper.removeChild(btnContinue);
    });
    saveResult();
};

// -----------сохранить результат в таблице-------------

let result;
let countPlayer;

// если в памяти сохранены результаты, то возьми оттуда
if (localStorage.getItem('results')) {
    result = JSON.parse(localStorage.getItem('results'));
    countPlayer = JSON.parse(localStorage.getItem('results')).length;
} else {
    result = [];
    countPlayer = 0;
}

const saveResult = () => {
    countPlayer++;
    const score = count + 1;
    const stage = countPlayer;

    const playerInfo = {
        stage,
        score,
    };

    // ограничение по количеству рекордов
    if (result.length < 10) {
        result.push(playerInfo);
    } else if (result.length === 10) {
        if (playerInfo.score <= result[result.length - 1].score) {
            result.pop();
            result.push(playerInfo);
        }
    }
    result.sort((a, b) => a.score - b.score);

    const playerInformation = JSON.stringify(result);
    localStorage.setItem('results', playerInformation);
};

// ----------- сохранить результат текущей игры -----

const saveGame = () => {
    const score = count;

    const gameInfo = {
        score,
        hour,
        min,
        sec,
    };
    const gameInformation = JSON.stringify(gameInfo);
    localStorage.setItem('gameInfo', gameInformation);
};

// ++++++++++++++ Новая игра ++++++++++++++++++++

btnNewGame.addEventListener('click', () => {
    setTimeout(() => { popapWrapper.style.display = 'none'; }, 100);
    puzzleWrapper.innerHTML = '';
    delete localStorage.field;

    count = 0;
    sec = 0;
    min = 0;
    hour = 0;

    additionalWrapper.innerHTML = `<div class="score"><span>score: 0</span></div>
    <div class="time"><span>0${hour}: 0${min}: 0${sec}</span></div>`;
    additionalWrapper.appendChild(btnPause);
    additionalWrapper.appendChild(btnAllSound);

    if (intervalID) {
        clearInterval(intervalID);
    }

    intervalID = setInterval(timer, 1000);
    createCells();
});

// ++++++++++++++ Продолжить ++++++++++++++++++++

btnContinue.addEventListener('click', () => {
    setTimeout(() => { popapWrapper.style.display = 'none'; }, 100);
    // intervalID = setInterval(timer, 1000);

    if (localStorage.getItem('gameInfo')) {
        count = JSON.parse(localStorage.getItem('gameInfo')).score;
        score = document.querySelector('.score');
        score.textContent = `score: ${count}`;

        time = document.querySelector('.time');
        hour = JSON.parse(localStorage.getItem('gameInfo')).hour;
        min = JSON.parse(localStorage.getItem('gameInfo')).min;
        sec = JSON.parse(localStorage.getItem('gameInfo')).sec;
        time.textContent = `${addZero(hour)}: ${addZero(min)}: ${addZero(sec)}`;
        intervalID = setInterval(timer, 1000);
    } else {
        intervalID = setInterval(timer, 1000);
    }
});

// +++++++++++++++++ Пауза +++++++++++++++++++++++

btnPause.addEventListener('click', () => {
    clearInterval(intervalID);
    saveGame();
    popapWrapper.style.display = 'flex';
    btnContinue.classList.add('button', 'button-continue');
    btnContinue.textContent = 'Continue';
    popapWrapper.appendChild(btnContinue);
});

// +++++++++++++++++ Звук +++++++++++++++++++++++

btnAllSound.addEventListener('click', () => {
    console.log(`btnAllSound.textContent ${btnAllSound.textContent}`);
    console.log(`btnAllSound.innerHTML ${btnAllSound.innerHTML}`);

    if (btnAllSound.textContent === 'volume_up') {
        btnAllSound.innerHTML = createIconHTML('volume_off');
        sound.volume = 0;
        soundWin.volume = 0;
    } else {
        btnAllSound.innerHTML = createIconHTML('volume_up');
        sound.volume = 1;
        soundWin.volume = 1;
    }
});

// +++++++++++++++++ Таблица лучших +++++++++++++++++++++++

btnProgress.addEventListener('click', () => {
    setTimeout(() => { popapWrapper.style.display = 'none'; }, 100);
    setTimeout(() => { resultWrapper.style.display = 'flex'; }, 100);

    resultWrapper.classList.add('result-wrapper');
    document.body.appendChild(resultWrapper);
    // проверь, есть ли в памяти
    let resultMessage;
    if (JSON.parse(localStorage.getItem('results'))) {
        resultMessage = JSON.parse(localStorage.getItem('results'));
        console.log(resultMessage);
        resultMessage = resultMessage.map((item) => `Stage ${item.stage}_____${item.score} <br>`);
    }

    // если рекордов нет, то ничего не пиши (кроме заголовка)
    let resultMessageItem;
    if (resultMessage) {
        resultMessageItem = resultMessage.join(' ');
    } else {
        resultMessageItem = '';
    }

    resultWrapper.innerHTML = `
    <div class="result-wrapper">
    <p>Top of results</p>
    <span>${resultMessageItem}</span>
    </div>`;
});

resultWrapper.addEventListener('click', () => {
    setTimeout(() => { resultWrapper.style.display = 'none'; }, 100);
    setTimeout(() => { popapWrapper.style.display = 'flex'; }, 100);
});

window.addEventListener('DOMContentLoaded', () => {
    init();
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2RlamFtLXRoZS1nZW0tcHV6emxlLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLFVBQVUsTUFBTTs7QUFFaEIsOENBQThDO0FBQzlDLG1EQUFtRDtBQUNuRCxvREFBb0Q7QUFDcEQsb0RBQW9EO0FBQ3BELHdEQUF3RDtBQUN4RCxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsQ0FBQztBQUNEOztBQUVBO0FBQ0Esa0VBQWtFLFNBQVM7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUVBQW1FLE1BQU07QUFDekUsdUNBQXVDLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSTtBQUM5RCxLQUFLO0FBQ0wsbUVBQW1FLE1BQU07QUFDekUsdUNBQXVDLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSTtBQUM5RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxNQUFNOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjLElBQUksYUFBYSxJQUFJLGFBQWE7QUFDOUU7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0EsMkNBQTJDLHdCQUF3QjtBQUNuRSx5Q0FBeUMsc0JBQXNCOztBQUUvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQSxzQkFBc0IscUNBQXFDLEVBQUU7QUFDN0Qsc0JBQXNCLHNDQUFzQyxFQUFFOztBQUU5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxXQUFXLE9BQU8sV0FBVztBQUMxRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksa0JBQWtCO0FBQzlCO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLHNCQUFzQixzQ0FBc0MsRUFBRTtBQUM5RCxzQkFBc0IscUNBQXFDLEVBQUU7QUFDN0QsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY29uc3QgeyBkb2MgfSA9IHJlcXVpcmUoJ3ByZXR0aWVyJyk7XHJcblxyXG5jb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8vINGE0L7QvVxyXG5jb25zdCBwb3BhcFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgLy8gcG9wYXBcclxuY29uc3QgcmVzdWx0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAvLyBwb3BhcFxyXG5jb25zdCBwdXp6bGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7Ly8g0L/QvtC70LVcclxuY29uc3QgYWRkaXRpb25hbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsvLyDQtNC+0L8u0L/QvtC70LVcclxubGV0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8vINC60LvQtdGC0LrQsFxyXG5jb25zdCBjb25ncmF0dWxhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5jb25zdCBzb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XHJcbmNvbnN0IHNvdW5kV2luID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcclxuXHJcbmxldCBpbnRlcnZhbElEO1xyXG5sZXQgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcclxubGV0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xyXG5cclxubGV0IGNvdW50ID0gMDsgLy8g0YHRh9C10YLRh9C40Log0LrQu9C40LrQvtCyXHJcbmxldCBzZWMgPSAwO1xyXG5sZXQgbWluID0gMDtcclxubGV0IGhvdXIgPSAwO1xyXG5cclxuY29uc3QgYnRuUGF1c2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuY29uc3QgYnRuQWxsU291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuLy8g0LrQvdC+0L/QutC4INCyIHBvcGFwXHJcbmNvbnN0IGJ0bk5ld0dhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuY29uc3QgYnRuUHJvZ3Jlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuY29uc3QgYnRuU2VsZWN0M3gzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbmNvbnN0IGJ0bkNvbnRpbnVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG5jb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbi8vINGA0LDQt9C80LXRgCDQutC70LXRgtC60LhcclxubGV0IGNlbGxTaXplO1xyXG5cclxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNDgwKSB7XHJcbiAgICBjZWxsU2l6ZSA9IDk5O1xyXG59IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDQ4MCkge1xyXG4gICAgY2VsbFNpemUgPSA3ODtcclxufVxyXG5cclxuLypcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDQ4MCl7XHJcbiAgICAgICAgY2VsbFNpemUgPSA5OTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNDgwKSB7XHJcbiAgICAgICAgY2VsbFNpemUgPSA3ODtcclxuICAgIH07XHJcblxyXG59KVxyXG4qL1xyXG5cclxuLy8gLS0tLS0tLS0tINC40LrQvtC90LrQuCAtLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgY3JlYXRlSWNvbkhUTUwgPSAoaWNvbk5hbWUpID0+IGA8aSBjbGFzcyA9IG1hdGVyaWFsLWljb25zPiR7aWNvbk5hbWV9PC9pPmA7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gLS0tLS0tLS0t0YTQvtC9LS0tLS0tLS0tLVxyXG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCd3cmFwcGVyJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0t0L/QvtC70LUg0LjQs9GA0YstLS0tLS0tLS0tLS1cclxuICAgIHB1enpsZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncHV6emxlLXdyYXBwZXInKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocHV6emxlV3JhcHBlcik7XHJcbiAgICBwdXp6bGVXcmFwcGVyLmFwcGVuZENoaWxkKGNyZWF0ZUNlbGxzKCkpO1xyXG5cclxuICAgIC8vINC30LLRg9C6INC60LvQtdGC0L7QulxyXG4gICAgc291bmQuc2V0QXR0cmlidXRlKCdzcmMnLCAnc3JjL2Fzc2V0cy8xNTk2ODMwNjM3X2NsaWNrYjcubXAzJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNvdW5kKTtcclxuXHJcbiAgICAvLyAtLS0tLS0t0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90L7QtSDQv9C+0LvQtS0tLS0tLS0tLS1cclxuICAgIGFkZGl0aW9uYWxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2FkZGl0aW9uYWwtd3JhcHBlcicpO1xyXG5cclxuICAgIC8vIC0t0YHRh9C10YIg0Lgg0LLRgNC10LzRjy0tXHJcblxyXG4gICAgLy8g0LXRgdC70Lgg0LXRgdGC0Ywg0LIg0L/QsNC80Y/RgtC4LCDQstC+0LfRjNC80Lgg0L7RgtGC0YPQtNCwXHJcbiAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2FtZUluZm8pKSB7XHJcbiAgICAgICAgY291bnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lSW5mbycpKS5zY29yZTtcclxuXHJcbiAgICAgICAgaG91ciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVJbmZvJykpLmhvdXI7XHJcbiAgICAgICAgbWluID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZUluZm8nKSkubWluO1xyXG4gICAgICAgIHNlYyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVJbmZvJykpLnNlYztcclxuXHJcbiAgICAgICAgYWRkaXRpb25hbFdyYXBwZXIuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJzY29yZVwiPnNjb3JlOiAke2NvdW50fTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZVwiPjxzcGFuPjAke2hvdXJ9OiAwJHttaW59OiAwJHtzZWN9PC9zcGFuPjwvZGl2PmA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFkZGl0aW9uYWxXcmFwcGVyLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwic2NvcmVcIj5zY29yZTogJHtjb3VudH08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWVcIj48c3Bhbj4wJHtob3VyfTogMCR7bWlufTogMCR7c2VjfTwvc3Bhbj48L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC60L3QvtC/0LrQsCDQn9CQ0KPQl9CQXHJcbiAgICBidG5QYXVzZS5jbGFzc0xpc3QuYWRkKCdwYXVzZScsICdidXR0b24nKTtcclxuICAgIGJ0blBhdXNlLnRleHRDb250ZW50ID0gJ1BBVVNFJztcclxuICAgIGFkZGl0aW9uYWxXcmFwcGVyLmFwcGVuZENoaWxkKGJ0blBhdXNlKTtcclxuXHJcbiAgICAvLyDQutC90L7Qv9C60LAg0LfQstGD0LrQsFxyXG4gICAgYnRuQWxsU291bmQuY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2FsbHNvdW5kJyk7XHJcbiAgICBidG5BbGxTb3VuZC5pbm5lckhUTUwgPSBjcmVhdGVJY29uSFRNTCgndm9sdW1lX3VwJyk7XHJcbiAgICBhZGRpdGlvbmFsV3JhcHBlci5hcHBlbmRDaGlsZChidG5BbGxTb3VuZCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhZGRpdGlvbmFsV3JhcHBlcik7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLXBvcGFwLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwb3BhcFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wYXAtd3JhcHBlcicpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3BhcFdyYXBwZXIpO1xyXG4gICAgLy8g0Y3Qu9C10LzQtdC90YLRiyBwb3BhcFxyXG4gICAgYnRuTmV3R2FtZS5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnYnV0dG9uLW5ld2dhbWUnKTtcclxuICAgIGJ0bk5ld0dhbWUudGV4dENvbnRlbnQgPSAnTmV3IEdhbWUnO1xyXG4gICAgcG9wYXBXcmFwcGVyLmFwcGVuZENoaWxkKGJ0bk5ld0dhbWUpO1xyXG5cclxuICAgIGJ0blByb2dyZXNzLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdidXR0b24tcHJvZ3Jlc3MnKTtcclxuICAgIGJ0blByb2dyZXNzLnRleHRDb250ZW50ID0gJ1Byb2dyZXNzJztcclxuICAgIHBvcGFwV3JhcHBlci5hcHBlbmRDaGlsZChidG5Qcm9ncmVzcyk7XHJcbiAgICAvKlxyXG4gICAgICAgIGJ0blNlbGVjdDN4My5jbGFzc0xpc3QuYWRkICgnYnV0dG9uJywgJ2J1dHRvbi1zZWxlY3QzeDMnKTtcclxuICAgICAgICBidG5TZWxlY3QzeDMudGV4dENvbnRlbnQgPSBcIjN4M1wiO1xyXG4gICAgICAgIHBvcGFwV3JhcHBlci5hcHBlbmRDaGlsZChidG5TZWxlY3QzeDMpO1xyXG4qL1xyXG4gICAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmZpZWxkKSkge1xyXG4gICAgICAgIGJ0bkNvbnRpbnVlLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdidXR0b24tY29udGludWUnKTtcclxuICAgICAgICBidG5Db250aW51ZS50ZXh0Q29udGVudCA9ICdDb250aW51ZSc7XHJcbiAgICAgICAgcG9wYXBXcmFwcGVyLmFwcGVuZENoaWxkKGJ0bkNvbnRpbnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS3QstGL0LjQs9GA0YvRiC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjb25ncmF0dWxhdGlvbi5jbGFzc0xpc3QuYWRkKCdjb25ncmF0dWxhdGlvbicpO1xyXG4gICAgLy8g0LfQstGD0Log0LLRi9C40LPRgNGL0YjQsFxyXG4gICAgc291bmRXaW4uc2V0QXR0cmlidXRlKCdzcmMnLCAnc3JjL2Fzc2V0cy85MDNhOWUxMjBlN2I5YjMubXAzJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNvdW5kV2luKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2VsbHMoKSB7XHJcbiAgICBjb25zdCBlbXB0eSA9IHtcclxuICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHRvcDogMCxcclxuICAgICAgICBlbGVtZW50OiB7fSxcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgbGV0IGNlbGxzID0gW107XHJcbiAgICBsZXQgbmV3Q2VsbHMgPSBbXTtcclxuXHJcbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmaWVsZCcpKSB7XHJcbiAgICAgICAgY2VsbHMgPSBbXTtcclxuICAgICAgICBjZWxscy5wdXNoKGVtcHR5KTtcclxuXHJcbiAgICAgICAgbmV3Q2VsbHMgPSBbLi4uQXJyYXkoMTUpLmtleXMoKV0uc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYG5ld0NlbGxzINC00L4g0L/RgNC+0LLQtdGA0LrQuCAke25ld0NlbGxzfWApO1xyXG5cclxuICAgICAgICAvLyAtLS0tINC/0YDQvtCy0LXRgNC60LAg0L3QsCDRgdC+0LHQuNGA0LDQtdC80L7RgdGC0YwgLS0tLS1cclxuICAgICAgICAvLyBpc1NvbHZhYmxlKG5ld0NlbGxzKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYG5ld0NlbGxzINC/0L7RgdC70LUg0YbQuNC60LvQsCB3aGlsZSAgJHtuZXdDZWxsc31gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQv9C+0LzQtdC90Y/RgtGM0YHRjyDQutC+0L7RgNC00LjQvdCw0YLQsNC80LhcclxuICAgIGZ1bmN0aW9uIG1vdmUoaW5kZXgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhlbXB0eSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2VtcHR5LmxlZnQgJyArIGVtcHR5LmxlZnQpO1xyXG4gICAgICAgIGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8vINC60LvQtdGC0LrQsFxyXG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3B1enpsZS1jZWxsJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBjZWxsc1tpbmRleF07XHJcbiAgICAgICAgLyogICAgICAgICBjb25zb2xlLmxvZygnY2VsbHMnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjZWxscyk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjZWxsJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY2VsbCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBjZWxsc2l6ZSAke2NlbGxTaXplfWApO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnY2VsbC5lbGVtZW50Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY2VsbC5lbGVtZW50KTsgICAgICovXHJcblxyXG4gICAgICAgIC8vINC40YnQtdC8INGA0LDQt9C90LjRhtGDINGBINC60L7QvtGA0LQu0L/Rg9GB0YLQvtC5INC60LvQtdGC0LrQuFxyXG4gICAgICAgIGNvbnN0IGxlZnRWYXIgPSBNYXRoLmFicyhlbXB0eS5sZWZ0IC0gY2VsbC5sZWZ0KTtcclxuICAgICAgICBjb25zdCB0b3BWYXIgPSBNYXRoLmFicyhlbXB0eS50b3AgLSBjZWxsLnRvcCk7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0YDRj9C00L7QvCDQv9GD0YHRgtC+0Lkg0LrQu9C10YLQutC4INC90LXRgiwg0L3QuNGH0LXQs9C+INC90LUg0LTQtdC70LDQuVxyXG4gICAgICAgIGlmIChsZWZ0VmFyICsgdG9wVmFyID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjZWxsLmVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2VtcHR5LmxlZnQgKiBjZWxsU2l6ZX1weGA7XHJcbiAgICAgICAgY2VsbC5lbGVtZW50LnN0eWxlLnRvcCA9IGAke2VtcHR5LnRvcCAqIGNlbGxTaXplfXB4YDtcclxuICAgICAgICAvLyDQsiDQv9GA0L7QvNC10LYu0L/QtdGA0LXQvNC10L3QvdGL0LUg0LfQsNC/0LjRgdGL0LLQsNC10Lwg0LrQvtC+0YDQtC3RgtGLINC/0YPRgdGC0L7QuSDQutC70LXRgtC60LhcclxuICAgICAgICBjb25zdCBlbXB0eUxlZnQgPSBlbXB0eS5sZWZ0O1xyXG4gICAgICAgIGNvbnN0IGVtcHR5VG9wID0gZW1wdHkudG9wO1xyXG4gICAgICAgIC8vINCyINC60L7QvtGA0LQt0YLRiyDQv9GD0YHRgtC+0Lkg0LrQu9C10YLQutC4INC30LDQv9C40YHRi9Cy0LDQtdC8INC60L7QvtGA0LQt0YLRiyDRgtC10LrRg9GJ0LXQuSDQutC70LXRgtC60LhcclxuICAgICAgICBlbXB0eS5sZWZ0ID0gY2VsbC5sZWZ0O1xyXG4gICAgICAgIGVtcHR5LnRvcCA9IGNlbGwudG9wO1xyXG4gICAgICAgIC8vINCyINC60L7QvtGA0LQt0YLRiyDRgtC10LrRg9GJ0LXQuSDQutC70LXRgtC60Lgg0LfQsNC/0LjRgdGL0LLQsNC10Lwg0LrQvtC+0YDQtC3RgtGLINC/0YPRgdGC0L7QuVxyXG4gICAgICAgIGNlbGwubGVmdCA9IGVtcHR5TGVmdDtcclxuICAgICAgICBjZWxsLnRvcCA9IGVtcHR5VG9wO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLdC/0YDQvtCy0LXRgNC60LAg0L3QsCDQstGL0LjQs9GA0YvRiC0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBjb25zdCBpc0ZpbmlzaGVkID0gY2VsbHMuZXZlcnkoKGNlbGwpID0+IGNlbGwudmFsdWUgPT09IGNlbGwudG9wICogNCArIGNlbGwubGVmdCk7XHJcblxyXG4gICAgICAgIGlmIChpc0ZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIGZpbmlzaEdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWRkU2NvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmZpZWxkKSB7XHJcbiAgICAgICAgZm9yIChsZXQgcCA9IDA7IHAgPCAxNjsgcCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5maWVsZClbcF0udmFsdWUgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8vINC60LvQtdGC0LrQsFxyXG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHV6emxlLWNlbGwnKTtcclxuICAgICAgICAgICAgICAgIC8vINGA0LDQt9GA0LXRiNC40YLRjCDQv9C10YDQtdGC0LDRgdC60LjQstCw0L3QuNC1INC80YvRiNGM0Y5cclxuICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5maWVsZClbcF07XHJcblxyXG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZWZ0ID0gcCAlIDQ7XHJcbiAgICAgICAgICAgICAgICB0b3AgPSAocCAtIGxlZnQpIC8gNDtcclxuXHJcbiAgICAgICAgICAgICAgICBjZWxscy5wdXNoKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmZpZWxkKVtwXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XHJcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS50b3AgPSBgJHt0b3AgKiBjZWxsU2l6ZX1weGA7XHJcblxyXG4gICAgICAgICAgICAgICAgY2VsbCA9IGNlbGxzW3BdO1xyXG4gICAgICAgICAgICAgICAgY2VsbC5lbGVtZW50ID0gY2VsbEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjZWxsLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHB1enpsZVdyYXBwZXIuYXBwZW5kKGNlbGxFbGVtZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVtcHR5LmxlZnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5maWVsZClbcF0ubGVmdDtcclxuICAgICAgICAgICAgICAgIGVtcHR5LnRvcCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmZpZWxkKVtwXS50b3A7XHJcbiAgICAgICAgICAgICAgICBjZWxscy5wdXNoKGVtcHR5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0t0JrQm9CY0JotLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgY2VsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3ZlKHApO1xyXG4gICAgICAgICAgICAgICAgc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLdCj0KXQntCUINCh0J4g0KHQotCg0JDQndCY0KbQqy0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2UuZmllbGQ7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgbG9jYWxTdG9yYWdlLmdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgc2F2ZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIGNlbGxzID0gY2VsbHMuc29ydCgoYSwgYikgPT4gYS5sZWZ0IC0gYi5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIGNlbGxzID0gY2VsbHMuc29ydCgoYSwgYikgPT4gYS50b3AgLSBiLnRvcCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZFNhdmUgPSBKU09OLnN0cmluZ2lmeShjZWxscyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmllbGQnLCBmaWVsZFNhdmUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbmV3Q2VsbHNbaSAtIDFdICsgMTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8vINC60LvQtdGC0LrQsFxyXG4gICAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwdXp6bGUtY2VsbCcpO1xyXG4gICAgICAgICAgICAvLyDRgNCw0LfRgNC10YjQuNGC0Ywg0L/QtdGA0LXRgtCw0YHQutC40LLQsNC90LjQtSDQvNGL0YjRjNGOXHJcbiAgICAgICAgICAgIGNlbGxFbGVtZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgY2VsbEVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGxlZnQgPSBpICUgNDtcclxuICAgICAgICAgICAgdG9wID0gKGkgLSBsZWZ0KSAvIDQ7XHJcblxyXG4gICAgICAgICAgICBjZWxscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbGVmdCxcclxuICAgICAgICAgICAgICAgIHRvcCxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNlbGxFbGVtZW50LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNlbGxFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtsZWZ0ICogY2VsbFNpemV9cHhgO1xyXG4gICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS50b3AgPSBgJHt0b3AgKiBjZWxsU2l6ZX1weGA7XHJcblxyXG4gICAgICAgICAgICBwdXp6bGVXcmFwcGVyLmFwcGVuZChjZWxsRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS3QmtCb0JjQmi0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG1vdmUoaSk7XHJcbiAgICAgICAgICAgICAgICBzb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLdCj0KXQntCUINCh0J4g0KHQotCg0JDQndCY0KbQqy0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2UuZmllbGQ7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgbG9jYWxTdG9yYWdlLmdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgc2F2ZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIGNlbGxzID0gY2VsbHMuc29ydCgoYSwgYikgPT4gYS5sZWZ0IC0gYi5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIGNlbGxzID0gY2VsbHMuc29ydCgoYSwgYikgPT4gYS50b3AgLSBiLnRvcCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZFNhdmUgPSBKU09OLnN0cmluZ2lmeShjZWxscyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmllbGQnLCBmaWVsZFNhdmUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcclxuICAgIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuLy8g0YHRh9C40YLQsNGC0Ywg0YXQvtC00YtcclxuZnVuY3Rpb24gYWRkU2NvcmUoKSB7XHJcbiAgICBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xyXG4gICAgY291bnQrKztcclxuICAgIHNjb3JlLnRleHRDb250ZW50ID0gYHNjb3JlOiAke2NvdW50fWA7XHJcbn1cclxuXHJcbi8vINC00L7QsdCw0LLQuNGC0Ywg0L3QvtC70YxcclxuZnVuY3Rpb24gYWRkWmVybyhudW1iZXIpIHtcclxuICAgIHJldHVybiAocGFyc2VJbnQobnVtYmVyLCAxMCkgPCAxMCA/ICcwJyA6ICcnKSArIG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgdGltZXIgPSAoKSA9PiB7XHJcbiAgICB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcclxuICAgIHNlYysrO1xyXG5cclxuICAgIGlmIChzZWMgPT09IDYwKSB7XHJcbiAgICAgICAgc2VjID0gMDtcclxuICAgICAgICBtaW4gKz0gMTtcclxuICAgIH1cclxuICAgIGlmIChtaW4gPT09IDYwKSB7XHJcbiAgICAgICAgbWluID0gMDtcclxuICAgICAgICBob3VyICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZS50ZXh0Q29udGVudCA9IGAke2FkZFplcm8oaG91cil9OiAke2FkZFplcm8obWluKX06ICR7YWRkWmVybyhzZWMpfWA7XHJcbn07XHJcblxyXG4vLyDQv9C+0LTRgdGH0LXRgiDQuNC90LLQtdGA0YHQuNC5INCyINC80LDRgdGB0LjQstC1IC0tLS0g0L3Rg9C20L3QviDRh9C10YLQvdC+0LUg0YfQuNGB0LvQvlxyXG5jb25zdCBpc1NvbHZhYmxlID0gKGFycikgPT4ge1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID4gYXJyW2pdKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGBzdW0gJHtzdW19YCk7XHJcbiAgICBpZiAoc3VtICUgMiA9PT0gMCkge1xyXG4gICAgICAgIC8vIHB1enpsZVdyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGFyciAke2Fycn1gKTtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIGFycjtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ2VsbHMoKTtcclxuXHJcbiAgICAvLyByZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLy8g0LXRgdC70Lgg0LfQsNC60L7QvdGH0LjQuyDQuNCz0YDRg1xyXG5cclxuY29uc3QgZmluaXNoR2FtZSA9ICgpID0+IHtcclxuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XHJcbiAgICBjb25ncmF0dWxhdGlvbi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNvbmdyYXR1bGF0aW9uXCI+PHNwYW4+Q29uZ3JhdHVsYXRpb25zITwvc3Bhbj5cclxuICAgIDxzcGFuPllvdSB3b24gd2l0aCA8aT4ke2NvdW50ICsgMX08L2k+IHNjb3JlIDwvc3Bhbj5cclxuICAgIDxzcGFuPmZvciB0aW1lIDxpPjAke2hvdXJ9OiAwJHttaW59OiAke3NlY308L2k+PC9zcGFuPjwvZGl2PmA7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb25ncmF0dWxhdGlvbik7XHJcbiAgICAgICAgc291bmRXaW4ucGxheSgpO1xyXG4gICAgfSwgMzAwKTtcclxuXHJcbiAgICBjb25ncmF0dWxhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNvbmdyYXR1bGF0aW9uKTtcclxuICAgICAgICBwb3BhcFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAvLyBwb3BhcFdyYXBwZXIucmVtb3ZlQ2hpbGQoYnRuQ29udGludWUpO1xyXG4gICAgfSk7XHJcbiAgICBzYXZlUmVzdWx0KCk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLdGB0L7RhdGA0LDQvdC40YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0LIg0YLQsNCx0LvQuNGG0LUtLS0tLS0tLS0tLS0tXHJcblxyXG5sZXQgcmVzdWx0O1xyXG5sZXQgY291bnRQbGF5ZXI7XHJcblxyXG4vLyDQtdGB0LvQuCDQsiDQv9Cw0LzRj9GC0Lgg0YHQvtGF0YDQsNC90LXQvdGLINGA0LXQt9GD0LvRjNGC0LDRgtGLLCDRgtC+INCy0L7Qt9GM0LzQuCDQvtGC0YLRg9C00LBcclxuaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXN1bHRzJykpIHtcclxuICAgIHJlc3VsdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Jlc3VsdHMnKSk7XHJcbiAgICBjb3VudFBsYXllciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Jlc3VsdHMnKSkubGVuZ3RoO1xyXG59IGVsc2Uge1xyXG4gICAgcmVzdWx0ID0gW107XHJcbiAgICBjb3VudFBsYXllciA9IDA7XHJcbn1cclxuXHJcbmNvbnN0IHNhdmVSZXN1bHQgPSAoKSA9PiB7XHJcbiAgICBjb3VudFBsYXllcisrO1xyXG4gICAgY29uc3Qgc2NvcmUgPSBjb3VudCArIDE7XHJcbiAgICBjb25zdCBzdGFnZSA9IGNvdW50UGxheWVyO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluZm8gPSB7XHJcbiAgICAgICAgc3RhZ2UsXHJcbiAgICAgICAgc2NvcmUsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vINC+0LPRgNCw0L3QuNGH0LXQvdC40LUg0L/QviDQutC+0LvQuNGH0LXRgdGC0LLRgyDRgNC10LrQvtGA0LTQvtCyXHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA8IDEwKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gocGxheWVySW5mbyk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5sZW5ndGggPT09IDEwKSB7XHJcbiAgICAgICAgaWYgKHBsYXllckluZm8uc2NvcmUgPD0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXS5zY29yZSkge1xyXG4gICAgICAgICAgICByZXN1bHQucG9wKCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBsYXllckluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC5zb3J0KChhLCBiKSA9PiBhLnNjb3JlIC0gYi5zY29yZSk7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5mb3JtYXRpb24gPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jlc3VsdHMnLCBwbGF5ZXJJbmZvcm1hdGlvbik7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLSDRgdC+0YXRgNCw0L3QuNGC0Ywg0YDQtdC30YPQu9GM0YLQsNGCINGC0LXQutGD0YnQtdC5INC40LPRgNGLIC0tLS0tXHJcblxyXG5jb25zdCBzYXZlR2FtZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNjb3JlID0gY291bnQ7XHJcblxyXG4gICAgY29uc3QgZ2FtZUluZm8gPSB7XHJcbiAgICAgICAgc2NvcmUsXHJcbiAgICAgICAgaG91cixcclxuICAgICAgICBtaW4sXHJcbiAgICAgICAgc2VjLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGdhbWVJbmZvcm1hdGlvbiA9IEpTT04uc3RyaW5naWZ5KGdhbWVJbmZvKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lSW5mbycsIGdhbWVJbmZvcm1hdGlvbik7XHJcbn07XHJcblxyXG4vLyArKysrKysrKysrKysrKyDQndC+0LLQsNGPINC40LPRgNCwICsrKysrKysrKysrKysrKysrKysrXHJcblxyXG5idG5OZXdHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IHBvcGFwV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9LCAxMDApO1xyXG4gICAgcHV6emxlV3JhcHBlci5pbm5lckhUTUwgPSAnJztcclxuICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2UuZmllbGQ7XHJcblxyXG4gICAgY291bnQgPSAwO1xyXG4gICAgc2VjID0gMDtcclxuICAgIG1pbiA9IDA7XHJcbiAgICBob3VyID0gMDtcclxuXHJcbiAgICBhZGRpdGlvbmFsV3JhcHBlci5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInNjb3JlXCI+PHNwYW4+c2NvcmU6IDA8L3NwYW4+PC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGltZVwiPjxzcGFuPjAke2hvdXJ9OiAwJHttaW59OiAwJHtzZWN9PC9zcGFuPjwvZGl2PmA7XHJcbiAgICBhZGRpdGlvbmFsV3JhcHBlci5hcHBlbmRDaGlsZChidG5QYXVzZSk7XHJcbiAgICBhZGRpdGlvbmFsV3JhcHBlci5hcHBlbmRDaGlsZChidG5BbGxTb3VuZCk7XHJcblxyXG4gICAgaWYgKGludGVydmFsSUQpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xyXG4gICAgfVxyXG5cclxuICAgIGludGVydmFsSUQgPSBzZXRJbnRlcnZhbCh0aW1lciwgMTAwMCk7XHJcbiAgICBjcmVhdGVDZWxscygpO1xyXG59KTtcclxuXHJcbi8vICsrKysrKysrKysrKysrINCf0YDQvtC00L7Qu9C20LjRgtGMICsrKysrKysrKysrKysrKysrKysrXHJcblxyXG5idG5Db250aW51ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4geyBwb3BhcFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfSwgMTAwKTtcclxuICAgIC8vIGludGVydmFsSUQgPSBzZXRJbnRlcnZhbCh0aW1lciwgMTAwMCk7XHJcblxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lSW5mbycpKSB7XHJcbiAgICAgICAgY291bnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lSW5mbycpKS5zY29yZTtcclxuICAgICAgICBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xyXG4gICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gYHNjb3JlOiAke2NvdW50fWA7XHJcblxyXG4gICAgICAgIHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xyXG4gICAgICAgIGhvdXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lSW5mbycpKS5ob3VyO1xyXG4gICAgICAgIG1pbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVJbmZvJykpLm1pbjtcclxuICAgICAgICBzZWMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lSW5mbycpKS5zZWM7XHJcbiAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IGAke2FkZFplcm8oaG91cil9OiAke2FkZFplcm8obWluKX06ICR7YWRkWmVybyhzZWMpfWA7XHJcbiAgICAgICAgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKHRpbWVyLCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKHRpbWVyLCAxMDAwKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyArKysrKysrKysrKysrKysrKyDQn9Cw0YPQt9CwICsrKysrKysrKysrKysrKysrKysrKysrXHJcblxyXG5idG5QYXVzZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XHJcbiAgICBzYXZlR2FtZSgpO1xyXG4gICAgcG9wYXBXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICBidG5Db250aW51ZS5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnYnV0dG9uLWNvbnRpbnVlJyk7XHJcbiAgICBidG5Db250aW51ZS50ZXh0Q29udGVudCA9ICdDb250aW51ZSc7XHJcbiAgICBwb3BhcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuQ29udGludWUpO1xyXG59KTtcclxuXHJcbi8vICsrKysrKysrKysrKysrKysrINCX0LLRg9C6ICsrKysrKysrKysrKysrKysrKysrKysrXHJcblxyXG5idG5BbGxTb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGBidG5BbGxTb3VuZC50ZXh0Q29udGVudCAke2J0bkFsbFNvdW5kLnRleHRDb250ZW50fWApO1xyXG4gICAgY29uc29sZS5sb2coYGJ0bkFsbFNvdW5kLmlubmVySFRNTCAke2J0bkFsbFNvdW5kLmlubmVySFRNTH1gKTtcclxuXHJcbiAgICBpZiAoYnRuQWxsU291bmQudGV4dENvbnRlbnQgPT09ICd2b2x1bWVfdXAnKSB7XHJcbiAgICAgICAgYnRuQWxsU291bmQuaW5uZXJIVE1MID0gY3JlYXRlSWNvbkhUTUwoJ3ZvbHVtZV9vZmYnKTtcclxuICAgICAgICBzb3VuZC52b2x1bWUgPSAwO1xyXG4gICAgICAgIHNvdW5kV2luLnZvbHVtZSA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ0bkFsbFNvdW5kLmlubmVySFRNTCA9IGNyZWF0ZUljb25IVE1MKCd2b2x1bWVfdXAnKTtcclxuICAgICAgICBzb3VuZC52b2x1bWUgPSAxO1xyXG4gICAgICAgIHNvdW5kV2luLnZvbHVtZSA9IDE7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gKysrKysrKysrKysrKysrKysg0KLQsNCx0LvQuNGG0LAg0LvRg9GH0YjQuNGFICsrKysrKysrKysrKysrKysrKysrKysrXHJcblxyXG5idG5Qcm9ncmVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4geyBwb3BhcFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfSwgMTAwKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4geyByZXN1bHRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7IH0sIDEwMCk7XHJcblxyXG4gICAgcmVzdWx0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdyZXN1bHQtd3JhcHBlcicpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZXN1bHRXcmFwcGVyKTtcclxuICAgIC8vINC/0YDQvtCy0LXRgNGMLCDQtdGB0YLRjCDQu9C4INCyINC/0LDQvNGP0YLQuFxyXG4gICAgbGV0IHJlc3VsdE1lc3NhZ2U7XHJcbiAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVzdWx0cycpKSkge1xyXG4gICAgICAgIHJlc3VsdE1lc3NhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXN1bHRzJykpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdE1lc3NhZ2UpO1xyXG4gICAgICAgIHJlc3VsdE1lc3NhZ2UgPSByZXN1bHRNZXNzYWdlLm1hcCgoaXRlbSkgPT4gYFN0YWdlICR7aXRlbS5zdGFnZX1fX19fXyR7aXRlbS5zY29yZX0gPGJyPmApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC10YHQu9C4INGA0LXQutC+0YDQtNC+0LIg0L3QtdGCLCDRgtC+INC90LjRh9C10LPQviDQvdC1INC/0LjRiNC4ICjQutGA0L7QvNC1INC30LDQs9C+0LvQvtCy0LrQsClcclxuICAgIGxldCByZXN1bHRNZXNzYWdlSXRlbTtcclxuICAgIGlmIChyZXN1bHRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmVzdWx0TWVzc2FnZUl0ZW0gPSByZXN1bHRNZXNzYWdlLmpvaW4oJyAnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0TWVzc2FnZUl0ZW0gPSAnJztcclxuICAgIH1cclxuXHJcbiAgICByZXN1bHRXcmFwcGVyLmlubmVySFRNTCA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtd3JhcHBlclwiPlxyXG4gICAgPHA+VG9wIG9mIHJlc3VsdHM8L3A+XHJcbiAgICA8c3Bhbj4ke3Jlc3VsdE1lc3NhZ2VJdGVtfTwvc3Bhbj5cclxuICAgIDwvZGl2PmA7XHJcbn0pO1xyXG5cclxucmVzdWx0V3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4geyByZXN1bHRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH0sIDEwMCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgcG9wYXBXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7IH0sIDEwMCk7XHJcbn0pO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBpbml0KCk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9