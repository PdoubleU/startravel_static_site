class Slider {
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

        this.prev = null; //przycisk prev
        this.next = null; //przycisk next

        this.generateSlider();
        this.changeSlide(this.currentSlide);
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
            slide.setAttribute("aria-hidden", true);
        });

        //dodajemy ją tylko wybranemu
        this.slides[i].classList.add("slider-slide-active");
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
        NAV.setAttribute("aria-label", "Slider prev next");
        NAV.appendChild(this.prev);
        NAV.appendChild(this.next);
        this.slider.appendChild(NAV);
    }
}

new Slider('#slider');

export default {Slider};
