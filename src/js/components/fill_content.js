class FillContent {
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

        this.loadData(this.generateHTMLTags);
    }
    generateHTMLTags(counter, objJSON, selector, country) {
        for (let i = 0; i < counter; i++){
            var newTitle = objJSON[country][i].title;
            var newContent = objJSON[country][i].content;
            var newPrice = objJSON[country][i].price;
            var grip = document.getElementById(selector);

            const CONTENT_CONTAINER = document.createElement('article');
            CONTENT_CONTAINER.classList = 'element ' + [i];
            grip.appendChild(CONTENT_CONTAINER);

            const CONTENT_TITLE = document.createElement('h4');
            CONTENT_TITLE.classList.add('title');
            var title_text = document.createTextNode(newTitle);
            CONTENT_TITLE.appendChild(title_text);
            grip.children[i].appendChild(CONTENT_TITLE);

            const CONTENT_TEXT = document.createElement('p');
            CONTENT_TEXT.classList.add('description');
            var descr_text = document.createTextNode(newContent);
            CONTENT_TEXT.appendChild(descr_text);
            grip.children[i].appendChild(CONTENT_TEXT);

            const CONTENT_PRICE = document.createElement('p');
            CONTENT_PRICE.classList.add('price');
            var content_price = document.createTextNode(newPrice);
            CONTENT_PRICE.appendChild(content_price);
            grip.children[i].appendChild(CONTENT_PRICE);
        }
    }
    loadData(callback){
        if(document.getElementById(this.selector) == undefined) {
            return 0;
        }
        var xhr = new XMLHttpRequest();
        var _path = this.path;
        var selector = this.selector;
        var country = this.country;
        xhr.open('GET', _path, true);
        xhr.onload = function() {
            if(xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                return callback(5, response, selector, country);
            }
        }
        xhr.send(null);
    }
}

new FillContent('content-de', {
                country : "de",
                _path: '../json/offer-pl.json'
            });
new FillContent('content-pl',{
                country : "pl",
                _path: '../json/offer-pl.json'
            });
new FillContent('content-cz',{
                country : "cz",
                _path: '../json/offer-pl.json'
            });

export default {FillContent};
