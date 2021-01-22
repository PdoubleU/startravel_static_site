export class Slider {
	constructor(elemSelector, opts) {
		const DEFAULT_OPTS = {
			pauseTime: 8000,
			generatePrevNext: true
		};
		this.options = Object.assign({}, DEFAULT_OPTS, opts);
		this.sliderSelector = elemSelector;
		this.currentSlide = 0;
		this.time = null;
		this.slider = null;
		this.elem = null;
		this.slides = null;
		this.language = window.localStorage.getItem('language');

		this.prev = null;
		this.next = null;

		this.loadData(this.generateListOfSlides);
		this.generateSlider();
		this.changeSlide(this.currentSlide);
	}

	loadData(callback) {
		let xhr = new XMLHttpRequest();
		let _path = this.language == 'polish' ? './json/offer-pl.json' : './json/offer-en.json';
		let sliderSel = this.sliderSelector;
		xhr.open('GET', _path, false);
		xhr.onload = () => {
			if (xhr.status === 200) {
				let response = JSON.parse(xhr.responseText);
				return callback(response, sliderSel);
			}
		};
		xhr.send(null);
	}

	generateListOfSlides(objJSON, sliderSel) {
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		let country = [ 'poland', 'germany', 'czechia' ];
		let grip = document.querySelector(sliderSel);
		for (let i = 0; i < 5; i++) {
			let randomCountry = country[getRandomInt(0, 2)];
			let title = objJSON[randomCountry][i].title;
			const SLIDE_ARTCL = document.createElement('article');
			SLIDE_ARTCL.classList.add('element');
			const SLIDE_CONT = document.createElement('a');
			const SPAN = document.createElement('span');
			const TXT_BKG = document.createElement('span');
			TXT_BKG.classList.add('txt-background');
			SLIDE_CONT.href = 'subpages/' + randomCountry + '.html';
			SLIDE_CONT.classList.add('slide', 'title', 'text');
			let name = document.createTextNode(title);
			TXT_BKG.appendChild(name);
			SPAN.appendChild(TXT_BKG);
			SLIDE_CONT.appendChild(SPAN);
			SLIDE_ARTCL.appendChild(SLIDE_CONT);
			grip.appendChild(SLIDE_ARTCL);
		}
	}

	generateSlider() {
		this.slider = document.querySelector(this.sliderSelector);
		this.slider.classList.add('slider');
		const SLIDES_CNT = document.createElement('div');
		SLIDES_CNT.classList.add('slider-slides-cnt');
		this.slides = this.slider.children;
		while (this.slides.length) {
			this.slides[0].classList.add('slider-slide');
			SLIDES_CNT.appendChild(this.slides[0]);
		}
		this.slides = SLIDES_CNT.querySelectorAll('.slider-slide');
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
		this.slides.forEach((slide) => {
			slide.classList.remove('slider-slide-active');
			slide.children[0].classList.remove('active');
			slide.setAttribute('aria-hidden', true);
		});

		this.slides[i].classList.add('slider-slide-active');
		this.slides[i].children[0].classList.add('active');
		this.slides[i].setAttribute('aria-hidden', false);

		this.currentSlide = i;

		if (this.options.pauseTime !== 0) {
			clearInterval(this.time);
			this.time = setTimeout(() => this.slideNext(), this.options.pauseTime);
		}
	}

	createPrevNext() {
		this.innerTop = document.createElement('div');
		this.innerBottom = document.createElement('div');
		this.innerTop.classList.add('arrow-class--top');
		this.innerBottom.classList.add('arrow-class--bottom');
		this.cpyTopOne = this.innerTop.cloneNode(true);
		this.cpyBottomOne = this.innerBottom.cloneNode(true);
		this.cpyTopTwo = this.innerTop.cloneNode(true);
		this.cpyBottomTwo = this.innerBottom.cloneNode(true);

		this.prev = document.createElement('button');
		this.prev.type = 'button';
		this.prev.classList.add('slider-button');
		this.prev.classList.add('slider-button-prev');
		this.prev.classList.add('arrow-class');
		this.prev.appendChild(this.cpyTopTwo);
		this.prev.appendChild(this.cpyBottomTwo);
		this.prev.addEventListener('click', this.slidePrev.bind(this));

		this.next = document.createElement('button');
		this.next.type = 'button';
		this.next.classList.add('slider-button');
		this.next.classList.add('slider-button-next');
		this.next.classList.add('arrow-class');
		this.next.appendChild(this.cpyTopOne);
		this.next.appendChild(this.cpyBottomOne);
		this.next.addEventListener('click', this.slideNext.bind(this));

		const NAV = document.createElement('div');
		NAV.classList.add('slider-nav');
		NAV.setAttribute('aria-label', 'slider prev next');
		NAV.appendChild(this.prev);
		NAV.appendChild(this.next);
		this.slider.appendChild(NAV);
	}
}
