export class FillContent {
    constructor(classNameSelector, options) {
        const DEFAULT_OPTIONS = {
            country : "pl",
            _path: '../json/offer-pl.json'
        };
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.selector = classNameSelector;
        this.country = this.options.country;
        this.path = this.options._path;
        this.data = null;
        this.noOfElementsToGenerate = 5;

        this.loadData(this.generateHTMLTags);
    }
    generateHTMLTags(counter, objJSON, selector, country) {
        for (let i = 0; i < counter; i++){
            let newTitle = objJSON[country][i].title;
            let newContent = objJSON[country][i].content;
            let newPrice = objJSON[country][i].price;
            let grip = document.getElementById(selector);

            const CONTENT_CONTAINER = document.createElement('article');
            CONTENT_CONTAINER.classList = 'element ' + [i];
            grip.appendChild(CONTENT_CONTAINER);

            const CONTENT_TITLE = document.createElement('h4');
            CONTENT_TITLE.classList.add('title');
            let title_text = document.createTextNode(newTitle);
            CONTENT_TITLE.appendChild(title_text);
            grip.children[i].appendChild(CONTENT_TITLE);

            const CONTENT_TEXT = document.createElement('p');
            CONTENT_TEXT.classList.add('description');
            let descr_text = document.createTextNode(newContent);
            CONTENT_TEXT.appendChild(descr_text);
            grip.children[i].appendChild(CONTENT_TEXT);

            const CONTENT_PRICE = document.createElement('p');
            CONTENT_PRICE.classList.add('price');
            let content_price = document.createTextNode(newPrice);
            CONTENT_PRICE.appendChild(content_price);
            grip.children[i].appendChild(CONTENT_PRICE);
        }
    }
    loadData(callback){
        if(document.getElementById(this.selector) == undefined) {
            return 0;
        }
        let xhr = new XMLHttpRequest();
        let _path = this.path;
        let selector = this.selector;
        let country = this.country;
        let noOfElements = this.noOfElementsToGenerate;
        xhr.open('GET', _path, true);
        xhr.onload = () => {
            if(xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                return callback(noOfElements, response, selector, country);
            }
        }
        xhr.send(null);
    }
}