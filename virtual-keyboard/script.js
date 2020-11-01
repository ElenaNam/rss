const Keyboard = {
    elements: {
        main: null, //не существует
        keysContainer: null, //не существует
        keys:[]        
    },

    //обработчики событий
    eventHandlers: {
        oninput: null,  //когда элемент получает ввод данных от пользователя
        onclose: null   //событие закрытия
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        lang: true,
        start: 0,
        end: 0,
        sound: true   
    },
    
    init() {
        //создаем элементы
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        //устанавливаем элементы
        this.elements.main.classList.add('keyboard', 'keyboard--hidden'); 
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');              

        //добавляем в DOM
        this.elements.main.appendChild(this.elements.keysContainer); //Метод appendChild() добавляет узел в качестве последнего дочернего узла в указанный родительский элемент.
        document.body.appendChild(this.elements.main);

        //Автоматически использовать клавиатуру для элементов в textarea
        document.querySelectorAll('.use-keyboard-input').forEach(element => {

            element.addEventListener('focus',() => {
                this.open(element.value, currentValue =>{                    
                    element.value = currentValue;   
                });        

            });



            element.addEventListener('сlick',() => {
                this.properties.start = element.selectionStart;
                this.properties.end = element.selectionEnd; 

            });
            this.properties.start++;
            this.properties.end++;

        });

        const textar = document.querySelector('.use-keyboard-input');
        //textar.focus();
        /*_setSelectionRange(text) {
            textar.focus();
            textar.setRangeText(text, textar.selectionStart, textar.selectionEnd, 'end');
    
        };*/
    
        textar.addEventListener('click', (e) => {
            //получить положение курсора
            this.properties.start = textar.selectionStart;
            this.properties.end = textar.selectionEnd;
            
            //this.properties.start = this.properties.end;

            console.log('по клику в textarea ' + this.properties.start);            
            console.log('по клику в textarea ' + textar.selectionEnd); 


            //textar.setRangeText(this.properties.value, this.properties.start, this.properties.end, 'end');

            /*if(this.properties.start == this.properties.end){
                alert("The position of the cursor is (" + this.properties.start + "/" + this.properties.value.length + ")");
            }else{
                alert("Selected text from ("+ this.properties.start +" to "+ this.properties.end + " of " + this.properties.value.length + ")");
            };*/


            //изменить выделение, чтобы начиналось с позиции start, и заканчивалось end
            //textar.setSelectionRange(this.properties.start, this.properties.end);


        });


    },
    
    // создать клавиши

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayoutEn = [
            ["1","!"], ["2","@"], ["3","#"], ["4","$"], ["5","%"], ["6","^"], ["7","&"], ["8","*"], ["9","("], ["0",")"], "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","en",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "shift", "space", "campaign", "left", "right"
          ];
        const keyLayoutRu = [
            ["1","!"], ["2","\""], ["3","№"], ["4",";"], ["5","%"], ["6",":"], ["7","?"], ["8","*"], ["9","("], ["0",")"], "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ", "ru",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "?",
            "shift","space", "campaign", "left", "right"
          ]; 
        
        
        let keyLayout;
        // выбрать раскладку      
        if (this.properties.lang = true) {
            keyLayout = keyLayoutEn;
        } else {
            keyLayout = keyLayoutRu;
        }    
     

        //Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class = material-icons>${icon_name}</i>`            
        }  

        keyLayout.forEach(key => {
            
            const keyElement = document.createElement('button');
            // перенос строки
            const insertLineBreak = ['backspace', 'en', 'enter', '?'].indexOf(key) !== -1;         
           
            
            //добавить атрибуты/классы клавишам
            keyElement.setAttribute('type', 'button'); //type="button"
            keyElement.classList.add('keyboard__key'); 
            //чтобы не было фокуса на клавишах           
            keyElement.setAttribute('onmousedown', 'return false'); 

            /*for (let m = 0; m < keyLayout.length; m++) {
                //for (keyElement of this.elements.keys) {
                if (Array.isArray(key)){
                    keyElement.setAttribute('data', `${String.fromCharCode(key[0])}`); 
                    //console.log(key[0].keyCode); 
                } else {
                   //keyElement.setAttribute('data', `${String.fromCharCode(key)}`);
                   keyElement.setAttribute('data', `${String.fromCharCode(key)}`);
                   //console.log(key.keyCode);  
                }
                  
            }  */
            // для всех клавиш - и обычных и специальных
            keyElement.addEventListener('click', (e) => {
                //если массив, то возьми 1-й элемент
                if (Array.isArray(key)){
                    keyElement.textContent = key[0];
                }

                // подсветка нажатой клавиши на вирт.клаве
                const selectKey = () => {
                    
                    // только не трогай кнопку переключения звука
                    if (key != 'campaign'){
                        e.target.style.background = '#245389'
                        const deselectKey = () => {e.target.style.background = ' rgba(80, 66, 40, 0.8)'};  
                        setTimeout(deselectKey, 500); 
                    }
                   
                };
                selectKey();               


                //console.log('keyCode: ' +  e.keyCode);
                //console.log('Key: ' + e.key);
                //console.log('Key: ' + e.charCode);
                

            });

            /*keyElement.addEventListener('keypress', (e) => {
                //если массив, то возьми 1-й элемент
                if (Array.isArray(key)){
                    keyElement.textContent = key[0];
                }   

                let code = String.fromCharCode(e.key);               
                console.log (code);
               
                console.log('Key: ' + e.key);
                
                
            });*/


            switch (key) {
                case 'left':                 
                    keyElement.classList.add('keyboard__key--small');                
                    keyElement.innerHTML = createIconHTML('arrow_back');

                    keyElement.addEventListener('click', () => {

                        const textar = document.querySelector('.use-keyboard-input');                  
                        
                        this.properties.start = textar.selectionStart;
                        this.properties.end = textar.selectionEnd;

                        textar.selectionStart = textar.selectionEnd -= 1;
                        //textar.focus();


                        //console.log(this.properties.start);
                        //console.log(this.properties.end);
                                           
          
    
                        //звук
                         const arrowSound = document.getElementById('arrow');                    
                         arrowSound.play(); 
                    })

                break;

                case 'right':                 
                    keyElement.classList.add('keyboard__key--small');                
                    keyElement.innerHTML = createIconHTML('arrow_forward');

                    keyElement.addEventListener('click', () => {
                        const textar = document.querySelector('.use-keyboard-input');                  
                        
                        this.properties.start = textar.selectionStart;
                        this.properties.end = textar.selectionEnd;

                        textar.selectionStart = textar.selectionEnd += 1;
                        //textar.focus();


                        //console.log(this.properties.start);
                        //console.log(this.properties.end);
                                           
          
    
                        //звук
                         const arrowSound = document.getElementById('arrow');                    
                         arrowSound.play(); 
                    })

                break;


                case 'campaign':                 
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--blue');                
                keyElement.innerHTML = createIconHTML('campaign');
              
                keyElement.addEventListener('click', () => {
                    this._toggleSound();                     
                // изменить цвет клавиши
                if (this.properties.sound) {
                    keyElement.classList.remove('keyboard__key--inactive')
                    keyElement.classList.add('keyboard__key--blue');
                    
                } else {
                    keyElement.classList.remove('keyboard__key--blue');
                    keyElement.classList.add('keyboard__key--inactive');                   
                  
                };          

                    //звук
                     const soundSound = document.getElementById('sound');                    
                     soundSound.play(); 
                })

                break;

                case 'backspace': 
                    // применить к клавише класс 'keyboard__key--wide'
                    keyElement.classList.add('keyboard__key--wide');
                    // применить иконку
                    keyElement.innerHTML = createIconHTML('backspace');
                    // обработчик события клик
                    keyElement.addEventListener('click', () => {
                        
                        const textar = document.querySelector('.use-keyboard-input');

                        this.properties.start = textar.selectionStart;
                        this.properties.end = textar.selectionEnd;
                        console.log(this.properties.start);
                        console.log(this.properties.end);

                        //удали 1 символ с позиции курсора
                        let str = this.properties.value.substring(0, this.properties.start - 1);
                        this.properties.value = str + this.properties.value.substring(this.properties.end, this.properties.value.length);
                        //важно поставить его здесь
                        this._triggerEvent('oninput');
                        
                      

                        this.properties.start --;
                        this.properties.end --;
                        textar.setSelectionRange(this.properties.start, this.properties.end);
                       

                        //звук
                         const backSound = document.getElementById('back');                    
                         backSound.play(); 
                    })

                    break;



                case 'en': //ДОДЕЛАТЬ
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = 'en';

                    keyElement.addEventListener('click', () => {
                        this.properties.lang = !this.properties.lang;
                        keyElement.innerHTML = keyLayout[21];  


                        for (const key of this.elements.keys) {
                            //
                            if (key.childElementCount === 0) {
                                //if(key.textContent = this.properties.lang) {this.elements.keysContainer.children[0].remove() && this.elements.keysContainer.appendChild(this._createKeys())};
                
                            }
                
                        }               

                         //звук
                         const enruSound = document.getElementById('enru');                    
                         enruSound.play();                          
                    })
                    
                    break;

                case 'ru': //ДОДЕЛАТЬ
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = 'ru';

                    keyElement.addEventListener('click', () => {
                        this.properties.lang = !this.properties.lang;
                        keyElement.innerHTML = keyLayout[23];  


                        for (const key of this.elements.keys) {
                            if (key.childElementCount === 0) {
                               // key.textContent = this.properties.lang ? keyLayoutRu : keyLayoutEn;
                
                            }
                
                        }
                 
                         //звук
                         const enruSound = document.getElementById('enru');                    
                         enruSound.play();                          
                    })
                    
                    break;

                case 'enter': 
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');   
                         //звук               
                        const enterSound = document.getElementById('enter');                    
                        enterSound.play();  

                    })
                    
                    break;

                case 'space': 
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML('space_bar');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent('oninput');  
                         //звук
                         const spaceSound = document.getElementById('space');                    
                         spaceSound.play();  
            
                    })
                    
                    break;

                case 'done': 
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose'); 
                        //звук
                        const doneSound = document.getElementById('done');                    
                        doneSound.play();                         
                    })
                    
                    break;  

                case 'caps': 
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');
                      

                    keyElement.addEventListener('click', () => {

                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock); 
                        

                         //звук
                        const capsSound = document.getElementById('caps');                    
                        capsSound.play();                          
                    })
                    
                    break;
                    
                case 'shift': 
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.classList.add('keyboard__key--activatable'); //стиль с лампочкой
                    
                    keyElement.innerHTML = keyLayout[keyLayout.length -5].toLowerCase();                    

                    keyElement.addEventListener('click', () => {
                        this._toggleShift(); 
                        keyElement.classList.toggle('keyboard__key--active', this.properties.shift); 
                        //чтобы надпись шифт не меняла регистр  
                        keyElement.innerHTML = keyLayout[keyLayout.length -5];   

                        //звук
                        const shiftSound = document.getElementById('shift');                    
                        shiftSound.play();            

                    })
                    
                    break; 

                default: 
                    for (let j = 0; j < keyLayout.length; j++){
                        if (Array.isArray(key)){
                            keyElement.textContent = key[0];
                        } else {   
                            keyElement.textContent = key.toLowerCase();
                        }
                    }   
                    

                    // изменить регистр по капсу или шифту
                    if (Array.isArray(key)){                            
                        this.properties.value += (this.properties.capsLock ||  this.properties.shift)  ? key[0] : key[0];  
                    } else {
                        this.properties.value += (this.properties.capsLock ||  this.properties.shift)  ? key.toUpperCase() : key.toLowerCase(); 
                    }                                                                      
                    this._triggerEvent('oninput');     


                    keyElement.addEventListener('click', (e) => {
                        //если массив, то возьми 1-й элемент
                        if (Array.isArray(key)){
                            keyElement.textContent = key[0];
                        } else {
                            keyElement.textContent = key;
                        }

                        console.log (key);
                        //console.log('по клику на клавише ' + this.properties.start);
                        //console.log('по клику на клавише ' + this.properties.end);

                        // если включен капс или шифт
                        if (this.properties.capsLock || this.properties.shift) {
                            key = keyElement.textContent.toUpperCase();
                        } else {
                            key = keyElement.textContent.toLowerCase(); 
                        } 
                        // если включены оба
                        if (this.properties.capsLock && this.properties.shift) key = keyElement.textContent.toLowerCase(); 
                  

                         //значение от начала до положения курсора + новый символ + значение от конечного положения курсора (если что-то выделено) до конца текста
                        this.properties.value = this.properties.value.substring(0, this.properties.start) + key + this.properties.value.substring(this.properties.end, this.properties.value.length);
                        
                        this.properties.start++;
                        this.properties.end++;
                        this._triggerEvent("oninput");

                        
                        const textar = document.querySelector('.use-keyboard-input');
                        textar.focus();
                        //печатай там, где курсор                       
                        textar.setSelectionRange(this.properties.start, this.properties.end);

                        //звук                  
                        const normalSound = document.getElementById('normal');                    
                        normalSound.play();       
                    });

                    break;                 
     
            }
            //перенести строку на клаве
            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        });
        return fragment;

    },
   

    _triggerEvent(handlerName) {        //handlerName - это oninput/onclose
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
        console.log('Event Triggered! Event Name: ' + handlerName);
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && key.textContent !== 'shift' && key.textContent !== 'en' && key.textContent !== 'ru') {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
        console.log('Caps Lock!');
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0  && key.textContent !== 'en' && key.textContent !== 'ru') {
                key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();            
            }
        }

        console.log('туглшифт');
    },

    _toggleSound() {
        const sound = document.getElementsByTagName ('audio')
        this.properties.sound = !this.properties.sound;        

        for (const key of this.elements.keys) {
            for (item of sound){
                this.properties.sound ? item.volume = 1 : item.volume = 0;                
            }
        }
        console.log('туглсаунд');
    },



    //выезжает клавиатура
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden'); //покажи

    },
    //прячется клавиатура
    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden'); //спрячь

    },

};

window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();
    /*Keyboard.open('dcode', function (currentValue) {
        console.log('value changed! here it is: ' + currentValue);
    }, function (currentValue) {
        console.log('keyboard closed! Finishing value: ' + currentValue);  
    });*/
});
                        





