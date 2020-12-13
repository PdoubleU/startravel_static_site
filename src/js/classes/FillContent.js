import { ModalWindow } from "./ModalWindow.js";

export class FillContent {
    constructor(classNameSelector, options) {
        const DEFAULT_OPTIONS = {
            country : "poland",
            _path: '../json/offer-pl.json',
            elementsToGenerate: 5
        };
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.selector = classNameSelector;
        this.country = this.options.country;
        this.path = this.options._path;
        this.data = null;
        this.noOfElementsToGenerate = this.options.elementsToGenerate;

        this.loadData(this.generateHTMLTags, this.loadModalWindow);
    }
    generateHTMLTags(counter, objJSON, selector, country, loadModal) {
        for (let i = 0; i < counter; i++){
            let DESCRIPTION_BTN = document.getElementsByClassName('description');
            let title = objJSON[country][i].title;
            let content = objJSON[country][i].content;
            let price = objJSON[country][i].price;
            let grip = document.getElementById(selector);

            const CONTENT_CONTAINER = document.createElement('article');
            CONTENT_CONTAINER.classList = 'element ';
            CONTENT_CONTAINER.id = title.toLowerCase();
            grip.appendChild(CONTENT_CONTAINER);

            const CONTENT_TITLE = document.createElement('h4');
            CONTENT_TITLE.classList.add('title');
            CONTENT_TITLE.innerHTML = title;
            grip.children[i].appendChild(CONTENT_TITLE);

            const CONTENT_TEXT = document.createElement('button');
            CONTENT_TEXT.classList.add('description');
            (window.localStorage.getItem('language') == 'polish') ? CONTENT_TEXT.innerHTML = 'Sprawdź szczegóły' : CONTENT_TEXT.innerHTML = 'Read more';
            grip.children[i].appendChild(CONTENT_TEXT);

            DESCRIPTION_BTN[i].onclick = () => loadModal(content, price);
        }
    }

    loadModalWindow(content, price){
            new ModalWindow('description', {
                                        content: 'description',
                                        actionBtn: true,
                                        description: [ content, price ],
                                        buttonNamePl: 'Zarezerwuj!',
                                        buttonNameEn: 'Book!',
                                        action: 'contact',
                                        _path: "/json/form_content.json",
                                        formIsHidden: true
                                        });
    }


    loadData(callback, loadModal){
        let xhr = new XMLHttpRequest();
        let _path = this.path;
        let selector = this.selector;
        let country = this.country;
        let noOfElements = this.noOfElementsToGenerate;
        xhr.open('GET', _path, true);
        xhr.onload = () => {
            if(xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                callback(noOfElements, response, selector, country, loadModal);
            }
        }
        xhr.send(null);
    }
}