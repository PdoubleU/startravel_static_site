class FillContent {
    constructor(classNameSelector, opts) {
        const DEFAULT_OPTS = {
            country : "pl",
            _path: '../json/offer-pl.json'
        };
        this.options = Object.assign({}, DEFAULT_OPTS, opts);
        this.selector = classNameSelector;
        this.country = this.options.country;
        this.path = this.options._path;
        this.data = null;

        this.loadData(this.generateHTMLTags);
    }
    generateHTMLTags(counter, objJSON, selector, country) {
        for (let i = 0; i < counter; i++){
            var newContent = objJSON[country][i].title;
            const CONTENT_ELEM = document.createElement("div");
            CONTENT_ELEM.classList.add('element');
            var Content_text = document.createTextNode(newContent);
            CONTENT_ELEM.appendChild(Content_text);
            var element = document.getElementById(selector);
            element.appendChild(CONTENT_ELEM);
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
