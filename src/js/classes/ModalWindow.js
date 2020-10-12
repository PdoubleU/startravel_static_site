export class ModalWindow {
    constructor(id, options){
        const DEFAULT_OPTIONS = {
                button: true,
                action: 'submit',
                buttonNamePl: 'Wyślij',
                buttonNameEn: 'Submit',
                _path: ''
            };
        this.id = id;
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.button = this.options.button;
        this.action = this.options.action;
        this.btnNamePl = this.options.buttonNamePl;
        this.btnNameEn = this.options.buttonNameEn;
        this.path = this.options._path;

        this.loadData(this.generateContent);
        this.generateHTMLTags();
        this.action_btn();
    }

    generateContent(response, language) {
        let grip = document.getElementsByTagName('body');
        const MODAL_CONTENT = document.createElement('div');
        MODAL_CONTENT.classList.add('content-container');
        MODAL_CONTENT.innerHTML = response['gdpr_' + language];
        grip[0].lastChild.children[0].lastChild.appendChild(MODAL_CONTENT);
    }
    generateHTMLTags() {
        let grip = document.getElementsByTagName('body');
        const MODAL_ARTICLE = document.createElement('article');
        MODAL_ARTICLE.id = 'modal_' + this.id;
        grip[0].appendChild(MODAL_ARTICLE);

        const MODAL_CONTAINER = document.createElement('div');
        MODAL_CONTAINER.classList.add('modal');
        MODAL_CONTAINER.classList.add(this.id);
        grip[0].lastChild.appendChild(MODAL_CONTAINER);

        const MODAL_BACKDROP = document.createElement('div');
        MODAL_BACKDROP.classList.add('modal_backdrop');
        MODAL_BACKDROP.classList.add(this.id);
        grip[0].lastChild.children[0].appendChild(MODAL_BACKDROP);

        const MODAL_BODY = document.createElement('div');
        MODAL_BODY.classList.add('modal_body');
        MODAL_BODY.classList.add(this.id);
        grip[0].lastChild.children[0].appendChild(MODAL_BODY);

        const ACTION_BTN = document.createElement('button');
        ACTION_BTN.classList.add('action_btn');
        ACTION_BTN.classList.add(this.id);
        ACTION_BTN.appendChild(document.createTextNode((window.sessionStorage.getItem('language') == 'polish') ? this.btnNamePl : this.btnNameEn));
        grip[0].lastChild.children[0].lastChild.appendChild(ACTION_BTN);

        if (this.button == true) {
            const CLOSE_BTN = document.createElement('button');
            CLOSE_BTN.classList.add('modal_close');
            CLOSE_BTN.classList.add(this.id);
            grip[0].lastChild.children[0].lastChild.appendChild(CLOSE_BTN);
            CLOSE_BTN.onclick = () => {MODAL_ARTICLE.remove()};
        }
    }
    action_btn(){
        const ACTION_BTN = document.getElementsByClassName('action_btn');

        const ACCEPT_GDPR = () =>{
            switch(this.action) {
                case 'submit':

                    break;
                case 'accept':
                    document.getElementById('modal_' + this.id).remove();
                    document.getElementById('bar_gdpr').classList.remove('bar_gdpr--active');
                    setTimeout(() => {
                        document.getElementById('bar_gdpr').remove()}
                        , 1000);
                    window.sessionStorage.setItem('gdpr', 'confirmed');
                    break;
                default:
                    console.log('Sorry, an error occured. Please reload browser');
                    break;
            }
        }

        ACTION_BTN[0].onclick = ACCEPT_GDPR;
    }

    loadData(callback){
        let xhr = new XMLHttpRequest();
        let _path = this.path;
        let language = window.sessionStorage.getItem('language');
        xhr.open('GET', _path, true);
        xhr.onload = () => {
            if(xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                return callback(response, language);
                }
            }
        xhr.send(null);
    }
}
