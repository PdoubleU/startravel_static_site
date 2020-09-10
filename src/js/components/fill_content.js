class FillContent {
    constructor(classNameSelector, opts) {
        const DEFAULT_OPTS = {
            file: "offer-en.json",
            country : "pl",
        };
        this.options = Object.assign({}, DEFAULT_OPTS, opts);
        this.selector = classNameSelector;
        this.file = this.options.file;
        this.country = this.options.country;
        this.randomNo = 5;

        this.generateHTMLTags(this.randomNo);
    }
    generateHTMLTags(counter) {
        if(document.getElementById(this.selector) == undefined) {
            return 0;
        }
        for (let i=0; i < counter; i++){
            const CONTENT_ELEM = document.createElement("div");
            CONTENT_ELEM.classList.add('element');
            var Content_text = document.createTextNode('wycieczka 1');
            CONTENT_ELEM.appendChild(Content_text);
            var element = document.getElementById(this.selector);
            element.appendChild(CONTENT_ELEM);
        }
    }
}

new FillContent('content-de');
new FillContent('content-pl');
new FillContent('content-cz');

export default {FillContent};
