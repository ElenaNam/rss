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
        enru: false    
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
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //Автоматически использовать клавиатуру для элементов в textarea
        document.querySelectorAll('.use-keyboard-input').forEach(element => {
            element.addEventListener('focus',() => {
                this.open(element.value, currentValue =>{                    
                    element.value = currentValue;                    
                });             

            });
        });

    },
    // создать клавиши

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","en",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
          ];

        //Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class = material-icons>${icon_name}</i>`            
        }
        // перенос строки для англ.раскладки
        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', 'en', 'enter', '?'].indexOf(key) !== -1;         
           
            
            //добавить атрибуты/классы клавишам
            keyElement.setAttribute('type', 'button'); //type="button"
            keyElement.classList.add('keyboard__key'); 
            //чтобы не было фокуса на клавишах           
            keyElement.setAttribute('onmousedown', 'return false');
         

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

                case 'enru': 
                    keyElement.classList.add('keyboard__key--wide');
                    //keyElement.innerHTML = null;

                    keyElement.addEventListener('click', () => {
                        //this.properties.value = '';
                        //Event.key = null;
                        this._switchEnRu();                 
                         //звук
                         const capsSound = document.getElementById('caps');                    
                         capsSound.play();                          
                    })
                    
                    break;

                case 'enter': 
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');     //для физ.клав 
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

                default: // при клике на букву или цифру
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent('oninput');  
                         //звук                  
                        const normalSound = document.getElementById('normal');                    
                        normalSound.play();                       
                                               
                    })
                    break;                               
     
            }
            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        });
        return fragment;

    },

    //РУССКАЯ РАСКЛАДКА

    _createKeysRu() {
        const fragment = document.createDocumentFragment();

        const keyLayoutRu = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ", "ру",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "?",
            "space"
          ];                      
     

        //Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class = material-icons>${icon_name}</i>`            
        }
        // перенос строки для рус.раскладки
        keyLayoutRu.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', 'ру', 'enter', '?'].indexOf(key) !== -1;        
           
            
            //добавить атрибуты/классы клавишам
            keyElement.setAttribute('type', 'button'); 
            keyElement.classList.add('keyboard__key'); 


            switch (key) {
                case 'backspace': 
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('backspace');
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput'); // триггер события
                        //звук
                         const backSound = document.getElementById('back');                    
                         backSound.play(); 
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

                case 'enru': 
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = keyLayoutRu[23];

                    keyElement.addEventListener('click', () => {
                        this._switchEnRu();                 
                         //звук
                         const capsSound = document.getElementById('caps');                    
                         capsSound.play();                          
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

                default: // при клике на букву или цифру
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent('oninput');  
                         //звук                  
                        const normalSound = document.getElementById('normal');                    
                        normalSound.play();           
                    })                    
                    break;                               
     
            }
            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        });
        return fragment;

    },

    _switchEnRu (lang) {
        //const EnRu = 
        //keyElement.setAttribute('data-key', 'letter');
        this.properties.capsLock = !this.properties.capsLock;
        this._createKeysRu();
        //this._createKeys();
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


                        




/*his.elements.keys.addEventListener('click', play());*/
