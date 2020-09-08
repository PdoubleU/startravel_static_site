class FillContent {
    constructor(classNameSelector, opts) {
        const DEFAULT_OPTS = {
            file: "offer-en.json",
            country : "pl",
        };
        this.options = Object.assign({}, DEFAULT_OPTS, opts);
        this.selector = classNameSelector;
        this.file = null;
        this.country = null;
        this.randomNo = null;

        this.generateHTMLTags();
    }
    generateHTMLTags() {
        var element = document.getElementById(this.selector);
        element.classList.add("red_box");
    }

}

new FillContent("logo");

export default {FillContent};


