export class ModalWindow {
    constructor(id, options){
        const DEFAULT_OPTIONS = {
            button: true,
        };
        this.id = id;
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.button = this.options.button;

        this.generateHTMLTags();
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
        ACTION_BTN.classList.add('modal_btn');
        ACTION_BTN.classList.add(this.id);
        ACTION_BTN.appendChild(document.createTextNode('Wyślij'));
        grip[0].lastChild.children[0].lastChild.appendChild(ACTION_BTN);

        const MODAL_CONTENT = document.createElement('div');
        MODAL_CONTENT.classList.add('content-container');
        MODAL_CONTENT.appendChild(document.createTextNode('here will be form'));
        grip[0].lastChild.children[0].lastChild.appendChild(MODAL_CONTENT);

        if (this.button == true) {
            const CLOSE_BTN = document.createElement('button');
            CLOSE_BTN.classList.add('modal_close');
            CLOSE_BTN.classList.add(this.id);
            grip[0].lastChild.children[0].lastChild.appendChild(CLOSE_BTN);
            CLOSE_BTN.onclick = () => {MODAL_ARTICLE.remove()};
        }
    }
}
