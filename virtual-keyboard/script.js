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
        end: 0    
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
                //element.setSelectionRange(element, 10);
                //this.properties.start = this.selectionStart;
                //this.properties.end = this.selectionEnd;
                this.properties.start = element.selectionStart;
                this.properties.end = element.selectionEnd; 
                console.log(`${this.properties.start}`);            
                console.log(`${this.properties.end}`);            

                //this.setSelectionRange(this.properties.start, this.properties.end);

                
                //this.selectionStart = this.value.length;

            });

           // element.addEventListener('keydown',(e) => {
                //document.textarea.style.border = '2px solid red';
                //document.getElementsByClassName('keyboard-key').style.border = '2px solid red';
                //document.querySelectorAll('keyboard-key').style.backgroundColor = 'red';
                //key.setAttribute('onmousedown', 'return false');
                //keyElement.classList.add('keyboard__key--illumination');
                //element.style.border = '2px solid red';
                //console.log(e.code);          
                //console.log(e.keyCode);          
    
       // });



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
            "shift", "space"
          ];
        const keyLayoutRu = [
            ["1","!"], ["2","\""], ["3","№"], ["4",";"], ["5","%"], ["6",":"], ["7","?"], ["8","*"], ["9","("], ["0",")"], "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ", "ru",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "?",
            "shift","space"
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

            for (let m = 0; m < keyLayout.length; m++) {
                //for (keyElement of this.elements.keys) {
                if (Array.isArray(key)){
                    keyElement.setAttribute('data', `${String.fromCharCode(key[0])}`); 
                    //console.log(key[0].keyCode); 
                } else {
                   //keyElement.setAttribute('data', `${String.fromCharCode(key)}`);
                   keyElement.setAttribute('data', `${String.fromCharCode(key)}`);
                   //console.log(key.keyCode);  
                }
                  
            }                

            switch (key) {
                case 'backspace': 
                    // применить к клавише класс 'keyboard__key--wide'
                    keyElement.classList.add('keyboard__key--wide');
                    // применить иконку
                    keyElement.innerHTML = createIconHTML('backspace');
                    // обработчик события клик
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput'); // триггер события
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
                                if(key.textContent = this.properties.lang) {this.elements.keysContainer.children[0].remove() && this.elements.keysContainer.appendChild(this._createKeys())};
                
                            }
                
                        }



                        //keyElement.addEventListener('click', () => {
                            //this.properties.language = !this.properties.language;
                            while (this.elements.keysContainer.children.length>0) this.elements.keysContainer.children[0].remove();
                            this.elements.keysContainer.appendChild(this._createKeys());
                            this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
                 







                         //звук
                         //const enruSound = document.getElementById('enru');                    
                         //enruSound.play();                          
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
                                key.textContent = this.properties.lang ? keyLayoutRu : keyLayoutEn;
                
                            }
                
                        }
                 
                         //звук
                         //const enruSound = document.getElementById('enru');                    
                        // enruSound.play();                          
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
                    
                    keyElement.innerHTML = keyLayout[keyLayout.length -2];                    

                    keyElement.addEventListener('click', () => {
                        this._toggleShift(); 
                        keyElement.classList.toggle('keyboard__key--active', this.properties.shift); 
                        //чтобы надпись шифт не меняла регистр  
                        keyElement.innerHTML = keyLayout[keyLayout.length -2];   

                        //звук
                        const doneSound = document.getElementById('done');                    
                        doneSound.play();                




                    })
                    
                    break; 

                default: 
                    for (let j = 0; j < keyLayout.length; j++){
                        if (Array.isArray(key)){
                            keyElement.textContent = key[0];
                        } else {     // if (typeof key == 'string')
                            keyElement.textContent = key.toLowerCase();
                        }
                    }                



                    keyElement.addEventListener('click', (e) => {
                        //если массив, то возьми 1-й элемент
                        if (Array.isArray(key)){
                            keyElement.textContent = key[0];
                        }


                        // подсветка нажатой клавиши на вирт.клаве
                        const selectKey = () => {
                            //e.target.style.border = '2px solid #245389'
                            e.target.style.background = '#245389'
                            const deselectKey = () => {e.target.style.background = ' rgba(80, 66, 40, 0.8)'};  
                            setTimeout(deselectKey, 500);                    
                        };
                        selectKey();                  
                        
                        
                        // изменить регистр по капсу или шифту

                        if (Array.isArray(key)){                            
                            this.properties.value += (this.properties.capsLock ||  this.properties.shift)  ? key[0].toUpperCase() : key[0].toLowerCase();  
                        } else {
                            this.properties.value += (this.properties.capsLock ||  this.properties.shift)  ? key.toUpperCase() : key.toLowerCase(); 
                        }                                                                      
                        this._triggerEvent('oninput');                 
                   
  
                         //звук                  
                        const normalSound = document.getElementById('normal');                    
                        normalSound.play();                       
                                               
                    })
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
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
        console.log('Caps Lock Toggled!');
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();            
            }
        }

        console.log('туглшифт');
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


                        





