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
        this.randomNo = null

        this.generateHTMLTags();
    }
    generateHTMLTags() {
        if(document.getElementById(this.selector) == undefined) {
            return 0;
        }
        var element = document.getElementById(this.selector);
        element.classList.add('red_box');
    }
}

new FillContent('germany');
new FillContent('poland');
new FillContent('czechia');

export default {FillContent};
