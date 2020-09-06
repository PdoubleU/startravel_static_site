class Slider {
    constructor(elemSelector, opts) {
        const defaultOpts = {
            pauseTime : 8000,
            prevText : "<",
            nextText : ">",
            generatePrevNext : true
        };
        this.options = Object.assign({}, defaultOpts, opts);
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
        const slidesCnt = document.createElement("div");
        slidesCnt.classList.add("slider-slides-cnt");

        //pobieramy element slajdów
        this.slides = this.slider.children;

        //to jest żywa kolekcja, więc przy przeniesieniu każdego slajdu
        //jej długość maleje
        while (this.slides.length) {
            this.slides[0].classList.add("slider-slide");
            slidesCnt.appendChild(this.slides[0]);
        }
        this.slides = slidesCnt.querySelectorAll(".slider-slide");
        this.slider.appendChild(slidesCnt);

        if (this.options.generatePrevNext) this.createPrevNext();
        if (this.options.generateDots) this.createDots();
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

    changeSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove("slider-slide-active");
            slide.setAttribute("aria-hidden", true);
        });

        //dodajemy ją tylko wybranemu
        this.slides[index].classList.add("slider-slide-active");
        this.slides[index].setAttribute("aria-hidden", false);

        //podobny manewr robimy dla kropek
        if (this.options.generateDots) {
            this.dots.forEach(dot => {
                dot.classList.remove("slider-dots-element-active");
            });
            this.dots[index].classList.add("slider-dots-element-active");
        }

        //aktualny slide przestawiamy na wybrany
        this.currentSlide = index;

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

        const nav = document.createElement("div");
        nav.classList.add("slider-nav");
        nav.setAttribute("aria-label", "Slider prev next");
        nav.appendChild(this.prev);
        nav.appendChild(this.next);
        this.slider.appendChild(nav);
    }
}

new Slider('#slider1');

export default {Slider};
