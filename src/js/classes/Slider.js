export class Slider {
    constructor(elemSelector, opts) {
        const DEFAULT_OPTS = {
            pauseTime : 8000,
            prevText : "<",
            nextText : ">",
            generatePrevNext : true
        };
        this.options = Object.assign({}, DEFAULT_OPTS, opts);
        this.sliderSelector = elemSelector;
        this.currentSlide = 0; //aktualny slide
        this.time = null; //tutaj będziemy podczepiać setTimeout
        this.slider = null;
        this.elem = null;
        this.slides = null;
        this.randomCountry = ['pl', 'de', 'cz'];

        this.prev = null; //przycisk prev
        this.next = null; //przycisk next

        //check if the currently loaded subpage has correct identifier - if not, stop the code
        if(document.querySelector(this.sliderSelector) == undefined) {
            return 0;
        }
        this.generateListOfSlides();
        this.generateSlider();
        this.changeSlide(this.currentSlide);
    }

    generateListOfSlides() {
        for (let i = 0; i < 5 ; i++) {
            let grip = document.querySelector(this.sliderSelector);
            const SLIDE_ARTCL = document.createElement('article');
            SLIDE_ARTCL.classList.add('element', 'text');
            const SLIDE_CONT = document.createElement('h3');
            SLIDE_CONT.classList.add('slide');
            SLIDE_CONT.classList.add('title');
            let title = document.createTextNode('sample text' + [i]);
            SLIDE_CONT.appendChild(title);
            SLIDE_ARTCL.appendChild(SLIDE_CONT);
            grip.appendChild(SLIDE_ARTCL);
        }
    }

    generateSlider() {
        //pobieramy element który zamienimy na slider
        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add("slider");
        //tworzymy kontener dla slajdów
        const SLIDES_CNT = document.createElement("div");
        SLIDES_CNT.classList.add("slider-slides-cnt");
        //pobieramy element slajdów
        this.slides = this.slider.children;
        //to jest żywa kolekcja, więc przy przeniesieniu każdego slajdu
        //jej długość maleje
        while (this.slides.length) {
            this.slides[0].classList.add("slider-slide");
            SLIDES_CNT.appendChild(this.slides[0]);
        }
        this.slides = SLIDES_CNT.querySelectorAll(".slider-slide");
        this.slider.appendChild(SLIDES_CNT);

        if (this.options.generatePrevNext) this.createPrevNext();
    }

    slidePrev() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.changeSlide(this.currentSlide);
    }
    // w tej funkcji będzie modyfikacja treści slajdu!!
    slideNext() {
        this.currentSlide++;
        if (this.currentSlide > this.slides.length - 1) {
            this.currentSlide = 0;
        }
        this.changeSlide(this.currentSlide);
    }

    changeSlide(i) {
        this.slides.forEach(slide => {
            slide.classList.remove("slider-slide-active");
            slide.children[0].classList.remove("active");
            slide.setAttribute("aria-hidden", true);
        });

        //dodajemy ją tylko wybranemu
        this.slides[i].classList.add("slider-slide-active");
        this.slides[i].children[0].classList.add('active');
        this.slides[i].setAttribute("aria-hidden", false);

        //aktualny slide przestawiamy na wybrany
        this.currentSlide = i;

        if (this.options.pauseTime !== 0) {
            clearInterval(this.time);
            this.time = setTimeout(() => this.slideNext(), this.options.pauseTime)
        }
    }

    createPrevNext() {
        this.prev = document.createElement("button");
        this.prev.type = "button";
        this.prev.innerText = this.options.prevText;
        this.prev.classList.add("slider-button");
        this.prev.classList.add("slider-button-prev");
        this.prev.addEventListener("click", this.slidePrev.bind(this));

        this.next = document.createElement("button");
        this.next.type = "button";
        this.next.innerText = this.options.nextText;
        this.next.classList.add("slider-button");
        this.next.classList.add("slider-button-next");
        this.next.addEventListener("click", this.slideNext.bind(this));

        const NAV = document.createElement("div");
        NAV.classList.add("slider-nav");
        NAV.setAttribute("aria-label", "slider prev next");
        NAV.appendChild(this.prev);
        NAV.appendChild(this.next);
        this.slider.appendChild(NAV);
    }
}